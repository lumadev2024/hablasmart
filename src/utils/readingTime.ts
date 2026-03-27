/**
 * utils/readingTime.ts
 * Calcola il tempo stimato di lettura di un testo.
 * Velocità media: 200 parole al minuto.
 */
export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
