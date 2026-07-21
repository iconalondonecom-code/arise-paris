export function AriseCrest({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <g fill="none" stroke={color} strokeWidth="2">
        <path d="M100 10 C 60 20, 40 40, 40 80 L 40 150 C 40 190, 70 215, 100 225 C 130 215, 160 190, 160 150 L 160 80 C 160 40, 140 20, 100 10 Z" />
        <path d="M100 55 L100 160 M85 160 L115 160 M92 100 L108 100 M88 130 L112 130" strokeWidth="1.5" />
        <path d="M60 175 Q 100 195 140 175" strokeWidth="1" />
      </g>
    </svg>
  );
}