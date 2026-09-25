import { ArrowUp, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { LogoMark, Wordmark } from "@/components/Brand";
import { COLLECTION_POSTCODE, HOURS, NAV, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/site";

const heading = "text-xs font-semibold uppercase tracking-[0.25em] text-blush/60";
const link = "text-cream/80 transition-colors hover:text-rose";

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-cocoa text-cream">
            <div aria-hidden className="pointer-events-none absolute -left-40 -top-40 size-[520px] rounded-full bg-rose/15 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-52 -right-32 size-[480px] rounded-full bg-blush/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-5 pt-16 sm:px-8 lg:pt-24">
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-5">
                        <a href="#top" className="inline-flex items-center gap-4 rounded-full" aria-label="Zel Bakes, back to top">
                            <LogoMark className="size-20 lg:size-24" sizes="96px" />
                            <Wordmark tone="dark" />
                        </a>
                        <p className="mt-7 max-w-md font-serif text-2xl leading-snug text-cream sm:text-3xl">
                            Custom cakes, <em className="text-rose">baked with love</em> in Kettering.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <a
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noopener"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-rose-deep px-6 py-3.5 font-semibold text-white transition hover:bg-rose"
                            >
                                <MessageCircle size={18} /> WhatsApp us
                            </a>
                            <a
                                href="#quote"
                                className="inline-flex items-center justify-center rounded-full border border-cream/20 px-6 py-3.5 font-semibold text-cream transition hover:border-cream/50 hover:bg-cream/5"
                            >
                                Get a price
                            </a>
                        </div>
                    </div>

                    <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7 lg:pl-10">
                        <nav aria-label="Footer">
                            <p className={heading}>Explore</p>
                            <ul className="mt-5 space-y-3">
                                {NAV.map((l) => (
                                    <li key={l.href}>
                                        <a href={l.href} className={link}>
                                            {l.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div>
                            <p className={heading}>Contact</p>
                            <ul className="mt-5 space-y-3">
                                <li>
                                    <a href={WHATSAPP_URL} target="_blank" rel="noopener" className={`${link} inline-flex items-center gap-2`}>
                                        <MessageCircle size={16} className="text-rose" /> WhatsApp
                                    </a>
                                </li>
                                <li>
                                    <a href={`tel:${PHONE_TEL}`} className={`${link} inline-flex items-center gap-2`}>
                                        <Phone size={16} className="text-rose" /> {PHONE_DISPLAY}
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className={heading}>Collect</p>
                            <ul className="mt-5 space-y-3 text-cream/80">
                                <li className="flex gap-2">
                                    <MapPin size={16} className="mt-1 shrink-0 text-rose" />
                                    <span>
                                        Kettering
                                        <br />
                                        {COLLECTION_POSTCODE}
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <Clock size={16} className="mt-1 shrink-0 text-rose" />
                                    <span>{HOURS}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Signature wordmark */}
                <p
                    aria-hidden
                    className="mt-16 select-none whitespace-nowrap text-center font-serif text-[clamp(4.5rem,22vw,17rem)] leading-[0.85] text-cream/[0.07] lg:mt-20"
                >
                    Zel <em>Bakes</em>
                </p>

                <div className="flex flex-col items-center justify-between gap-4 border-t border-cream/10 py-7 text-center text-sm text-cream/50 sm:flex-row sm:text-left">
                    <p>© {new Date().getFullYear()} Zel Bakes</p>
                    <a href="#top" className="inline-flex items-center gap-2 text-cream/70 transition-colors hover:text-rose">
                        Back to top <ArrowUp size={16} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
