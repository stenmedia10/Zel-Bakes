import Image from "next/image";

/** The full circular logo, shown whole with a white rim — used in the header, footer and quote. */
export function LogoMark({
    className = "size-14",
    sizes = "80px",
    preload = false,
}: {
    className?: string;
    sizes?: string;
    preload?: boolean;
}) {
    return (
        <span
            className={`relative inline-block shrink-0 rounded-full bg-cream shadow-[0_0_0_2.5px_#fff,0_12px_26px_-12px_rgb(74_42_34/0.6)] ${className}`}
        >
            <Image src="/img/logo.jpg" alt="" fill sizes={sizes} className="rounded-full object-cover" preload={preload} />
        </span>
    );
}

/** "Zel Bakes" wordmark echoing the logo: cocoa Zel, rose italic Bakes. */
export function Wordmark({ tone = "light", tagline = true }: { tone?: "light" | "dark"; tagline?: boolean }) {
    return (
        <span className="leading-none">
            <span className={`block font-serif text-xl lg:text-2xl ${tone === "dark" ? "text-cream" : "text-cocoa"}`}>
                Zel <em className="text-rose">Bakes</em>
            </span>
            {tagline && (
                <span className={`mt-1 block text-[10px] font-semibold uppercase tracking-[0.3em] ${tone === "dark" ? "text-blush/70" : "text-rose-deep"}`}>
                    Homemade cakes
                </span>
            )}
        </span>
    );
}

/** Full logo presented as a sticker: white rim, soft shadow and a slowly orbiting ring of sprinkles. */
export function LogoBadge({
    sizes,
    alt = "Zel Bakes logo",
    className = "",
}: {
    sizes: string;
    alt?: string;
    className?: string;
}) {
    return (
        <div className={`aspect-square ${className || "relative"}`}>
            <svg aria-hidden viewBox="0 0 120 120" className="brand-orbit absolute -inset-[7%] overflow-visible">
                <circle cx="60" cy="60" r="58" pathLength="100" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="0.01 3.99" />
            </svg>
            <div className="relative size-full overflow-hidden rounded-full bg-cream shadow-[0_0_0_6px_#fff,0_30px_60px_-24px_rgb(74_42_34/0.45)]">
                <Image src="/img/logo.jpg" alt={alt} fill sizes={sizes} className="object-cover" />
            </div>
        </div>
    );
}
