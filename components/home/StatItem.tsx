export default function StatItem({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="border-l-2 border-brand-500 pl-5">
      <p className="font-display text-4xl font-bold text-brand-500 sm:text-5xl">
        {value}
      </p>
      <p className="mt-2 text-sm font-medium uppercase tracking-wider text-ink-300">
        {label}
      </p>
    </div>
  );
}
