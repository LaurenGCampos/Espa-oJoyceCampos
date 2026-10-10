(() => {
  const config = window.AGENDA_CONFIG || {};
  const ready = Boolean(config.url && config.publishableKey);
  const labels = { available: "Disponível", busy: "Ocupado", off: "Folga", unknown: "A confirmar" };
  const shortLabels = { available: "Livre", busy: "Ocup.", off: "Folga", unknown: "—" };
  const months = [{ month: 10, name: "Novembro" }, { month: 11, name: "Dezembro" }];
  const message = document.querySelector("#agenda-message");
  const adminMessage = document.querySelector("#admin-message");
  const calendars = document.querySelector("#calendars");
  const loginForm = document.querySelector("#login-form");
  const dayForm = document.querySelector("#day-form");
  let days = new Map();
  let session = null;
  let selected = null;
  let loading = false;
  let saving = false;
  let changingPassword = false;

  async function request(path, options = {}) {
    const response = await fetch(`${config.url}${path}`, {
      ...options,
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
      headers: { apikey: config.publishableKey, "Content-Type": "application/json", ...options.headers }
    });
    if (!response.ok) throw new Error(String(response.status));
    return response.status === 204 ? null : response.json();
  }

  function render() {
    calendars.innerHTML = months.map(({ month, name }) => {
      const first = new Date(2026, month, 1).getDay();
      const count = new Date(2026, month + 1, 0).getDate();
      const cells = Array(first).fill("<td></td>");
      for (let day = 1; day <= count; day++) {
        const date = `2026-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const status = days.get(date) || "unknown";
        const description = `${day} de ${name.toLowerCase()} de 2026: ${labels[status]}`;
        const content = `<span>${day}</span><small>${shortLabels[status]}</small>`;
        cells.push(`<td>${session ? `<button type="button" class="day ${status}" data-date="${date}" aria-label="Editar ${description}" ${saving ? "disabled" : ""}>${content}</button>` : `<div class="day ${status}" aria-label="${description}">${content}</div>`}</td>`);
      }
      while (cells.length % 7) cells.push("<td></td>");
      const rows = [];
      for (let index = 0; index < cells.length; index += 7) rows.push(`<tr>${cells.slice(index, index + 7).join("")}</tr>`);
      return `<section class="month"><h2 id="month-${month}">${name} <span>2026</span></h2><table aria-labelledby="month-${month}"><thead><tr>${["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(name => `<th scope="col">${name}</th>`).join("")}</tr></thead><tbody>${rows.join("")}</tbody></table></section>`;
    }).join("");
  }

  async function load() {
    if (loading || saving) return;
    if (!ready) {
      message.textContent = "A agenda está em preparação. Consulte a disponibilidade pelo WhatsApp.";
      return;
    }
    loading = true;
    document.querySelector("#refresh").disabled = true;
    try {
      const rows = await request("/rest/v1/agenda_days?select=date,status&date=gte.2026-11-01&date=lte.2026-12-31");
      days = new Map(rows.filter(row => Object.hasOwn(labels, row.status)).map(row => [row.date, row.status]));
      render();
      message.textContent = `Agenda consultada às ${new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}.`;
    } catch {
      days.clear();
      render();
      message.textContent = "Não foi possível consultar a agenda. Tente atualizar ou fale com a Joyce pelo WhatsApp.";
    } finally {
      loading = false;
      document.querySelector("#refresh").disabled = false;
    }
  }

  function logout() {
    session = null;
    selected = null;
    loginForm.hidden = false;
    document.querySelector("#editor").hidden = true;
    dayForm.hidden = true;
    render();
  }

  loginForm.addEventListener("submit", async event => {
    event.preventDefault();
    if (!ready) return;
    const button = loginForm.querySelector("button");
    button.disabled = true;
    adminMessage.textContent = "Entrando…";
    try {
      const result = await request("/auth/v1/token?grant_type=password", {
        method: "POST", body: JSON.stringify({ email: document.querySelector("#email").value.trim(), password: document.querySelector("#password").value })
      });
      const user = await request("/auth/v1/user", { headers: { Authorization: `Bearer ${result.access_token}` } });
      if (user.app_metadata?.agenda_editor !== true) throw new Error("unauthorized");
      session = result;
      session.expires_at = Math.floor(Date.now() / 1000) + session.expires_in;
      loginForm.reset();
      loginForm.hidden = true;
      document.querySelector("#editor").hidden = false;
      adminMessage.textContent = "Você entrou. Toque no dia que deseja marcar.";
      render();
    } catch {
      document.querySelector("#password").value = "";
      adminMessage.textContent = "Não foi possível entrar. Confira seu e-mail, sua senha e a conexão.";
    } finally { button.disabled = false; }
  });

  async function refreshSession() {
    if (!session) throw new Error("401");
    if (session.expires_at * 1000 < Date.now() + 60000) {
      session = await request("/auth/v1/token?grant_type=refresh_token", { method: "POST", body: JSON.stringify({ refresh_token: session.refresh_token }) });
      session.expires_at = Math.floor(Date.now() / 1000) + session.expires_in;
    }
  }

  calendars.addEventListener("click", event => {
    const button = event.target.closest("button[data-date]");
    if (!session || !button || saving) return;
    selected = button.dataset.date;
    document.querySelector("#selected-day").textContent = new Date(`${selected}T12:00:00`).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
    document.querySelector("#day-status").value = days.get(selected) || "unknown";
    dayForm.hidden = false;
    document.querySelector("#admin").open = true;
    dayForm.scrollIntoView({ behavior: "smooth", block: "center" });
    document.querySelector("#day-status").focus({ preventScroll: true });
  });

  dayForm.addEventListener("submit", async event => {
    event.preventDefault();
    if (!session || !selected || saving || loading || changingPassword) return;
    saving = true;
    const date = selected;
    const status = document.querySelector("#day-status").value;
    const button = dayForm.querySelector("button");
    button.disabled = true;
    render();
    adminMessage.textContent = "Salvando…";
    try {
      await refreshSession();
      const rows = await request("/rest/v1/agenda_days?on_conflict=date", {
        method: "POST", headers: { Authorization: `Bearer ${session.access_token}`, Prefer: "resolution=merge-duplicates,return=representation" }, body: JSON.stringify({ date, status })
      });
      if (!rows?.some(row => row.date === date && row.status === status)) throw new Error("not_saved");
      days.set(date, status);
      adminMessage.textContent = "Dia salvo! A marcação já está disponível para as clientes consultarem.";
    } catch (error) {
      adminMessage.textContent = "Não foi possível salvar. Sua alteração não foi confirmada. Tente novamente.";
      if (error.message === "401") { logout(); adminMessage.textContent = "Sua sessão expirou. Entre novamente para salvar o dia."; }
    } finally { saving = false; button.disabled = false; render(); }
  });

  document.querySelector("#password-form").addEventListener("submit", async event => {
    event.preventDefault();
    if (!session || saving || changingPassword) return;
    const form = event.currentTarget;
    const password = document.querySelector("#new-password").value;
    if (password !== document.querySelector("#confirm-password").value) {
      adminMessage.textContent = "As senhas precisam ser iguais.";
      return;
    }
    changingPassword = true;
    const button = form.querySelector("button");
    button.disabled = true;
    try {
      await refreshSession();
      await request("/auth/v1/user", {method:"PUT", headers:{Authorization:`Bearer ${session.access_token}`}, body:JSON.stringify({password})});
      form.reset();
      adminMessage.textContent = "Senha trocada! Use a nova senha no próximo acesso.";
    } catch (error) {
      adminMessage.textContent = "Não foi possível trocar a senha. Tente novamente.";
      if (error.message === "401") logout();
    } finally { changingPassword = false; button.disabled = false; }
  });

  document.querySelector("#logout").addEventListener("click", async () => {
    if (saving || changingPassword) return;
    const token = session?.access_token;
    logout();
    adminMessage.textContent = "Você saiu da área de edição.";
    if (token) { try { await request("/auth/v1/logout", { method: "POST", headers: { Authorization: `Bearer ${token}` } }); } catch { /* A sessão local já foi removida. */ } }
  });
  document.querySelector("#refresh").addEventListener("click", load);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) load(); });
  setInterval(() => { if (!document.hidden) load(); }, 60000);
  if (!ready) {
    loginForm.querySelector("button").disabled = true;
    document.querySelector("#refresh").disabled = true;
    adminMessage.textContent = "O acesso para edição está sendo configurado.";
  }
  render();
  load();
})();
