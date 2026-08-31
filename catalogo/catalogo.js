const services = [
  { category:"Nagô", name:"Masculina", image:"nago-masculina", prices:[["Simples","R$ 100"],["Com alimentação de jumbo","R$ 130"],["Acessórios","+ R$ 5"]] },
  { category:"Nagô", name:"Tiara", image:"nago-tiara", prices:[["Simples","R$ 50"],["Com alimentação de jumbo","R$ 100"],["Acessórios","+ R$ 5"]] },
  { category:"Nagô", name:"Lateral", image:"nago-lateral", prices:[["Até 4 tranças","R$ 40"],["Mais de 4 tranças","R$ 65"],["Acessórios","+ R$ 5"]] },
  { category:"Nagô", name:"Topo", image:"nago-topo", prices:[["Até 4 tranças","R$ 40"],["Mais de 4 tranças","R$ 65"],["Acessórios","+ R$ 5"]] },
  { category:"Boxeadora", name:"Com cachos", image:"boxeadora-com-cachos", prices:[["Simples","R$ 200"],["Acessórios","+ R$ 5"]] },
  { category:"Boxeadora", name:"Cachos na ponta", image:"boxeadora-cachos-na-ponta", prices:[["Simples","R$ 150"],["Anéis ou pingentes","+ R$ 5"]] },
  { category:"Boxeadora", name:"Alimentada", image:"boxeadora-alimentada", prices:[["Simples","R$ 120"],["Mais 4 tranças","A combinar"],["Acessórios","+ R$ 5"]] },
  { category:"Boxeadora", name:"Simples", image:"boxeadora-simples", prices:[["Tradicional","R$ 70"],["Acessórios","+ R$ 5"]] },
  { category:"Ghana Braids", name:"Com cachos", image:"ghana-com-cachos", prices:[["Mão de obra","R$ 200"],["Mão de obra + material","R$ 270"],["Anéis ou pingentes","+ R$ 5"]] },
  { category:"Ghana Braids", name:"Cachos na ponta", image:"ghana-cachos-na-ponta", prices:[["Mão de obra","R$ 200"],["Mão de obra + material","R$ 230"],["Anéis ou pingentes","+ R$ 5"]] },
  { category:"Ghana Braids", name:"Sem cachos", image:"ghana-sem-cachos", prices:[["Mão de obra","R$ 200"],["Mão de obra + material","R$ 250"],["Acessórios","+ R$ 5"]] },
  { category:"Box Braids", name:"Chanel", image:"box-braids-chanel", prices:[["Mão de obra","R$ 150"],["Mão de obra + material","R$ 200"],["Acessórios","+ R$ 5"]] },
  { category:"Box Braids", name:"M comprida", image:"box-braids-m-comprida", prices:[["Mão de obra","R$ 220"],["Além do comprimento padrão","A combinar"],["Mão de obra + material","A combinar"]] },
  { category:"Box Braids", name:"Com nagô lateral", image:"box-braids-nago-lateral", prices:[["Mão de obra","R$ 220"],["Mão de obra + material","A combinar"],["Acessórios","+ R$ 5"]] },
  { category:"Box Braids", name:"G comprida", image:"box-braids-g-comprida", prices:[["Mão de obra · comprimento padrão","R$ 270"],["Além do comprimento padrão","R$ 300"],["Mão de obra + material","R$ 380"]] },
  { category:"Gypsy", name:"M com cachos", image:"gypsy-m-com-cachos", prices:[["Mão de obra","R$ 250"],["Mão de obra + material","R$ 400"],["Acessórios","+ R$ 5"]] },
  { category:"Gypsy", name:"G com cachos", image:"gypsy-g-com-cachos", prices:[["Mão de obra","R$ 265"],["Mão de obra + material","R$ 385"],["Acessórios","+ R$ 5"]] },
  { category:"Gypsy", name:"Boho Braid", image:"gypsy-boho", prices:[["Mão de obra","R$ 280"],["Mão de obra + material","R$ 420"],["Acessórios","+ R$ 5"]] },
  { category:"Goddess", name:"M com cachos", image:"goddess-m-com-cachos", prices:[["Mão de obra","R$ 250"],["Mão de obra + material","A combinar"],["Acessórios","+ R$ 5"]] },
  { category:"Goddess", name:"G com cachos", image:"goddess-g-com-cachos", prices:[["Mão de obra","R$ 300"],["Mão de obra + material","A combinar"],["Acessórios","+ R$ 5"]] },
  { category:"Fulani", name:"M sem cacho", image:"fulani-m-sem-cacho", prices:[["Mão de obra","R$ 230"],["Mão de obra + material","A combinar"],["Acessórios","+ R$ 5"]] },
  { category:"Fulani", name:"P sem cacho", image:"fulani-p-sem-cacho", prices:[["Mão de obra","R$ 350"],["Mão de obra + material","A combinar"],["Acessórios","+ R$ 5"]] },
  { category:"Fulani", name:"Freestyle com cacho", image:"fulani-freestyle-com-cacho", prices:[["Mão de obra","R$ 280"],["Mão de obra + material","A combinar"],["Acessórios","+ R$ 5"]] },
  { category:"Fulani", name:"Com cabelo orgânico", image:"fulani-cabelo-organico", prices:[["Mão de obra","R$ 250"],["Mão de obra + material","A combinar"],["Acessórios","+ R$ 5"]] },
  { category:"French Curl", name:"P", image:"french-curl-p", prices:[["Mão de obra","R$ 350"],["Mão de obra + material","R$ 430"],["Acessórios","+ R$ 5"]] },
  { category:"French Curl", name:"PP", image:"french-curl-pp", prices:[["Mão de obra","R$ 450"],["Mão de obra + material","R$ 550"],["Acessórios","+ R$ 5"]] },
  { category:"French Curl", name:"Curta", image:"french-curl-curta", prices:[["Mão de obra","R$ 150"],["Mão de obra + material","R$ 220"],["Acessórios","+ R$ 5"]] },
  { category:"Faux Locs", name:"Comprida", image:"faux-locs-comprida", prices:[["Mão de obra","R$ 550"],["Mão de obra + material","R$ 650"],["Acessórios","+ R$ 5"]] },
  { category:"Twist", name:"Masculina", image:"twist-masculina", prices:[["Mão de obra","A partir de R$ 200"],["Mão de obra + material","A partir de R$ 260"],["Acessórios","+ R$ 5"]] },
  { category:"Twist", name:"Tradicional feminina", image:"twist-tradicional", prices:[["Mão de obra","R$ 360"],["Mão de obra + material","R$ 460"],["Acessórios","+ R$ 5"]] },
  { category:"Twist", name:"Com cabelo orgânico", image:"twist-cabelo-organico", prices:[["Mão de obra","R$ 400"],["Mão de obra + material","R$ 500"],["Acessórios","+ R$ 5"]] }
];

const grid = document.querySelector("#services-grid");
const filters = document.querySelector("#category-filters");
const resultCount = document.querySelector("#result-count");
const categories = [...new Set(services.map((service) => service.category))];
const escapeHtml = (value) => value.replace(/[&<>'"]/g, (character) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#039;", '"':"&quot;" }[character]));

grid.innerHTML = services.map((service, index) => `
  <article class="service-card" data-category="${escapeHtml(service.category)}">
    <div class="service-media">
      <img src="/assets/images/catalogo-ai/${service.image}.webp" alt="Imagem ilustrativa: ${escapeHtml(service.category)} ${escapeHtml(service.name)}" width="900" height="900" loading="lazy" decoding="async">
      <span class="service-category">${escapeHtml(service.category)}</span>
    </div>
    <div class="service-content">
      <h3>${escapeHtml(service.name)}</h3>
      <ul class="prices">${service.prices.map(([label, price]) => `<li><span>${escapeHtml(label)}</span><strong>${escapeHtml(price)}</strong></li>`).join("")}</ul>
      <div class="service-choice">
        <label for="escolha-tranca-${index}">Escolha a opção</label>
        <select id="escolha-tranca-${index}" data-service-choice>
          <option value="">Selecione uma opção</option>
          ${service.prices.map(([label, price]) => {
            const choice = `${service.category} ${service.name} — ${label} — ${price}`;
            return `<option value="${escapeHtml(choice)}">${escapeHtml(`${label} — ${price}`)}</option>`;
          }).join("")}
        </select>
      </div>
      <a class="card-cta service-choice-cta" data-service-cta aria-disabled="true" target="_blank" rel="noopener">Escolha uma opção</a>
    </div>
  </article>
`).join("");

filters.insertAdjacentHTML("beforeend", categories.map((category) => `<button class="filter" type="button" data-category="${escapeHtml(category)}" aria-pressed="false">${escapeHtml(category)}</button>`).join(""));

filters.addEventListener("click", (event) => {
  const button = event.target.closest(".filter");
  if (!button) return;
  const category = button.dataset.category;
  filters.querySelectorAll(".filter").forEach((filter) => {
    const active = filter === button;
    filter.classList.toggle("is-active", active);
    filter.setAttribute("aria-pressed", String(active));
  });
  let visible = 0;
  grid.querySelectorAll(".service-card").forEach((card) => {
    const show = category === "Todos" || card.dataset.category === category;
    card.hidden = !show;
    if (show) visible += 1;
  });
  resultCount.textContent = visible;
});

const catalogNav = document.querySelector(".catalog-nav");
const catalogPanels = [...document.querySelectorAll("[data-catalog-panel]")];
const salonGrid = document.querySelector(".salon-grid");
const catalogCategories = new Set(catalogPanels.map((panel) => panel.dataset.catalogPanel));

const showCatalogCategory = (requestedCategory, updateUrl = false) => {
  const category = catalogCategories.has(requestedCategory) ? requestedCategory : "todos";

  catalogPanels.forEach((panel) => {
    panel.hidden = category !== "todos" && panel.dataset.catalogPanel !== category;
  });

  const hasVisibleSalonService = catalogPanels.some((panel) =>
    panel.closest(".salon-grid") && !panel.hidden
  );
  salonGrid.hidden = !hasVisibleSalonService;
  salonGrid.classList.toggle("is-filtered", category !== "todos");

  catalogNav.querySelectorAll("[data-catalog-category]").forEach((link) => {
    const active = link.dataset.catalogCategory === category;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  });

  if (updateUrl) {
    const hash = category === "todos" ? "#catalogo" : `#${category}`;
    history.pushState({ catalogCategory: category }, "", hash);
  }
};

catalogNav.addEventListener("click", (event) => {
  const link = event.target.closest("[data-catalog-category]");
  if (!link) return;
  event.preventDefault();
  showCatalogCategory(link.dataset.catalogCategory, true);
});

window.addEventListener("hashchange", () => {
  showCatalogCategory(location.hash.slice(1));
});

showCatalogCategory(location.hash.slice(1));

document.querySelectorAll("[data-service-choice]").forEach((select) => {
  const card = select.closest(".salon-card, .service-card");
  const cta = card.querySelector("[data-service-cta]");

  const updateServiceChoice = () => {
    const choice = select.value;

    if (!choice) {
      cta.removeAttribute("href");
      cta.setAttribute("aria-disabled", "true");
      cta.textContent = "Escolha uma opção";
      return;
    }

    cta.href = `https://wa.me/5515998483691?text=${encodeURIComponent(choice)}`;
    cta.removeAttribute("aria-disabled");
    cta.textContent = "Quero este serviço";
  };

  select.addEventListener("change", updateServiceChoice);
  cta.addEventListener("click", (event) => {
    if (cta.getAttribute("aria-disabled") !== "true") return;
    event.preventDefault();
    select.focus();
  });
  updateServiceChoice();
});
