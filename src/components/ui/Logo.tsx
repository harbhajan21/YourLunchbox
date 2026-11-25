import { cx } from "@/lib/cx";

/** A lunchbox whose lid seam is a loaded barbell. */
export function LogoMark({ className, inverse }: { className?: string; inverse?: boolean }) {
  const body = inverse ? "#FAF8F5" : "#1B4332";
  const bar = inverse ? "#12301F" : "#FAF8F5";
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M21 19v-4a7 7 0 0 1 7-7h8a7 7 0 0 1 7 7v4" fill="none" stroke={body} strokeWidth="6" strokeLinecap="round" />
      <rect x="4" y="17" width="56" height="43" rx="13" fill={body} />
      <rect x="4" y="36.5" width="56" height="4" fill={bar} />
      <g fill="#E06D3B">
        <rect x="11" y="27" width="7" height="23" rx="3.5" />
        <rect x="20" y="31" width="5" height="15" rx="2.5" />
        <rect x="46" y="27" width="7" height="23" rx="3.5" />
        <rect x="39" y="31" width="5" height="15" rx="2.5" />
      </g>
    </svg>
  );
}

export function Logo({ inverse, className }: { inverse?: boolean; className?: string }) {
  return (
    <span className={cx("inline-flex items-center gap-2", className)}>
      <LogoMark inverse={inverse} className="size-9 shrink-0" />
      <span className={cx("font-display text-[1.3rem] font-bold tracking-tight", inverse ? "text-alabaster" : "text-forest")}>
        <span className="font-medium">Your</span>Lunchbox
      </span>
    </span>
  );
}
