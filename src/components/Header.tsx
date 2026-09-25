"use client";

import { AnimatePresence, motion } from "motion/react";
import { LogoMark, Wordmark } from "@/components/Brand";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/site";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300 ${
                    scrolled
                        ? "border-cocoa/10 bg-cream/90 shadow-[0_8px_30px_-18px_rgba(74,42,34,0.35)] backdrop-blur-xl"
                        : "border-transparent bg-transparent"
                }`}
            >
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:h-24">
                    <a href="#top" className="flex items-center gap-3 rounded-full" aria-label="Zel Bakes by Divya, back to top">
                        <LogoMark className="size-16 lg:size-20" preload />
                        <Wordmark />
                    </a>

                    <nav aria-label="Main" className="hidden lg:block">
                        <ul className="flex items-center gap-9">
                            {NAV.map((l) => (
                                <li key={l.href}>
                                    <a href={l.href} className="text-sm font-medium text-cocoa/80 transition-colors hover:text-rose-deep">
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-2">
                        <a
                            href="#quote"
                            className="hidden rounded-full bg-cocoa px-5 py-3 text-sm font-semibold text-cream transition hover:bg-cocoa-light sm:inline-flex"
                        >
                            Get a price
                        </a>
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            aria-label="Open menu"
                            aria-expanded={open}
                            aria-controls="mobile-menu"
                            className="grid size-11 place-items-center rounded-full text-cocoa transition hover:bg-cocoa/5 lg:hidden"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {open && (
                    <motion.div
                        id="mobile-menu"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[60] flex flex-col bg-cream lg:hidden"
                    >
                        <div className="flex h-20 items-center justify-between px-5 sm:px-8">
                            <span className="flex items-center gap-3">
                                <LogoMark className="size-14" />
                                <Wordmark tagline={false} />
                            </span>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                aria-label="Close menu"
                                autoFocus
                                className="grid size-11 place-items-center rounded-full bg-cocoa/5 text-cocoa"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 pt-6 sm:px-8">
                            <ul>
                                {NAV.map((l, i) => (
                                    <motion.li
                                        key={l.href}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.04 * i + 0.05 }}
                                    >
                                        <a
                                            href={l.href}
                                            onClick={() => setOpen(false)}
                                            className="flex items-center justify-between border-b border-cocoa/10 py-4 font-serif text-3xl text-cocoa"
                                        >
                                            {l.label}
                                            <span aria-hidden className="text-base text-rose">→</span>
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </nav>

                        <div className="grid grid-cols-2 gap-3 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 sm:px-8">
                            <a
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noopener"
                                className="flex items-center justify-center gap-2 rounded-2xl bg-rose-deep px-4 py-4 text-sm font-semibold text-white"
                            >
                                <MessageCircle size={18} /> WhatsApp
                            </a>
                            <a
                                href={`tel:${PHONE_TEL}`}
                                aria-label={`Call ${PHONE_DISPLAY}`}
                                className="flex items-center justify-center gap-2 rounded-2xl bg-cocoa px-4 py-4 text-sm font-semibold text-cream"
                            >
                                <Phone size={18} /> Call
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
