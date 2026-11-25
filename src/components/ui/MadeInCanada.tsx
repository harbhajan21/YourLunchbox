import { t } from "@/i18n";
import { cx } from "@/lib/cx";

/** National Flag of Canada, official 1:2 proportions. */
export function CanadaFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 9600 4800" className={className} aria-hidden="true">
      <path fill="#fff" d="M0 0h9600v4800H0z" />
      <path fill="#d80621" d="M0 0h2400v4800H0zM7200 0h2400v4800H7200z" />
      <path fill="#d80621" d="m4890 4430-45-863a95 95 0 0 1 111-98l859 151-116-320a65 65 0 0 1 20-73l941-762-212-99a65 65 0 0 1-34-79l186-572-542 115a65 65 0 0 1-73-38l-105-247-423 454a65 65 0 0 1-111-57l204-1052-327 189a65 65 0 0 1-91-27l-332-652-332 652a65 65 0 0 1-91 27l-327-189 204 1052a65 65 0 0 1-111 57l-423-454-105 247a65 65 0 0 1-73 38l-542-115 186 572a65 65 0 0 1-34 79l-212 99 941 762a65 65 0 0 1 20 73l-116 320 859-151a95 95 0 0 1 111 98l-45 863z" />
    </svg>
  );
}

export function MadeInCanada({ className }: { className?: string }) {
  return (
    <p className={cx("inline-flex items-center gap-2.5 font-semibold", className)}>
      <CanadaFlag className="h-6 w-12 shrink-0 rounded-[3px] ring-1 ring-line" />
      {t.hero.madeIn}
    </p>
  );
}
