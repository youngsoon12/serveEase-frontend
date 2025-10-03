export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div
        role="status"
        aria-live="polite"
        className="grid min-h-[40vh] place-items-center p-6"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground" />
          <p className="text-muted-foreground">로딩 중…</p>
        </div>
      </div>
    </div>
  );
}
