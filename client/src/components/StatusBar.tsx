export function StatusBar({ text }: { text: string }) {
  return <div className="status" aria-live="polite">{text}</div>;
}
