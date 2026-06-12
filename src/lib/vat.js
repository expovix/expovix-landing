export const VAT_RATE = 0.15;

export function calcVat(amountBeforeVat) {
  const before = Number(amountBeforeVat) || 0;
  const vat = before * VAT_RATE;
  const after = before + vat;
  return { before, vat, after };
}
