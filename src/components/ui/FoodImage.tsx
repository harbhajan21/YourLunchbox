"use client";

import Image from "next/image";
import { useState } from "react";
import { cx } from "@/lib/cx";
import { LogoMark } from "./Logo";

interface Props {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  preload?: boolean;
}

/** Fills its positioned parent. Falls back to the brand mark if a photo fails. */
export function FoodImage({ src, alt, sizes, className, preload }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span role="img" aria-label={alt} className="absolute inset-0 grid place-items-center bg-sage">
        <LogoMark className="size-16 opacity-60" />
      </span>
    );
  }
  return (
    <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className={cx("object-cover", className)} onError={() => setFailed(true)} />
  );
}
