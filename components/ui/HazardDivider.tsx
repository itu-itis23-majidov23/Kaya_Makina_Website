export default function HazardDivider({
  className = "",
}: {
  className?: string;
}) {
  return <div aria-hidden className={`hazard-stripe h-1.5 w-full ${className}`} />;
}
