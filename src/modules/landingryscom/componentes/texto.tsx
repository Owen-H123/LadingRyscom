/** Palabras resaltadas en naranja dentro de un título. */
export function Naranja({ children }: { children: React.ReactNode }) {
  return <em className="text-primary not-italic">{children}</em>;
}
