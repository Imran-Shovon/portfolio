"use client";

/** Shown when the content API can't be reached or returns an error. */
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: "var(--color-base)" }}>
      <div className="max-w-md text-center glass-card rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-sora)" }}>
          Content is unavailable
        </h1>
        <p className="text-gray-400 mb-6">The site couldn&apos;t load its content right now. Please try again in a moment.</p>
        <button
          type="button"
          onClick={reset}
          className="px-6 py-3 rounded-full text-white font-semibold"
          style={{ background: "linear-gradient(135deg, var(--color-accent-blue), var(--color-accent-purple))" }}
        >
          Try again
        </button>
      </div>
    </main>
  );
}
