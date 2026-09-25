import { LogoBadge } from "@/components/Brand";
import { Heart, Palette, Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const VALUES = [
    { icon: Heart, title: "Homemade", text: "Baked in Divya’s own kitchen, one order at a time." },
    { icon: Palette, title: "Customised", text: "Your colours, theme, message and flavour. No two cakes alike." },
    { icon: Sparkles, title: "Detail-led", text: "From piped flowers to themed toppers, finished by hand." },
];

export default function About() {
    return (
        <section id="about" className="relative overflow-hidden bg-cocoa py-20 text-cream sm:py-28">
            <div aria-hidden className="pointer-events-none absolute -right-32 top-10 size-[480px] rounded-full bg-rose/15 blur-3xl" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
                <div className="reveal mx-auto w-full max-w-md lg:col-span-5">
                    <div className="relative px-6 text-blush/40">
                        <LogoBadge
                            alt="Illustration of Divya with her whisk and a floral cake"
                            sizes="(min-width: 1024px) 400px, 75vw"
                        />
                        <p className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-rose px-5 py-2 font-serif text-lg italic text-white shadow-lg">
                            Hi, I’m Divya
                        </p>
                    </div>
                </div>

                <div className="lg:col-span-7">
                    <SectionHeading
                        tone="dark"
                        eyebrow="Meet the baker"
                        title={<>A home kitchen, <em className="font-normal text-rose">a lot of love</em></>}
                    />
                    <div className="reveal mt-6 max-w-2xl space-y-5 text-base leading-relaxed text-cream/75 sm:text-lg">
                        <p>
                            Zel Bakes began with a simple love for home baking. What started as time spent in the heart of
                            Divya’s kitchen has grown into a real passion for creating edible art.
                        </p>
                        <p>
                            Divya specialises in custom theme cakes that are as individual as the people they’re made for, from
                            delicate floral designs to playful characters. Every cake is a chance to turn your idea into
                            something that makes the day unforgettable, one slice at a time.
                        </p>
                    </div>

                    <ul className="mt-10 grid gap-4 sm:grid-cols-3">
                        {VALUES.map(({ icon: Icon, title, text }) => (
                            <li key={title} className="reveal rounded-2xl border border-cream/10 bg-cream/5 p-5">
                                <Icon className="text-rose" size={22} />
                                <h3 className="mt-3 text-xl text-cream">{title}</h3>
                                <p className="mt-1.5 text-sm leading-relaxed text-cream/60">{text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
