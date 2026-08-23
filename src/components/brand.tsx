import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  alt = "Vander",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <img
      src="/brand/vander-wordmark.png"
      alt={alt}
      className={cn("h-7 w-auto max-w-[9.75rem] object-contain object-left sm:h-11 sm:max-w-[14rem]", className)}
    />
  );
}

export function Vander20Mark({
  className,
  alt = "Vander 20",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <img
      src="/brand/vander-20.png"
      alt={alt}
      className={cn("h-14 w-auto max-w-full object-contain object-left sm:h-20", className)}
    />
  );
}

export function InnovativesMark({
  className,
  wide = false,
  alt = "50 Vander Innovatives",
}: {
  className?: string;
  wide?: boolean;
  alt?: string;
}) {
  return (
    <img
      src={wide ? "/brand/50-innovatives-wide.png" : "/brand/50-innovatives.png"}
      alt={alt}
      className={cn("h-14 w-auto max-w-full object-contain object-left sm:h-20", className)}
    />
  );
}

export function ContraMark({
  className,
  alt = "Contra la corriente",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <img
      src="/brand/contra-corriente.png"
      alt={alt}
      className={cn("h-8 w-auto max-w-full object-contain object-left sm:h-10", className)}
    />
  );
}

export function SignalsMark({
  className,
  alt = "Signals by Vander",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <img
      src="/brand/signals.png"
      alt={alt}
      className={cn("h-10 w-auto max-w-full object-contain object-left sm:h-14", className)}
    />
  );
}

export function VanderBug({ className }: { className?: string }) {
  return (
    <img
      src="/brand/v-rust.png"
      alt=""
      className={cn("inline-block size-3.5 shrink-0 object-cover align-middle", className)}
    />
  );
}

const V_MARKS = ["/brand/v-rust.png", "/brand/v-signal.png", "/brand/v-innov.png"] as const;

export function VanderCycle({ className }: { className?: string }) {
  return (
    <span className={cn("v-cycle", className)} aria-hidden>
      {V_MARKS.map((src) => (
        <img key={src} src={src} alt="" />
      ))}
    </span>
  );
}

export function ChileFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 9 6"
      className={cn("inline-block shrink-0 overflow-hidden rounded-[1px] shadow-[0_0_0_0.5px_rgba(0,0,0,0.2)]", className)}
      aria-hidden
      focusable="false"
    >
      <rect width="9" height="6" fill="#fff" />
      <rect y="3" width="9" height="3" fill="#D52B1E" />
      <rect width="3" height="3" fill="#0039A6" />
      <path
        fill="#fff"
        d="M1.5.55l.247.76h.8l-.647.47.247.76L1.5 2.07l-.647.47.247-.76-.647-.47h.8z"
      />
    </svg>
  );
}

export function ChileOnly({
  className,
  label = "Solo Chile",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <ChileFlag className="h-[0.85em] w-[1.28em]" />
      <span>{label}</span>
    </span>
  );
}
