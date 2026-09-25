// Static-export image loader: maps next/image requests for /img/<name>.jpg onto the
// pre-generated widths from scripts/optimize-images.sh, so each device downloads only
// the size it needs. Any other src is served as-is.
const WIDTHS = [160, 480, 800, 1200];

export default function imageLoader({ src, width }: { src: string; width: number }) {
    const match = src.match(/^\/img\/(.+)\.jpg$/);
    if (!match) return `${src}?w=${width}`;
    const w = WIDTHS.find((x) => x >= width) ?? WIDTHS[WIDTHS.length - 1];
    return `/img/${match[1]}-${w}.jpg`;
}
