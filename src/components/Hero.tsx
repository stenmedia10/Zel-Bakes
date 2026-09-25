import Image from "next/image";
import { ArrowRight, Check, Heart } from "lucide-react";
import { LogoBadge } from "@/components/Brand";

const OCCASIONS = ["Birthday cakes", "Themed cakes", "Christening cakes", "Floral cakes", "Kids’ party cakes", "Celebration cakes"];

export default function Hero() {
    return (
        <section id="top" className="relative overflow-hidden bg-cream">
            <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[640px] rounded-full bg-blush/70 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -left-52 bottom-0 size-[420px] rounded-full bg-parchment blur-3xl" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-40">
                <div className="lg:col-span-6">
                    <p className="inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-1.5 pr-5 text-sm font-semibold text-cocoa shadow-lg shadow-cocoa/10 ring-1 ring-cocoa/10 sm:text-base">
                        <span className="grid size-8 place-items-center rounded-full bg-rose text-white">
                            <Heart size={15} fill="currentColor" strokeWidth={0} />
                        </span>
                        Homemade in Kettering
                    </p>

                    <h1 className="mt-6 text-5xl text-cocoa sm:text-6xl lg:text-7xl">
                        Baked with love, <em className="font-normal text-rose">made just for you.</em>
                    </h1>

                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-cocoa/75">
                        Custom birthday, christening and themed cakes, handmade by Divya. Design yours online, see the price
                        instantly, and collect it fresh on the day.
                    </p>

                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                        <a
                            href="#quote"
                            className="group inline-flex items-center justify-center gap-2 rounded-full bg-cocoa px-7 py-4 font-semibold text-cream shadow-lg shadow-cocoa/20 transition hover:bg-cocoa-light"
                        >
                            Get an instant price
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </a>
                        <a
                            href="#cakes"
                            className="inline-flex items-center justify-center rounded-full border border-cocoa/20 bg-white/50 px-7 py-4 font-semibold text-cocoa transition hover:border-cocoa/40 hover:bg-white"
                        >
                            See recent cakes
                        </a>
                    </div>

                    <ul className="mt-10 flex flex-col gap-3 text-sm text-cocoa/80 sm:flex-row sm:flex-wrap sm:gap-x-7">
                        {["Every cake custom made", "Instant online quote"].map((t) => (
                            <li key={t} className="flex items-center gap-2">
                                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-rose/15 text-rose-deep">
                                    <Check size={12} strokeWidth={3} />
                                </span>
                                {t}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Collage of real bakes */}
                <div className="lg:col-span-6">
                    <div className="relative mx-auto aspect-[1/1.02] w-full max-w-[560px]">
                        <div className="absolute left-[9%] top-0 w-[54%] overflow-hidden rounded-b-[2rem] rounded-t-full bg-blush shadow-2xl shadow-cocoa/20 ring-8 ring-white">
                            <Image
                                src="/img/cake-unicorn.jpg"
                                alt="Rainbow unicorn birthday cake"
                                width={1440}
                                height={1790}
                                sizes="(min-width: 1024px) 300px, 54vw"
                                className="aspect-[3/4] h-auto w-full object-cover"
                                preload
                            />
                        </div>
                        <div className="absolute right-0 top-[16%] w-[38%] overflow-hidden rounded-b-[1.5rem] rounded-t-full bg-blush shadow-xl shadow-cocoa/20 ring-8 ring-white">
                            <Image
                                src="/img/cake-ava.jpg"
                                alt="Purple pop-star themed cake for Ava's 8th birthday"
                                width={1440}
                                height={1910}
                                sizes="(min-width: 1024px) 210px, 38vw"
                                className="aspect-[3/4] h-auto w-full object-cover"
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 w-[40%] overflow-hidden rounded-[1.75rem] bg-blush shadow-xl shadow-cocoa/20 ring-8 ring-white">
                            <Image
                                src="/img/cake-green-floral.jpg"
                                alt="Sage green cake with piped daisies"
                                width={1440}
                                height={1910}
                                sizes="(min-width: 1024px) 220px, 40vw"
                                className="aspect-square h-auto w-full object-cover"
                            />
                        </div>
                        <LogoBadge className="absolute bottom-[4%] right-[7%] w-[34%] text-rose/50" sizes="(min-width: 1024px) 200px, 36vw" />
                    </div>
                </div>
            </div>

            {/* Occasions ribbon */}
            <div className="relative bg-cocoa py-4 text-cream">
                <p className="sr-only">Cakes we make: {OCCASIONS.join(", ")}.</p>
                <div aria-hidden className="flex overflow-hidden">
                    <ul className="marquee flex shrink-0 items-center gap-10 pr-10 font-serif text-lg italic">
                        {[...OCCASIONS, ...OCCASIONS].map((o, i) => (
                            <li key={i} className="flex items-center gap-10 whitespace-nowrap">
                                {o} <span className="not-italic text-rose">✦</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
