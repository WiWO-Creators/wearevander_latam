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
      className={cn("h-9 w-auto object-contain object-left sm:h-11", className)}
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
