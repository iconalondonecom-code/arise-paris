export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className={`mt-3 text-4xl md:text-5xl leading-[1.1] ${invert ? "text-white" : "text-[var(--ink)]"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-base md:text-lg leading-relaxed ${invert ? "text-white/70" : "text-[var(--body)]"}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-6 ${align === "center" ? "flex justify-center" : ""}`}>
        <span className="gold-divider" />
      </div>
    </div>
  );
}