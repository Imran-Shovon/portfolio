/** "Shovon" → accent "S" + rest + cyan dot, as used by the navbar, footer and loader logos. */
export function BrandName({ name, uppercase }: { name: string; uppercase?: boolean }) {
  const rest = name.slice(1);
  return (
    <>
      <span style={{ color: "var(--color-accent-blue)" }}>{name.charAt(0)}</span>
      <span style={{ color: "var(--color-text)" }}>{uppercase ? rest.toUpperCase() : rest}</span>
      <span style={{ color: "var(--color-accent-cyan)" }}>.</span>
    </>
  );
}
