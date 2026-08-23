import { createFileRoute } from "@tanstack/react-router";
import { LiveDesk } from "@/components/live-desk";
import { Newsletter } from "@/components/newsletter";
import { HOUSE, ISSUE } from "@/lib/content";

export const Route = createFileRoute("/channels")({
  component: ChannelsPage,
  head: () => ({
    meta: [
      { title: "Channels — We Are Vander" },
      {
        name: "description",
        content: "Yahoo Finance, Bloomberg, CNN y ABC News, en vivo y en mute. Channels, We Are Vander.",
      },
    ],
  }),
});

function ChannelsPage() {
  return (
    <main>
      <section className="bg-paper px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-7xl">
          <p className="kicker text-xs text-rust">Channels · {ISSUE.city}</p>
          <h1 className="headline mt-3 text-4xl sm:text-6xl">Channels</h1>
          <p className="mt-4 max-w-2xl font-body text-lg leading-snug text-ink-soft">
            Yahoo Finance, Bloomberg, CNN y ABC News. Pequeñas, en silencio, en el aire.
            {HOUSE.credit}.
          </p>
        </div>
      </section>
      <LiveDesk />
      <Newsletter />
    </main>
  );
}
