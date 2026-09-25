"use client";

import { motion, AnimatePresence, useSpring, useTransform } from "motion/react";
import { LogoMark } from "@/components/Brand";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, Check, ChevronDown, MessageCircle, Share2, FileDown, RotateCcw, MapPin, CalendarDays, PenLine, NotebookPen } from "lucide-react";
import { CATEGORIES, COLLECTION_POSTCODE, WHATSAPP_NUMBER, fmt, type Category } from "@/lib/pricing";
import { renderQuoteImage, type QuoteData } from "@/lib/quoteImage";
import SectionHeading from "@/components/SectionHeading";

type Selection = Record<Category["key"], number>;
type StepKey = Category["key"] | "details" | "none";

const STEP_KEYS: StepKey[] = [...CATEGORIES.map((c) => c.key), "details"];

const priceLabel = (price: number | null, note?: string) =>
    price === null ? note ?? "On request" : price === 0 ? "Included" : `+£${price}`;

const stepCls = (open: boolean) =>
    `scroll-mt-28 overflow-hidden rounded-2xl border bg-white shadow-[0_20px_50px_-30px_rgba(74,42,34,0.25)] transition-colors lg:rounded-[2rem] lg:border-cocoa/10 ${
        open ? "border-rose/40" : "border-cocoa/10"
    }`;

const labelCls = "mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-cocoa/60";

function StepNumber({ n, open }: { n: number; open: boolean }) {
    return (
        <>
            <span
                className={`grid size-9 shrink-0 place-items-center rounded-full font-serif text-base transition-colors lg:hidden ${
                    open ? "bg-rose-deep text-white" : "bg-blush text-rose-deep"
                }`}
            >
                {n}
            </span>
            <span className="hidden font-serif text-2xl italic leading-none text-rose lg:inline">{String(n).padStart(2, "0")}</span>
        </>
    );
}

const defaults = () =>
    Object.fromEntries(CATEGORIES.map((c) => [c.key, c.defaultIndex])) as Selection;

const todayISO = () => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
};

const fmtDate = (iso: string) => {
    if (!iso) return "Not set";
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
};

const makeRef = () => {
    const d = new Date();
    const stamp = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
    return `ZB-${stamp}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
};

export default function PriceCalculator() {
    const [sel, setSel] = useState<Selection>(defaults);
    const [date, setDate] = useState("");
    const [message, setMessage] = useState("");
    const [notes, setNotes] = useState("");
    const [busy, setBusy] = useState<"" | "image" | "pdf">("");
    const [toast, setToast] = useState("");
    const [minDate, setMinDate] = useState("");
    const [showBar, setShowBar] = useState(false);
    const [openStep, setOpenStep] = useState<StepKey>(CATEGORIES[0].key);

    const sectionRef = useRef<HTMLElement>(null);
    const summaryRef = useRef<HTMLDivElement>(null);

    useEffect(() => setMinDate(todayISO()), []);

    // Mobile price bar: visible while the section is on screen but the summary isn't.
    useEffect(() => {
        const section = sectionRef.current;
        const summary = summaryRef.current;
        if (!section || !summary) return;
        let inSection = false;
        let summaryVisible = false;
        const update = () => setShowBar(inSection && !summaryVisible);
        const io = new IntersectionObserver((entries) => {
            for (const e of entries) {
                if (e.target === section) inSection = e.isIntersecting;
                if (e.target === summary) summaryVisible = e.isIntersecting;
            }
            update();
        }, { threshold: 0 });
        io.observe(section);
        io.observe(summary);
        return () => io.disconnect();
    }, []);

    const lines = useMemo(
        () => CATEGORIES.map((c) => ({ title: c.title, ...c.options[sel[c.key]] })),
        [sel]
    );
    const onRequest = lines.some((l) => l.price === null);
    const total = lines.reduce((sum, l) => sum + (l.price ?? 0), 0);

    const spring = useSpring(total, { stiffness: 140, damping: 20 });
    useEffect(() => { spring.set(total); }, [total, spring]);
    const animatedTotal = useTransform(spring, (v) => fmt(Math.round(v)));

    const priceText = onRequest ? "Price on request" : fmt(total);

    const stepIndex = STEP_KEYS.indexOf(openStep);
    const stepNumber = stepIndex >= 0 ? stepIndex + 1 : 0;

    // On mobile, picking an option moves you on to the next step.
    const choose = (catIdx: number, optIdx: number) => {
        const cat = CATEGORIES[catIdx];
        setSel((s) => ({ ...s, [cat.key]: optIdx }));
        if (window.matchMedia("(min-width: 1024px)").matches) return;
        window.setTimeout(() => {
            scrollToStep.current = true;
            setOpenStep(STEP_KEYS[catIdx + 1]);
        }, 180);
    };

    // Scroll once the new step has actually opened, so the position is measured after layout changes.
    const scrollToStep = useRef(false);
    useEffect(() => {
        if (!scrollToStep.current) return;
        scrollToStep.current = false;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        document.getElementById(`step-${openStep}`)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }, [openStep]);

    const flash = (text: string) => {
        setToast(text);
        window.setTimeout(() => setToast(""), 2400);
    };

    const quoteData = (): QuoteData => ({
        ref: makeRef(),
        issued: new Date().toLocaleDateString("en-GB"),
        lines: lines.map((l) => ({ label: l.title, value: l.label, price: l.price })),
        details: [
            { label: "Collection", value: COLLECTION_POSTCODE },
            { label: "Collection date", value: fmtDate(date) },
            { label: "Message on cake", value: message.trim() || "None" },
            { label: "Special instructions", value: notes.trim() || "None" },
        ],
        priceText,
    });

    const sendWhatsApp = () => {
        const q = quoteData();
        const text = [
            `Hi Zel Bakes! I'd like to order a cake 🎂`,
            `Quote ref: ${q.ref}`,
            "",
            ...q.lines.map((l) => `• ${l.label}: ${l.value}${l.price ? ` (${fmt(l.price)})` : ""}`),
            "",
            ...q.details.map((d) => `• ${d.label}: ${d.value}`),
            "",
            `Estimated total: ${q.priceText}`,
        ].join("\n");
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    };

    const download = (blob: Blob, name: string) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 4000);
    };

    const saveImage = async () => {
        setBusy("image");
        try {
            const canvas = await renderQuoteImage(quoteData());
            const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/png"));
            if (!blob) throw new Error("no blob");
            const file = new File([blob], "zel-bakes-quote.png", { type: "image/png" });
            if (navigator.canShare?.({ files: [file] })) {
                try {
                    await navigator.share({ files: [file], title: "Zel Bakes Quote" });
                    flash("Quote shared");
                    return;
                } catch (e) {
                    if ((e as Error).name === "AbortError") return;
                }
            }
            download(blob, file.name);
            flash("Quote image saved");
        } catch {
            flash("Couldn't create the image — please take a screenshot");
        } finally {
            setBusy("");
        }
    };

    const savePdf = async () => {
        setBusy("pdf");
        try {
            const [{ jsPDF }, canvas] = await Promise.all([import("jspdf"), renderQuoteImage(quoteData())]);
            const w = 210;
            const h = (w * canvas.height) / canvas.width;
            const pdf = new jsPDF({ unit: "mm", format: [w, h], orientation: "portrait" });
            pdf.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, w, h);
            download(pdf.output("blob"), "zel-bakes-quote.pdf");
            flash("PDF downloaded");
        } catch {
            flash("Couldn't create the PDF — please try again");
        } finally {
            setBusy("");
        }
    };

    const reset = () => {
        setSel(defaults());
        setOpenStep(CATEGORIES[0].key);
        setDate("");
        setMessage("");
        setNotes("");
        flash("Calculator reset");
    };

    const inputCls =
        "w-full rounded-2xl border border-cocoa/15 bg-white/70 px-5 py-4 text-base text-cocoa placeholder:text-cocoa/35 outline-none transition focus:border-rose focus:ring-4 focus:ring-rose/15";

    return (
        <section ref={sectionRef} id="quote" className="relative overflow-clip bg-cream py-20 sm:py-28">
            <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 size-[520px] rounded-full bg-blush/60 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
                <div className="mb-12 md:mb-16">
                    <SectionHeading
                        eyebrow="Instant price guide"
                        title={<>Design your cake, <em className="font-normal text-rose">see the price</em></>}
                        intro="Tap your choices below and your estimate updates as you go. Happy with it? Send it straight to Zel Bakes on WhatsApp."
                    />
                </div>

                <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
                    {/* Builder: a guided one-step-at-a-time flow on mobile, all steps open on desktop */}
                    <div className="space-y-3 lg:col-span-7 lg:space-y-6">
                        {CATEGORIES.map((cat, idx) => {
                            const open = openStep === cat.key;
                            const chosen = cat.options[sel[cat.key]];
                            return (
                                <div key={cat.key} id={`step-${cat.key}`} className={stepCls(open)}>
                                    <button
                                        type="button"
                                        onClick={() => setOpenStep(open ? "none" : cat.key)}
                                        aria-expanded={open}
                                        aria-controls={`panel-${cat.key}`}
                                        className="flex w-full items-center gap-3.5 px-4 py-3.5 text-left sm:px-6 lg:pointer-events-none lg:gap-4 lg:px-8 lg:pb-0 lg:pt-8"
                                    >
                                        <StepNumber n={idx + 1} open={open} />
                                        <span className="min-w-0 flex-1">
                                            <span className="block font-serif text-xl text-cocoa lg:text-3xl">{cat.title}</span>
                                            <span className="mt-0.5 block truncate text-sm text-cocoa/60 lg:hidden">
                                                {chosen.label} · {priceLabel(chosen.price, chosen.note)}
                                            </span>
                                        </span>
                                        <span className="hidden text-[10px] uppercase tracking-[0.25em] text-cocoa/40 lg:block">{cat.hint}</span>
                                        <ChevronDown size={20} className={`shrink-0 text-cocoa/50 transition-transform lg:hidden ${open ? "rotate-180" : ""}`} />
                                    </button>

                                    <div id={`panel-${cat.key}`} className={`${open ? "block" : "hidden"} px-4 pb-4 sm:px-6 lg:block lg:px-8 lg:pb-8 lg:pt-5`}>
                                        <p className="mb-3 text-xs text-cocoa/55 lg:hidden">{cat.hint}</p>
                                        <div role="radiogroup" aria-label={cat.title} className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:gap-3">
                                            {cat.options.map((opt, i) => {
                                                const active = sel[cat.key] === i;
                                                return (
                                                    <button
                                                        key={opt.label}
                                                        type="button"
                                                        role="radio"
                                                        aria-checked={active}
                                                        onClick={() => choose(idx, i)}
                                                        className={`relative min-h-[3.75rem] rounded-xl border px-3.5 py-2.5 text-left transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose/30 lg:min-h-[4.25rem] lg:rounded-2xl lg:px-4 lg:py-3 ${
                                                            active
                                                                ? "border-cocoa bg-cocoa text-cream shadow-lg shadow-cocoa/20"
                                                                : "border-cocoa/12 bg-white text-cocoa hover:border-rose/60"
                                                        }`}
                                                    >
                                                        <span className="block pr-5 text-[15px] font-semibold leading-tight lg:text-sm">{opt.label}</span>
                                                        <span className={`mt-1 block text-xs ${active ? "text-blush" : "text-cocoa/55"}`}>{priceLabel(opt.price, opt.note)}</span>
                                                        {active && (
                                                            <span className="absolute right-2.5 top-2.5 grid size-5 place-items-center rounded-full bg-rose text-white">
                                                                <Check size={12} strokeWidth={3} />
                                                            </span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Details */}
                        <div id="step-details" className={stepCls(openStep === "details")}>
                            <button
                                type="button"
                                onClick={() => setOpenStep(openStep === "details" ? "none" : "details")}
                                aria-expanded={openStep === "details"}
                                aria-controls="panel-details"
                                className="flex w-full items-center gap-3.5 px-4 py-3.5 text-left sm:px-6 lg:pointer-events-none lg:gap-4 lg:px-8 lg:pb-0 lg:pt-8"
                            >
                                <StepNumber n={CATEGORIES.length + 1} open={openStep === "details"} />
                                <span className="min-w-0 flex-1">
                                    <span className="block font-serif text-xl text-cocoa lg:text-3xl">Collection details</span>
                                    <span className="mt-0.5 block truncate text-sm text-cocoa/60 lg:hidden">
                                        {date ? `Collect ${fmtDate(date)}` : "Add your date & message"}
                                    </span>
                                </span>
                                <ChevronDown size={20} className={`shrink-0 text-cocoa/50 transition-transform lg:hidden ${openStep === "details" ? "rotate-180" : ""}`} />
                            </button>
                            <div id="panel-details" className={`${openStep === "details" ? "block" : "hidden"} px-4 pb-5 sm:px-6 lg:block lg:px-8 lg:pb-8 lg:pt-6`}>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
                                    <label className="block">
                                        <span className={labelCls}>
                                            <CalendarDays size={14} className="text-rose" /> Collection date
                                        </span>
                                        <input type="date" min={minDate} value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
                                    </label>
                                    <div>
                                        <span className={labelCls}>
                                            <MapPin size={14} className="text-rose" /> Collection point
                                        </span>
                                        <div className="rounded-2xl border border-dashed border-cocoa/20 px-5 py-4 font-semibold text-cocoa">Kettering, {COLLECTION_POSTCODE}</div>
                                    </div>
                                    <label className="block md:col-span-2">
                                        <span className={labelCls}>
                                            <PenLine size={14} className="text-rose" /> Message on the cake
                                        </span>
                                        <input
                                            type="text"
                                            maxLength={60}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="e.g. Happy Birthday Ava"
                                            className={inputCls}
                                        />
                                    </label>
                                    <label className="block md:col-span-2">
                                        <span className={labelCls}>
                                            <NotebookPen size={14} className="text-rose" /> Special instructions
                                        </span>
                                        <textarea
                                            rows={3}
                                            maxLength={400}
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            placeholder="Colours, theme, design ideas, allergies…"
                                            className={`${inputCls} resize-y`}
                                        />
                                    </label>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-cocoa px-6 py-4 font-semibold text-cream lg:hidden"
                                >
                                    Review my quote <ArrowDown size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Summary / quote */}
                    <div ref={summaryRef} className="lg:col-span-5 lg:sticky lg:top-32">
                        <div className="relative rounded-[2.5rem] bg-cocoa text-cream p-7 md:p-10 overflow-hidden shadow-[0_50px_100px_-20px_rgba(74,42,34,0.35)]">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose/20 via-transparent to-transparent opacity-40 pointer-events-none" />

                            <div className="relative flex items-center gap-4 pb-6 border-b border-cream/10">
                                <LogoMark className="size-16 lg:size-20" />
                                <div>
                                    <p className="font-serif text-2xl text-cream leading-none">Zel <em className="text-rose">Bakes</em></p>
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-rose/80 mt-2">Your cake quote</p>
                                </div>
                            </div>

                            <div className="relative py-6 md:py-7 text-center" aria-live="polite">
                                <p className="text-[10px] uppercase tracking-[0.4em] text-cream/50 mb-3">Estimated total</p>
                                {onRequest ? (
                                    <p className="font-serif text-4xl md:text-5xl text-rose italic">Price on request</p>
                                ) : (
                                    <motion.p className="font-serif text-6xl md:text-7xl text-rose tabular-nums">{animatedTotal}</motion.p>
                                )}
                            </div>

                            <dl className="relative space-y-3 text-sm">
                                {lines.map((l) => (
                                    <div key={l.title} className="flex items-center justify-between gap-4">
                                        <dt className="text-cream/50">{l.title}</dt>
                                        <dd className="flex items-center gap-3 text-right">
                                            <span className="font-medium">{l.label}</span>
                                            <span className="w-14 text-rose/80 tabular-nums">
                                                {l.price === null ? "—" : l.price === 0 ? "£0" : fmt(l.price).replace(".00", "")}
                                            </span>
                                        </dd>
                                    </div>
                                ))}
                                <div className="flex items-center justify-between gap-4 pt-3 border-t border-cream/10">
                                    <dt className="text-cream/50">Collection</dt>
                                    <dd className="font-medium text-right">{fmtDate(date)} · {COLLECTION_POSTCODE}</dd>
                                </div>
                            </dl>

                            <div className="relative mt-8 space-y-3">
                                <motion.button
                                    type="button"
                                    onClick={sendWhatsApp}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full flex items-center justify-center gap-3 px-6 py-5 bg-rose text-cocoa rounded-2xl font-bold text-xs tracking-[0.2em] uppercase shadow-2xl shadow-rose/20 hover:bg-cream transition-colors"
                                >
                                    <MessageCircle size={20} /> Send on WhatsApp
                                </motion.button>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={saveImage}
                                        disabled={!!busy}
                                        className="flex items-center justify-center gap-2 px-4 py-4 rounded-2xl border border-cream/15 text-cream text-[11px] font-bold tracking-[0.1em] sm:tracking-[0.15em] whitespace-nowrap uppercase hover:bg-cream hover:text-cocoa transition-colors disabled:opacity-50"
                                    >
                                        <Share2 size={16} /> {busy === "image" ? "Preparing…" : "Save image"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={savePdf}
                                        disabled={!!busy}
                                        className="flex items-center justify-center gap-2 px-4 py-4 rounded-2xl border border-cream/15 text-cream text-[11px] font-bold tracking-[0.1em] sm:tracking-[0.15em] whitespace-nowrap uppercase hover:bg-cream hover:text-cocoa transition-colors disabled:opacity-50"
                                    >
                                        <FileDown size={16} /> {busy === "pdf" ? "Preparing…" : "PDF"}
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    onClick={reset}
                                    className="w-full flex items-center justify-center gap-2 py-3 text-cream/50 hover:text-rose text-[10px] tracking-[0.3em] uppercase transition-colors"
                                >
                                    <RotateCcw size={14} /> Start again
                                </button>
                            </div>

                            <p className="relative mt-2 text-[11px] leading-relaxed text-cream/40 text-center">
                                This is an estimate. Your final price is confirmed once we&apos;ve reviewed your design and requirements.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile docked price bar */}
            <AnimatePresence>
                {showBar && (
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed inset-x-0 bottom-0 z-40 border-t border-cream/10 bg-cocoa/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 text-cream shadow-[0_-12px_30px_-12px_rgba(74,42,34,0.5)] backdrop-blur-md lg:hidden"
                    >
                        <div className="mx-auto flex max-w-xl items-center gap-3">
                            <button
                                type="button"
                                onClick={() => summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                                className="min-w-0 flex-1 text-left"
                                aria-label="View full quote"
                            >
                                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/60">
                                    Estimate{stepNumber ? ` · Step ${stepNumber} of ${CATEGORIES.length + 1}` : ""}
                                </span>
                                {onRequest ? (
                                    <span className="block font-serif text-xl italic text-blush">Price on request</span>
                                ) : (
                                    <motion.span className="block font-serif text-2xl tabular-nums text-blush">{animatedTotal}</motion.span>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={sendWhatsApp}
                                className="flex shrink-0 items-center gap-2 rounded-full bg-rose-deep px-5 py-3 text-sm font-semibold text-white"
                            >
                                <MessageCircle size={18} /> Send
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toast */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        role="status"
                        className="fixed inset-x-0 bottom-28 lg:bottom-10 z-50 flex justify-center px-4 pointer-events-none"
                    >
                        <span className="bg-cocoa text-cream text-sm px-5 py-3 rounded-full shadow-2xl border border-rose/20">{toast}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
