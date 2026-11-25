/** Unsplash resizes on its own CDN, so a static host still serves right-sized images. */
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }): string {
  return `${src}?w=${width}&q=${quality ?? 75}&auto=format&fit=max`;
}
