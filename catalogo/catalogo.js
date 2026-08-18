const services = [
  { category:"Nagô", name:"Masculina", image:"nago-masculina", prices:[["Simples","R$ 200"],["Com alimentação de jumbo","R$ 240"],["Acessórios","+ R$ 15"]] },
  { category:"Nagô", name:"Tiara", image:"nago-tiara", prices:[["Até 6 tranças","R$ 70"],["Até 10 tranças","R$ 80"],["Mais de 10 tranças","R$ 100"],["Acessórios","+ R$ 15"]] },
  { category:"Nagô", name:"Lateral", image:"nago-lateral", prices:[["Até 4 tranças","R$ 40"],["Mais de 4 tranças","R$ 65"],["Acessórios","+ R$ 15"]] },
  { category:"Nagô", name:"Topo", image:"nago-topo", prices:[["Até 4 tranças","R$ 40"],["Mais de 4 tranças","R$ 65"],["Acessórios","+ R$ 20"]] },
  { category:"Boxeadora", name:"Com cachos", image:"boxeadora-com-cachos", prices:[["Simples","R$ 200"],["Acessórios","+ R$ 20"]] },
  { category:"Boxeadora", name:"Cachos na ponta", image:"boxeadora-cachos-na-ponta", prices:[["Simples","R$ 220"],["Anéis ou pingentes","+ R$ 20"]] },
  { category:"Boxeadora", name:"Alimentada", image:"boxeadora-alimentada", prices:[["Simples","R$ 200"],["Mais 4 tranças","A combinar"],["Acessórios","+ R$ 25"]] },
  { category:"Boxeadora", name:"Simples", image:"boxeadora-simples", prices:[["Tradicional","R$ 60"],["Acessórios","+ R$ 10"]] },
  { category:"Ghana Braids", name:"Com cachos", image:"ghana-com-cachos", prices:[["Mão de obra","R$ 200"],["Mão de obra + material","R$ 370"],["Anéis ou pingentes","+ R$ 20"]] },
  { category:"Ghana Braids", name:"Cachos na ponta", image:"ghana-cachos-na-ponta", prices:[["Mão de obra","R$ 285"],["Com material","R$ 330"],["Anéis ou pingentes","+ R$ 20"]] },
  { category:"Ghana Braids", name:"Sem cachos", image:"ghana-sem-cachos", prices:[["Mão de obra","R$ 200"],["Com material","R$ 300"],["Acessórios","+ R$ 20"]] },
  { category:"Ghana Braids", name:"+10 tranças com cachos", image:"ghana-mais-10-com-cachos", prices:[["Mão de obra","R$ 300"],["Com material","R$ 420"],["Acessórios","+ R$ 10"]] },
  { category:"Box Braids", name:"Chanel", image:"box-braids-chanel", prices:[["Mão de obra","R$ 300"],["Mão de obra + material","R$ 400"],["Acessórios","+ R$ 10"]] },
  { category:"Box Braids", name:"M comprida", image:"box-braids-m-comprida", prices:[["Mão de obra · comprimento padrão","R$ 380"],["Além do comprimento padrão","R$ 460"],["Mão de obra + material","R$ 450"]] },
  { category:"Box Braids", name:"Com nagô lateral", image:"box-braids-nago-lateral", prices:[["Mão de obra","R$ 300"],["Mão de obra + material","R$ 400"],["Acessórios","+ R$ 20"]] },
  { category:"Box Braids", name:"G comprida", image:"box-braids-g-comprida", prices:[["Mão de obra · comprimento padrão","R$ 270"],["Além do comprimento padrão","R$ 300"],["Mão de obra + material","R$ 380"]] },
  { category:"Gypsy", name:"M com cachos", image:"gypsy-m-com-cachos", prices:[["Mão de obra","R$ 300"],["Mão de obra + material","R$ 490"],["Acessórios","+ R$ 15"]] },
  { category:"Gypsy", name:"G com cachos", image:"gypsy-g-com-cachos", prices:[["Mão de obra","R$ 265"],["Mão de obra + material","R$ 385"],["Acessórios","+ R$ 15"]] },
  { category:"Gypsy", name:"Boho Braid", image:"gypsy-boho", prices:[["Mão de obra","R$ 380"],["Mão de obra + material","R$ 500"],["Acessórios","+ R$ 15"]] },
  { category:"Gypsy", name:"G sem cacho", image:"gypsy-g-sem-cacho", prices:[["Mão de obra","R$ 280"],["Mão de obra + material","R$ 380"],["Acessórios","+ R$ 20"]] },
  { category:"Goddess", name:"M com cachos", image:"goddess-m-com-cachos", prices:[["Mão de obra","R$ 360"],["Mão de obra + material","R$ 500"],["Acessórios","+ R$ 15"]] },
  { category:"Goddess", name:"G com cachos", image:"goddess-g-com-cachos", prices:[["Mão de obra","R$ 300"],["Mão de obra + material","R$ 460"],["Acessórios","+ R$ 15"]] },
  { category:"Goddess", name:"Boho Braid", image:"goddess-boho", prices:[["Mão de obra","R$ 350"],["Mão de obra + material","R$ 440"],["Acessórios","+ R$ 15"]] },
  { category:"Fulani", name:"M sem cacho", image:"fulani-m-sem-cacho", prices:[["Mão de obra","R$ 290"],["Mão de obra + material","R$ 350"],["Acessórios","+ R$ 15"]] },
  { category:"Fulani", name:"P sem cacho", image:"fulani-p-sem-cacho", prices:[["Mão de obra","R$ 350"],["Mão de obra + material","R$ 460"],["Acessórios","+ R$ 15"]] },
  { category:"Fulani", name:"Freestyle com cacho", image:"fulani-freestyle-com-cacho", prices:[["Mão de obra","R$ 380"],["Mão de obra + material","R$ 560"],["Acessórios","+ R$ 15"]] },
  { category:"Fulani", name:"Com cabelo orgânico", image:"fulani-cabelo-organico", prices:[["Mão de obra","R$ 390"],["Mão de obra + material","R$ 570"],["Acessórios","+ R$ 20"]] },
  { category:"French Curl", name:"P", image:"french-curl-p", prices:[["Mão de obra","R$ 350"],["Mão de obra + material","R$ 470"],["Acessórios","+ R$ 15"]] },
  { category:"French Curl", name:"PP", image:"french-curl-pp", prices:[["Mão de obra","R$ 450"],["Mão de obra + material","R$ 550"],["Acessórios","+ R$ 15"]] },
  { category:"French Curl", name:"Curta", image:"french-curl-curta", prices:[["Mão de obra","R$ 330"],["Mão de obra + material","R$ 460"],["Acessórios","+ R$ 15"]] },
  { category:"French Curl", name:"Fulani", image:"french-curl-fulani", prices:[["Mão de obra","R$ 350"],["Mão de obra + material","R$ 450"],["Acessórios","+ R$ 15"]] },
  { category:"Faux Locs", name:"Comprida", image:"faux-locs-comprida", prices:[["Mão de obra","R$ 550"],["Mão de obra + material","R$ 650"],["Acessórios","+ R$ 15"]] },
  { category:"Faux Locs", name:"Com cachos", image:"faux-locs-com-cachos", prices:[["Mão de obra","R$ 600"],["Mão de obra + material","R$ 780"],["Acessórios","+ R$ 15"]] },
  { category:"Twist", name:"Masculina", image:"twist-masculina", prices:[["Mão de obra","R$ 300"],["Mão de obra + material","R$ 355"],["Acessórios","+ R$ 15"]] },
  { category:"Twist", name:"Freestyle", image:"twist-freestyle", prices:[["Mão de obra","R$ 345"],["Mão de obra + material","R$ 455"],["Acessórios","+ R$ 15"]] },
  { category:"Twist", name:"Tradicional", image:"twist-tradicional", prices:[["Mão de obra","R$ 360"],["Mão de obra + material","R$ 460"],["Acessórios","+ R$ 15"]] },
  { category:"Twist", name:"Com cabelo orgânico", image:"twist-cabelo-organico", prices:[["Mão de obra","R$ 400"],["Mão de obra + material","R$ 500"],["Acessórios","+ R$ 15"]] }
];

const grid = document.querySelector("#services-grid");
const filters = document.querySelector("#category-filters");
const resultCount = document.querySelector("#result-count");
const categories = [...new Set(services.map((service) => service.category))];
const escapeHtml = (value) => value.replace(/[&<>'"]/g, (character) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#039;", '"':"&quot;" }[character]));
const serviceMessage = (service) => encodeURIComponent(`Olá, Joyce! Vi no catálogo o estilo ${service.category} — ${service.name} e gostaria de saber sobre disponibilidade.`);

grid.innerHTML = services.map((service) => `
  <article class="service-card" data-category="${escapeHtml(service.category)}">
    <div class="service-media">
      <img src="/assets/images/catalogo-pdf/${service.image}.webp" alt="${escapeHtml(service.category)} ${escapeHtml(service.name)}" width="760" height="760" loading="lazy" decoding="async">
      <span class="service-category">${escapeHtml(service.category)}</span>
    </div>
    <div class="service-content">
      <h3>${escapeHtml(service.name)}</h3>
      <ul class="prices">${service.prices.map(([label, price]) => `<li><span>${escapeHtml(label)}</span><strong>${escapeHtml(price)}</strong></li>`).join("")}</ul>
      <a class="card-cta" href="https://wa.me/5515998483691?text=${serviceMessage(service)}" target="_blank" rel="noopener">Quero este estilo</a>
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
