window.createJoyceFinance = ({ request, refreshSession, getSession }) => {
  const model = window.JoyceFinanceModel;
  const $ = selector => document.querySelector(selector);
  const form = $("#receipt-form");
  const month = $("#receipt-month");
  const list = $("#receipt-list");
  const formMessage = $("#receipt-message");
  const listMessage = $("#finance-message");
  let rows = [];
  let editingId = null;
  let pendingId = null;
  let saving = false;
  let generation = 0;
  let sequence = 0;
  const today = () => {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
    const part = name => parts.find(p => p.type === name).value;
    return `${part("year")}-${part("month")}-${part("day")}`;
  };

  async function api(path, options = {}) {
    const userId = getSession()?.user.id;
    if (!userId) throw new Error("Entre novamente na Área da Joyce.");
    await refreshSession();
    if (getSession()?.user.id !== userId) throw new Error("Entre novamente na Área da Joyce.");
    return request(path, { ...options, headers: { Authorization: `Bearer ${getSession().access_token}`, ...options.headers } });
  }
  function resetForm() {
    editingId = null;
    pendingId = null;
    form.reset();
    $("#receipt-date").value = today();
    $("#receipt-form-title").textContent = "Registrar entrada";
    $("#receipt-cancel").hidden = true;
  }
  function busy(value) {
    saving = value;
    form.querySelectorAll("input, button").forEach(control => { control.disabled = value; });
    list.querySelectorAll("button").forEach(control => { control.disabled = value; });
    $("#receipt-cancel").disabled = value;
    $("#logout").disabled = value;
  }
  function clearSummary() {
    rows = [];
    list.replaceChildren();
    $("#receipt-total").textContent = "—";
    $("#receipt-count").textContent = "—";
  }
  function render() {
    const summary = model.summarize(rows);
    $("#receipt-total").textContent = model.money(summary.total);
    $("#receipt-count").textContent = String(summary.count);
    list.replaceChildren();
    listMessage.textContent = rows.length ? "Entradas agrupadas por dia." : "Nenhuma entrada registrada neste mês.";
    for (const group of summary.days) {
      const section = document.createElement("section");
      section.className = "receipt-day";
      const header = document.createElement("header");
      const heading = document.createElement("h3");
      heading.textContent = new Date(`${group.date}T12:00:00`).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
      const total = document.createElement("strong");
      total.textContent = `Total do dia: ${model.money(group.total)}`;
      header.append(heading, total);
      section.append(header);
      for (const row of group.entries) {
        const entry = document.createElement("div");
        entry.className = "receipt-entry";
        const service = document.createElement("p");
        service.textContent = row.service;
        const amount = document.createElement("strong");
        amount.textContent = model.money(row.amount_cents);
        const controls = document.createElement("div");
        controls.className = "receipt-controls";
        for (const [action, label] of [["edit", "Editar"], ["delete", "Excluir"]]) {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "agenda-button";
          button.dataset.action = action;
          button.dataset.id = row.id;
          button.textContent = label;
          button.setAttribute("aria-label", `${label} entrada: ${row.service}, ${model.money(row.amount_cents)}`);
          button.disabled = saving;
          controls.append(button);
        }
        entry.append(service, amount, controls);
        section.append(entry);
      }
      list.append(section);
    }
  }
  async function load() {
    if (!getSession()) return;
    const version = generation;
    const serial = ++sequence;
    clearSummary();
    listMessage.textContent = "Consultando as entradas…";
    try {
      const { start, end } = model.monthRange(month.value);
      const received = [];
      for (let offset = 0; ; offset += 500) {
        const page = await api(`/rest/v1/receipts?select=id,receipt_date,service,amount_cents&receipt_date=gte.${start}&receipt_date=lt.${end}&order=receipt_date.desc,id.asc&limit=500&offset=${offset}`);
        if (version !== generation || serial !== sequence) return;
        received.push(...page);
        if (page.length < 500) break;
      }
      rows = received;
      render();
    } catch {
      if (version !== generation || serial !== sequence) return;
      clearSummary();
      listMessage.textContent = "Não foi possível consultar as entradas. Atualize ou entre novamente.";
    }
  }
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (saving || !getSession()) return;
    let payload;
    try {
      const receiptDate = $("#receipt-date").value;
      const service = $("#receipt-service").value.trim();
      if (!model.validDate(receiptDate)) throw new Error("Informe uma data válida.");
      if (!service || service.length > 160) throw new Error("Informe o serviço feito, com até 160 caracteres.");
      payload = { receipt_date: receiptDate, service, amount_cents: model.amountToCents($("#receipt-amount").value) };
    } catch (error) { formMessage.textContent = error.message; return; }
    const version = generation;
    const id = editingId || pendingId || crypto.randomUUID();
    pendingId = id;
    busy(true);
    formMessage.textContent = "Salvando entrada…";
    try {
      const saved = await api(editingId ? `/rest/v1/receipts?id=eq.${id}` : "/rest/v1/receipts?on_conflict=id", {
        method: editingId ? "PATCH" : "POST",
        headers: { Prefer: "resolution=merge-duplicates,return=representation" },
        body: JSON.stringify(editingId ? payload : { ...payload, id })
      });
      if (version !== generation) return;
      if (!saved?.some(row => row.id === id)) throw new Error("not_saved");
      month.value = payload.receipt_date.slice(0, 7);
      resetForm();
      formMessage.textContent = "Entrada salva!";
      await load();
    } catch {
      if (version === generation) formMessage.textContent = "Não foi possível confirmar o salvamento. Seus campos foram mantidos: tente salvar novamente para confirmar a mesma entrada.";
    } finally { if (version === generation) busy(false); }
  });
  list.addEventListener("click", async event => {
    const button = event.target.closest("button[data-action]");
    if (!button || saving || !getSession()) return;
    const row = rows.find(row => row.id === button.dataset.id);
    if (!row) return;
    if (button.dataset.action === "edit") {
      editingId = row.id;
      pendingId = null;
      $("#receipt-date").value = row.receipt_date;
      $("#receipt-service").value = row.service;
      $("#receipt-amount").value = (row.amount_cents / 100).toFixed(2).replace(".", ",");
      $("#receipt-form-title").textContent = "Editar entrada";
      $("#receipt-cancel").hidden = false;
      formMessage.textContent = "Altere os campos e salve a entrada.";
      form.scrollIntoView({ behavior: "smooth", block: "center" });
      $("#receipt-service").focus({ preventScroll: true });
      return;
    }
    if (!window.confirm(`Excluir a entrada de ${model.money(row.amount_cents)} por ${row.service}?`)) return;
    const version = generation;
    busy(true);
    try {
      const deleted = await api(`/rest/v1/receipts?id=eq.${row.id}`, { method: "DELETE", headers: { Prefer: "return=representation" } });
      if (version !== generation) return;
      if (!deleted?.some(entry => entry.id === row.id)) throw new Error("not_deleted");
      if (editingId === row.id) resetForm();
      formMessage.textContent = "Entrada excluída.";
      await load();
    } catch { if (version === generation) formMessage.textContent = "Não foi possível confirmar a exclusão. Atualize as entradas para conferir."; }
    finally { if (version === generation) busy(false); }
  });
  $("#receipt-cancel").addEventListener("click", () => { resetForm(); formMessage.textContent = ""; });
  month.addEventListener("change", load);
  $("#receipt-refresh").addEventListener("click", load);
  return {
    start() { generation++; resetForm(); month.value = today().slice(0, 7); formMessage.textContent = ""; load(); },
    clear() { generation++; sequence++; busy(false); resetForm(); month.value = ""; clearSummary(); formMessage.textContent = ""; listMessage.textContent = ""; }
  };
};
