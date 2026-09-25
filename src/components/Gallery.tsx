"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const CAKES = [
    { src: "/img/cake-unicorn.jpg", w: 1440, h: 1790, title: "Unicorn Fantasy", tag: "Birthday", text: "A rainbow, fluffy clouds and a unicorn topper in candy pastels." },
    { src: "/img/cake-sweet22.jpg", w: 1440, h: 1920, title: "Sweet 22", tag: "Birthday", text: "Classic white buttercream with black bows and gold details." },
    { src: "/img/cake-ava.jpg", w: 1440, h: 1910, title: "Ava’s Pop-Star Party", tag: "Themed", text: "Purple and pink, with Ava’s favourite characters and a sparkling 8." },
    { src: "/img/cake-mario.jpg", w: 768, h: 1024, title: "Super Mario", tag: "Kids’ party", text: "A bright, playful Mario world with a personalised name band." },
    { src: "/img/cake-green-floral.jpg", w: 1440, h: 1910, title: "Garden Daisies", tag: "Floral", text: "Sage green buttercream finished with hand-piped daisies." },
    { src: "/img/cake-angel.jpg", w: 1066, h: 800, title: "Little Angel", tag: "Celebration", text: "Soft yellow and gold with an angel topper and delicate details." },
];

export default function Gallery() {
    const [index, setIndex] = useState<number | null>(null);
    const close = useCallback(() => setIndex(null), []);
    const step = useCallback(
        (d: number) => setIndex((i) => (i === null ? i : (i + d + CAKES.length) % CAKES.length)),
        []
    );

    useEffect(() => {
        if (index === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowRight") step(1);
            if (e.key === "ArrowLeft") step(-1);
        };
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [index, close, step]);

    const cake = index === null ? null : CAKES[index];

    return (
        <section id="cakes" className="bg-cream py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <SectionHeading
                        eyebrow="Recent bakes"
                        title={<>Every cake tells <em className="font-normal text-rose">someone’s story</em></>}
                        intro="A few favourites from the Zel Bakes kitchen. Tap any cake to take a closer look."
                    />
                    <a href="#quote" className="reveal shrink-0 font-semibold text-rose-deep underline decoration-rose/40 underline-offset-8 hover:decoration-rose">
                        Price your own cake →
                    </a>
                </div>

                <ul className="mt-12 columns-2 gap-3 sm:gap-5 lg:columns-3">
                    {CAKES.map((c, i) => (
                        <li key={c.src} className="reveal mb-3 break-inside-avoid sm:mb-5">
                            <button
                                type="button"
                                onClick={() => setIndex(i)}
                                className="group relative block w-full overflow-hidden rounded-2xl bg-blush text-left sm:rounded-3xl"
                                aria-label={`View ${c.title}`}
                            >
                                <Image
                                    src={c.src}
                                    alt={c.title}
                                    width={c.w}
                                    height={c.h}
                                    sizes="(min-width: 1024px) 400px, 50vw"
                                    className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-cocoa/85 via-cocoa/30 to-transparent p-3 pt-12 sm:p-5 sm:pt-16">
                                    <span>
                                        <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-blush sm:text-xs">{c.tag}</span>
                                        <span className="mt-1 block font-serif text-base text-cream sm:text-2xl">{c.title}</span>
                                    </span>
                                    <Expand size={18} className="hidden shrink-0 text-cream/70 transition group-hover:text-cream sm:block" />
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <AnimatePresence>
                {cake && index !== null && (
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label={cake.title}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center bg-cocoa/90 p-3 backdrop-blur-md sm:p-8"
                        onClick={close}
                    >
                        <motion.div
                            key={cake.src}
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.25 }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.4}
                            onDragEnd={(_, info) => {
                                if (info.offset.x < -60) step(1);
                                if (info.offset.x > 60) step(-1);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-cream md:flex-row"
                        >
                            <div className="relative min-h-0 flex-1 bg-cocoa/5 md:basis-3/5">
                                <Image
                                    src={cake.src}
                                    alt={cake.title}
                                    width={cake.w}
                                    height={cake.h}
                                    sizes="(min-width: 768px) 600px, 100vw"
                                    className="mx-auto h-full max-h-[62svh] w-auto object-contain md:max-h-[80svh]"
                                    draggable={false}
                                />
                            </div>
                            <div className="flex flex-col justify-center gap-4 p-6 md:basis-2/5 md:p-10">
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-deep">{cake.tag}</p>
                                <h3 className="text-3xl text-cocoa md:text-4xl">{cake.title}</h3>
                                <p className="leading-relaxed text-cocoa/70">{cake.text}</p>
                                <a
                                    href="#quote"
                                    onClick={close}
                                    className="mt-2 inline-flex items-center justify-center rounded-full bg-cocoa px-6 py-3.5 font-semibold text-cream transition hover:bg-cocoa-light"
                                >
                                    Price a cake like this
                                </a>
                                <p className="text-center text-xs text-cocoa/50">
                                    {index + 1} / {CAKES.length}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={close}
                                aria-label="Close"
                                autoFocus
                                className="absolute right-3 top-3 grid size-11 place-items-center rounded-full bg-cream/90 text-cocoa shadow"
                            >
                                <X size={22} />
                            </button>
                            <button
                                type="button"
                                onClick={() => step(-1)}
                                aria-label="Previous cake"
                                className="absolute left-3 top-1/3 grid size-11 place-items-center rounded-full bg-cream/90 text-cocoa shadow md:top-1/2 md:-translate-y-1/2"
                            >
                                <ChevronLeft size={22} />
                            </button>
                            <button
                                type="button"
                                onClick={() => step(1)}
                                aria-label="Next cake"
                                className="absolute right-3 top-1/3 grid size-11 place-items-center rounded-full bg-cream/90 text-cocoa shadow md:left-[calc(60%-3.5rem)] md:right-auto md:top-1/2 md:-translate-y-1/2"
                            >
                                <ChevronRight size={22} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
