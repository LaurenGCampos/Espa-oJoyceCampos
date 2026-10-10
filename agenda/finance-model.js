(function (root) {
  const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  function amountToCents(value) {
    let normalized = String(value).trim();
    if (/^\d{1,3}(\.\d{3})+,\d{1,2}$/.test(normalized)) normalized = normalized.replaceAll(".", "");
    if (!/^\d+(?:[,.]\d{1,2})?$/.test(normalized)) throw new Error("Digite um valor como 150,00, com até duas casas decimais.");
    const [whole, decimal = ""] = normalized.replace(",", ".").split(".");
    const cents = Number(whole) * 100 + Number(decimal.padEnd(2, "0"));
    if (!Number.isSafeInteger(cents) || cents <= 0 || cents > 1000000000) throw new Error("Informe um valor recebido maior que zero e de até R$ 10.000.000,00.");
    return cents;
  }
  function validDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value.slice(0, 4) < "1900" || value.slice(0, 4) > "9998") return false;
    const date = new Date(`${value}T12:00:00Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }
  function monthRange(value) {
    if (!/^\d{4}-\d{2}$/.test(value) || !validDate(`${value}-01`)) throw new Error("Escolha um mês válido.");
    const [year, month] = value.split("-").map(Number);
    const next = month === 12 ? `${year + 1}-01` : `${year}-${String(month + 1).padStart(2, "0")}`;
    return { start: `${value}-01`, end: `${next}-01` };
  }
  function summarize(rows) {
    const groups = new Map();
    let total = 0;
    for (const row of rows) {
      total += row.amount_cents;
      const group = groups.get(row.receipt_date) || { date: row.receipt_date, total: 0, entries: [] };
      group.total += row.amount_cents;
      group.entries.push(row);
      groups.set(row.receipt_date, group);
    }
    return { total, count: rows.length, days: [...groups.values()].sort((a, b) => b.date.localeCompare(a.date)) };
  }
  root.JoyceFinanceModel = { amountToCents, validDate, monthRange, summarize, money: cents => currency.format(cents / 100) };
})(typeof window === "undefined" ? globalThis : window);
