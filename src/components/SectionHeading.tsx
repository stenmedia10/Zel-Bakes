import type { ReactNode } from "react";

type Props = {
    eyebrow: string;
    title: ReactNode;
    intro?: ReactNode;
    align?: "left" | "center";
    tone?: "light" | "dark";
};

export default function SectionHeading({ eyebrow, title, intro, align = "left", tone = "light" }: Props) {
    const dark = tone === "dark";
    return (
        <div className={`reveal max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
            <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${dark ? "text-blush/80" : "text-rose-deep"}`}>
                {eyebrow}
            </p>
            <h2 className={`mt-4 text-4xl sm:text-5xl lg:text-6xl ${dark ? "text-cream" : "text-cocoa"}`}>{title}</h2>
            {intro && (
                <p className={`mt-5 text-base sm:text-lg leading-relaxed ${dark ? "text-cream/70" : "text-cocoa/70"}`}>{intro}</p>
            )}
        </div>
    );
}
