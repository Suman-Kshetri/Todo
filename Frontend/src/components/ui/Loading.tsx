const Loading = () => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[var(--bg-color)]">
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 rounded-full border-2 border-[var(--border-color)]" />
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--accent-color)] animate-spin" />
    </div>
    <p className="text-sm text-[var(--muted-text-color)] tracking-widest uppercase animate-pulse">
      Loading…
    </p>
  </div>
);

export default Loading;
