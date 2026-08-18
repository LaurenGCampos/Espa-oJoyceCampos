const list = document.querySelector("#credits-list");

fetch("./creditos.json")
  .then((response) => {
    if (!response.ok) throw new Error("Não foi possível carregar as fontes.");
    return response.json();
  })
  .then((credits) => {
    list.innerHTML = credits.map((credit) => `
      <article class="credit-item">
        <strong>${credit.title}</strong>
        <p>${credit.creator} · ${credit.license}</p>
        <a href="${credit.sourceUrl}" target="_blank" rel="noopener">Ver arquivo e licença</a>
      </article>
    `).join("");
  })
  .catch(() => {
    list.textContent = "As fontes não puderam ser carregadas neste momento.";
  });
