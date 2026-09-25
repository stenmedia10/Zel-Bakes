import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { COLLECTION_POSTCODE, HOURS, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/site";

const DETAILS = [
    { icon: MapPin, label: "Collection", value: `Kettering, ${COLLECTION_POSTCODE}` },
    { icon: Clock, label: "Hours", value: HOURS },
    { icon: Phone, label: "Phone", value: PHONE_DISPLAY, href: `tel:${PHONE_TEL}` },
];

export default function Contact() {
    return (
        <section id="contact" className="bg-cream px-5 py-20 sm:px-8 sm:py-28">
            <div className="reveal relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-blush px-6 py-14 text-center sm:rounded-[3rem] sm:px-12 sm:py-20">
                <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-white/50 blur-2xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 size-72 rounded-full bg-rose/20 blur-2xl" />

                <div className="relative">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-deep">Let’s talk cake</p>
                    <h2 className="mx-auto mt-4 max-w-3xl text-4xl text-cocoa sm:text-5xl lg:text-6xl">
                        Have a design in mind? <em className="font-normal text-rose-deep">Let’s make it.</em>
                    </h2>
                    <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-cocoa/70 sm:text-lg">
                        Send a photo, a theme or just an idea. We’ll help you shape it and confirm your price.
                    </p>

                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-cocoa px-8 py-4 font-semibold text-cream shadow-lg shadow-cocoa/20 transition hover:bg-cocoa-light"
                        >
                            <MessageCircle size={20} /> Message on WhatsApp
                        </a>
                        <a
                            href={`tel:${PHONE_TEL}`}
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-cocoa/20 bg-white/70 px-8 py-4 font-semibold text-cocoa transition hover:bg-white"
                        >
                            <Phone size={20} /> Call {PHONE_DISPLAY}
                        </a>
                    </div>

                    <dl className="mx-auto mt-12 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
                        {DETAILS.map(({ icon: Icon, label, value, href }) => (
                            <div key={label} className="flex items-center gap-3 rounded-2xl bg-white/70 p-4">
                                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-rose/15 text-rose-deep">
                                    <Icon size={18} />
                                </span>
                                <div className="min-w-0">
                                    <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-cocoa/50">{label}</dt>
                                    <dd className="truncate font-medium text-cocoa">
                                        {href ? <a href={href} className="hover:text-rose-deep">{value}</a> : value}
                                    </dd>
                                </div>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}
