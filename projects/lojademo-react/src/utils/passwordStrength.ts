export const PASSWORD_MIN_STRENGTH = 5;

export function calculateStrength(password: string): number {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
}

export function getStrengthColor(score: number): string {
  if (score <= 2) return 'bg-red-500';
  if (score === 3) return 'bg-amber-500';
  if (score === 4) return 'bg-blue-500';
  return 'bg-green-500';
}

export function getStrengthTextColor(score: number): string {
  if (score <= 2) return 'text-red-500';
  if (score === 3) return 'text-amber-500';
  if (score === 4) return 'text-blue-500';
  return 'text-green-500';
}

export function getStrengthText(score: number): string {
  if (score <= 2) return 'Fraca';
  if (score === 3) return 'Razoável';
  if (score === 4) return 'Boa';
  return 'Muito Forte';
}

export function getStrengthWidth(score: number): string {
  if (score === 0) return 'w-0';
  if (score === 1) return 'w-1/5';
  if (score === 2) return 'w-2/5';
  if (score === 3) return 'w-3/5';
  if (score === 4) return 'w-4/5';
  return 'w-full';
}
