const test = require('node:test');
const assert = require('node:assert/strict');
require('./finance-model.js');
const model = globalThis.JoyceFinanceModel;

test('Converte reais para centavos sem arredondar ou aceitar entradas ambíguas', () => {
  assert.equal(model.amountToCents('150,00'), 15000);
  assert.equal(model.amountToCents('150.5'), 15050);
  assert.equal(model.amountToCents('1.250,99'), 125099);
  assert.equal(model.amountToCents('0,01'), 1);
  for (const input of ['0', '-10', '1,234', '1.200', '1e3', 'NaN', '', '150 reais', '10000000,01']) {
    assert.throws(() => model.amountToCents(input), input);
  }
});

test('Filtra meses completos inclusive fevereiro bissexto e virada de ano', () => {
  assert.deepEqual(model.monthRange('2026-12'), {start:'2026-12-01',end:'2027-01-01'});
  assert.deepEqual(model.monthRange('2028-02'), {start:'2028-02-01',end:'2028-03-01'});
  assert.equal(model.validDate('2028-02-29'), true);
  assert.equal(model.validDate('2026-02-29'), false);
  assert.equal(model.validDate('2026-11-31'), false);
  assert.throws(() => model.monthRange('2026-13'));
});

test('Agrupa serviços de um dia e soma o mês em centavos exatos', () => {
  const summary = model.summarize([
    {receipt_date:'2026-11-05',amount_cents:10010,service:'Nagô'},
    {receipt_date:'2026-11-05',amount_cents:5020,service:'Escova'},
    {receipt_date:'2026-11-06',amount_cents:100,service:'Adicional'}
  ]);
  assert.equal(summary.total, 15130);
  assert.equal(summary.count, 3);
  assert.equal(summary.days[0].date, '2026-11-06');
  assert.equal(summary.days[1].total, 15030);
  assert.equal(summary.days[1].entries.length, 2);
  assert.equal(model.summarize([]).total, 0);
  assert.match(model.money(summary.total), /151,30/);
});
