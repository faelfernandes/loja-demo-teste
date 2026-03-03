const BRL_FORMATTER = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatBRL(valueInReais: number): string {
  return BRL_FORMATTER.format(valueInReais);
}

export function formatPriceFromCents(cents: number): string {
  return formatBRL(cents / 100);
}
