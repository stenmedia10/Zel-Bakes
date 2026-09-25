import { CakeSlice, MessageCircle, ShoppingBag } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { COLLECTION_POSTCODE } from "@/lib/site";

const STEPS = [
    {
        icon: CakeSlice,
        title: "Design your cake",
        text: "Choose size, flavour, shape and finish in the price guide. Your estimate updates as you tap.",
    },
    {
        icon: MessageCircle,
        title: "Send it on WhatsApp",
        text: "One tap sends your full quote to Divya, who confirms the design and your final price.",
    },
    {
        icon: ShoppingBag,
        title: "Collect & celebrate",
        text: `Pick up your cake fresh from Kettering (${COLLECTION_POSTCODE}) on the date you chose.`,
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="bg-parchment py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <SectionHeading
                    align="center"
                    eyebrow="How to order"
                    title={<>Three steps to <em className="font-normal text-rose">your perfect cake</em></>}
                />

                <ol className="mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
                    {STEPS.map(({ icon: Icon, title, text }, i) => (
                        <li key={title} className="reveal relative rounded-3xl bg-white p-7 shadow-[0_20px_50px_-30px_rgba(74,42,34,0.3)] sm:p-8">
                            <div className="flex items-center justify-between">
                                <span className="grid size-12 place-items-center rounded-2xl bg-blush text-rose-deep">
                                    <Icon size={22} />
                                </span>
                                <span className="font-serif text-5xl italic text-cocoa/10">0{i + 1}</span>
                            </div>
                            <h3 className="mt-6 text-2xl text-cocoa">{title}</h3>
                            <p className="mt-2 leading-relaxed text-cocoa/70">{text}</p>
                        </li>
                    ))}
                </ol>

                <div className="reveal mt-12 text-center">
                    <a
                        href="#quote"
                        className="inline-flex items-center justify-center rounded-full bg-cocoa px-8 py-4 font-semibold text-cream shadow-lg shadow-cocoa/20 transition hover:bg-cocoa-light"
                    >
                        Start designing
                    </a>
                </div>
            </div>
        </section>
    );
}
