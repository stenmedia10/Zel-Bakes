import { fmt } from "@/lib/pricing";

export type QuoteData = {
    ref: string;
    issued: string;
    lines: { label: string; value: string; price: number | null }[];
    details: { label: string; value: string }[];
    priceText: string;
};

const COCOA = "#4b2a20";
const ROSE = "#d25d86";
const CREAM = "#fdf7f3";
const INK_SOFT = "rgba(75,42,32,0.55)";
const LINE = "rgba(75,42,32,0.12)";

const loadImage = (src: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
    const out: string[] = [];
    for (const para of text.split("\n")) {
        let line = "";
        for (const word of para.split(/\s+/)) {
            const test = line ? `${line} ${word}` : word;
            if (ctx.measureText(test).width > maxWidth && line) {
                out.push(line);
                line = word;
            } else {
                line = test;
            }
        }
        out.push(line);
    }
    return out;
}

/** Draws a branded quote card directly on a canvas (no DOM screenshotting). */
export async function renderQuoteImage(q: QuoteData): Promise<HTMLCanvasElement> {
    const styles = getComputedStyle(document.body);
    const serif = `${styles.getPropertyValue("--font-playfair").trim() || "Georgia"}, Georgia, serif`;
    const sans = `${styles.getPropertyValue("--font-inter").trim() || "system-ui"}, system-ui, sans-serif`;
    await document.fonts?.ready;

    const W = 1080;
    const PAD = 80;
    const scale = 2;
    const valueX = W - PAD;
    const valueMax = W - PAD * 2;

    // Measure pass to compute height.
    const measure = document.createElement("canvas").getContext("2d")!;
    measure.font = `500 30px ${sans}`;
    const detailRows = q.details.map((d) => ({ ...d, wrapped: wrap(measure, d.value, valueMax) }));

    const headerH = 360;
    const priceH = 220;
    const rowH = 64;
    const detailsH = detailRows.reduce((h, r) => h + 30 + r.wrapped.length * 40 + 30, 0);
    const H = headerH + priceH + 70 + q.lines.length * rowH + 60 + detailsH + 200;

    const canvas = document.createElement("canvas");
    canvas.width = W * scale;
    canvas.height = H * scale;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(scale, scale);

    // Background
    ctx.fillStyle = CREAM;
    ctx.fillRect(0, 0, W, H);

    // Header band
    ctx.fillStyle = COCOA;
    ctx.fillRect(0, 0, W, headerH);
    ctx.fillStyle = ROSE;
    ctx.fillRect(0, headerH - 6, W, 6);

    try {
        const logo = await loadImage("/img/logo-800.jpg");
        const size = 200;
        const cx = PAD + size / 2;
        const cy = headerH / 2;
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(logo, cx - size / 2, cy - size / 2, size, size);
        ctx.restore();
        ctx.strokeStyle = ROSE;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(cx, cy, size / 2 + 4, 0, Math.PI * 2);
        ctx.stroke();
    } catch {
        /* logo is optional */
    }

    const tx = PAD + 250;
    ctx.fillStyle = CREAM;
    ctx.font = `600 64px ${serif}`;
    ctx.fillText("Zel Bakes", tx, 160);
    ctx.fillStyle = ROSE;
    ctx.font = `600 22px ${sans}`;
    ctx.fillText("HOMEMADE  ·  CAKE QUOTE", tx, 205);
    ctx.fillStyle = "rgba(253,247,243,0.65)";
    ctx.font = `400 24px ${sans}`;
    ctx.fillText(`Ref ${q.ref}  ·  ${q.issued}`, tx, 250);

    // Price
    let y = headerH + 80;
    ctx.textAlign = "center";
    ctx.fillStyle = INK_SOFT;
    ctx.font = `600 22px ${sans}`;
    ctx.fillText("ESTIMATED TOTAL", W / 2, y);
    ctx.fillStyle = COCOA;
    ctx.font = `600 ${q.priceText.startsWith("£") ? 104 : 72}px ${serif}`;
    ctx.fillText(q.priceText, W / 2, y + 110);
    ctx.textAlign = "left";

    // Line items
    y = headerH + priceH + 40;
    const sectionTitle = (t: string) => {
        ctx.fillStyle = ROSE;
        ctx.font = `700 22px ${sans}`;
        ctx.fillText(t, PAD, y);
        y += 30;
    };
    sectionTitle("YOUR CAKE");
    for (const l of q.lines) {
        ctx.strokeStyle = LINE;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(PAD, y);
        ctx.lineTo(W - PAD, y);
        ctx.stroke();
        const baseline = y + 42;
        ctx.fillStyle = INK_SOFT;
        ctx.font = `400 28px ${sans}`;
        ctx.fillText(l.label, PAD, baseline);
        ctx.textAlign = "right";
        ctx.fillStyle = ROSE;
        ctx.font = `600 28px ${sans}`;
        const priceStr = l.price === null ? "On request" : fmt(l.price);
        ctx.fillText(priceStr, valueX, baseline);
        const pw = ctx.measureText(priceStr).width;
        ctx.fillStyle = COCOA;
        ctx.font = `600 30px ${sans}`;
        ctx.fillText(l.value, valueX - pw - 36, baseline);
        ctx.textAlign = "left";
        y += rowH;
    }

    // Details
    y += 50;
    sectionTitle("COLLECTION & NOTES");
    for (const d of detailRows) {
        ctx.fillStyle = INK_SOFT;
        ctx.font = `400 24px ${sans}`;
        y += 30;
        ctx.fillText(d.label, PAD, y);
        ctx.fillStyle = COCOA;
        ctx.font = `500 30px ${sans}`;
        for (const line of d.wrapped) {
            y += 40;
            ctx.fillText(line, PAD, y);
        }
        y += 30;
    }

    // Footer
    const fy = H - 130;
    ctx.fillStyle = "rgba(210,93,134,0.1)";
    ctx.fillRect(0, fy - 20, W, 150);
    ctx.textAlign = "center";
    ctx.fillStyle = COCOA;
    ctx.font = `italic 500 28px ${serif}`;
    ctx.fillText("Baked with love · Homemade · Customised", W / 2, fy + 30);
    ctx.fillStyle = INK_SOFT;
    ctx.font = `400 21px ${sans}`;
    ctx.fillText("This is an estimate. Final price is confirmed after we review your design.", W / 2, fy + 72);

    return canvas;
}
