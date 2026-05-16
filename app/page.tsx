import { ArrowRight, Braces, GitBranch, ImagePlus, Layers3, Moon, Sparkles } from "lucide-react";
import Link from "next/link";
import { NodeTypeIcon } from "@/components/NodeTypeIcon";

const previewNodes = [
  { type: "character" as const, label: "Lead explorer", x: "12%", y: "20%" },
  { type: "territory" as const, label: "Iron coast", x: "55%", y: "16%" },
  { type: "faction" as const, label: "Glass guild", x: "32%", y: "50%" },
  { type: "magicSystem" as const, label: "Signal craft", x: "68%", y: "58%" },
];

const features = [
  { icon: Layers3, title: "Nested world layers", copy: "Organize characters, places, factions, lore, and systems into a draggable structure that stays readable as the world grows." },
  { icon: GitBranch, title: "Relationship canvas", copy: "Connect ideas visually, inspect relationships, and keep cause, allegiance, control, and location clear at a glance." },
  { icon: ImagePlus, title: "Image-rich nodes", copy: "Attach reference art, maps, mood images, or character portraits directly to the cards that need them." },
  { icon: Moon, title: "Focused themes", copy: "Switch between a crisp light workspace and a true neutral dark mode with purple accents for important actions." },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-gray-950 dark:bg-neutral-950 dark:text-gray-50">
      <nav className="fixed inset-x-0 top-0 z-30 border-b border-gray-200 bg-white/90 px-6 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/90">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="h-3 w-3 rounded-full bg-accent shadow-sm shadow-purple-500/40 dark:bg-purple-300" />
            Ingot
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/app" className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-purple-300 hover:text-purple-700 dark:border-neutral-800 dark:text-gray-200 dark:hover:border-purple-300/60 dark:hover:text-purple-200">
              Sign in
            </Link>
            <Link href="/app" className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-purple-500/20 transition hover:bg-purple-700 dark:bg-purple-300 dark:text-neutral-950 dark:hover:bg-purple-200">
              Open app
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative min-h-[86vh] overflow-hidden px-6 pb-20 pt-28">
        <div className="absolute inset-0 bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] bg-[size:48px_48px] opacity-70 dark:bg-[linear-gradient(#262626_1px,transparent_1px),linear-gradient(90deg,#262626_1px,transparent_1px)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-white dark:bg-neutral-950" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[22%] top-[32%] h-px w-[42%] rotate-12 bg-purple-300 dark:bg-purple-300/40" />
          <div className="absolute left-[38%] top-[51%] h-px w-[30%] -rotate-12 bg-emerald-300 dark:bg-emerald-300/40" />
          {previewNodes.map((node) => (
            <div key={node.label} className="absolute hidden rounded-lg border border-gray-200 bg-white p-3 shadow-soft dark:border-neutral-800 dark:bg-neutral-900 md:block" style={{ left: node.x, top: node.y }}>
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-300/15 dark:text-purple-200">
                  <NodeTypeIcon type={node.type} />
                </span>
                <div>
                  <div className="text-sm font-semibold">{node.label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{node.type}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative mx-auto flex min-h-[66vh] max-w-7xl items-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-sm font-medium text-purple-700 dark:border-purple-400/30 dark:bg-purple-400/10 dark:text-purple-200">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Worldbuilding that feels like a design tool
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-tight tracking-normal text-gray-950 dark:text-gray-50 md:text-7xl">
              Build worlds with layers, images, and living connections.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
              Ingot gives writers, game designers, and creative teams a visual workspace for characters, places, factions, lore, and the relationships between them.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/app" className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-purple-500/20 transition hover:bg-purple-700 dark:bg-purple-300 dark:text-neutral-950 dark:hover:bg-purple-200">
                Start in the app
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a href="#features" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-purple-300 hover:text-purple-700 dark:border-neutral-800 dark:bg-neutral-950 dark:text-gray-200 dark:hover:border-purple-300/60 dark:hover:text-purple-200">
                Explore features
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex max-w-3xl items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-300/15 dark:text-purple-200">
              <Braces className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-3xl font-semibold">A workspace for complex stories</h2>
              <p className="mt-1 text-gray-600 dark:text-gray-300">Start on the website, open the app, and keep moving without changing mental models.</p>
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-gray-100 text-purple-700 dark:bg-neutral-800 dark:text-purple-200">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{feature.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
