import { cx } from "@/lib/cx";

type Variant = "primary" | "dark" | "outline" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-saffron text-espresso hover:bg-[#e97d4f]",
  dark: "bg-forest text-white hover:bg-forest-deep",
  outline: "border border-line-strong bg-white text-espresso hover:border-forest hover:text-forest",
  ghost: "text-forest hover:bg-sage",
  light: "bg-alabaster text-forest hover:bg-white",
};
const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

export function button(variant: Variant = "primary", size: Size = "md", extra?: string): string {
  return cx(
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45 aria-disabled:opacity-45",
    variants[variant], sizes[size], extra,
  );
}
