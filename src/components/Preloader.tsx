"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const MIN_MS = 2400; // time for the full reveal: logo, icing ring, name and progress
const MAX_MS = 4500; // never hold the page hostage on a slow connection
const EXIT_MS = 900;

/**
 * Branded splash shown on the first visit of a session. The markup and animation are
 * pure CSS (see globals.css), so it paints instantly and even works without JS;
 * this component only decides when to leave.
 */
export default function Preloader() {
    const [phase, setPhase] = useState<"show" | "leaving" | "gone">("show");

    useEffect(() => {
        if (document.documentElement.classList.contains("zb-skip")) return;
        const timers: number[] = [];
        let finished = false;

        const finish = () => {
            if (finished) return;
            finished = true;
            const wait = Math.max(0, MIN_MS - performance.now());
            timers.push(
                window.setTimeout(() => {
                    setPhase("leaving");
                    try {
                        sessionStorage.setItem("zb-seen", "1");
                    } catch {
                        /* private mode: just show it again next time */
                    }
                    timers.push(window.setTimeout(() => setPhase("gone"), EXIT_MS));
                }, wait)
            );
        };

        if (document.readyState === "complete") finish();
        else window.addEventListener("load", finish, { once: true });
        timers.push(window.setTimeout(finish, MAX_MS));

        return () => {
            window.removeEventListener("load", finish);
            timers.forEach(clearTimeout);
        };
    }, []);

    if (phase === "gone") return null;

    return (
        <div
            className={`zb-preloader${phase === "leaving" ? " is-leaving" : ""}`}
            role="status"
            aria-label="Loading Zel Bakes"
        >
            <div className="zb-preloader__glow" aria-hidden />
            <div className="zb-preloader__badge" aria-hidden>
                <svg className="zb-preloader__sprinkles" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="58" pathLength="100" />
                </svg>
                <svg className="zb-preloader__ring" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" pathLength="100" />
                </svg>
                <div className="zb-preloader__logo">
                    <Image src="/img/logo.jpg" alt="" fill sizes="160px" preload />
                </div>
            </div>
            <p className="zb-preloader__name" aria-hidden>
                Zel <em>Bakes</em>
            </p>
            <p className="zb-preloader__tag" aria-hidden>
                Baked with love
            </p>
            <div className="zb-preloader__progress" aria-hidden>
                <span />
            </div>
        </div>
    );
}
