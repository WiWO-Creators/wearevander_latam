import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SignalsField({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={cn("signal-field relative overflow-hidden", className)}>
      <SignalsBackdrop />
      <div className="relative z-10">{children}</div>
    </section>
  );
}

function SignalsBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="signal-grid absolute inset-0" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
        <g fill="none" stroke="currentColor" className="text-ink/15">
          <path className="signal-wave" d="M0 200 C 80 120, 160 280, 240 200 S 400 120, 480 200 S 640 280, 720 200 S 880 120, 960 200 S 1120 280, 1200 200" strokeWidth="1.2" />
          <path className="signal-wave-delayed" d="M0 240 C 90 180, 170 300, 260 240 S 430 180, 520 240 S 690 300, 780 240 S 950 180, 1040 240 S 1160 300, 1200 240" strokeWidth="0.8" opacity="0.7" />
          <path d="M0 160 C 100 220, 200 100, 300 160 S 500 220, 600 160 S 800 100, 900 160 S 1100 220, 1200 160" strokeWidth="0.6" opacity="0.45" />
        </g>
        <g fill="none" stroke="currentColor" className="text-ink/12" strokeWidth="0.8">
          <circle cx="980" cy="90" r="28" />
          <circle cx="980" cy="90" r="56" />
          <circle cx="980" cy="90" r="88" className="signal-ring" />
          <circle cx="980" cy="90" r="122" className="signal-ring-delayed" />
        </g>
        <g fill="currentColor" className="text-ink/35">
          <circle cx="952" cy="90" r="3.5" />
          <circle cx="980" cy="90" r="5" />
          <circle cx="1012" cy="90" r="7" />
        </g>
      </svg>
      <div className="signal-scan absolute inset-x-0 top-0 h-px" />
    </div>
  );
}
