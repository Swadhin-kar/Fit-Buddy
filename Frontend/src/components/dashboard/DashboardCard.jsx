export default function DashboardCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-3xl border border-[rgb(var(--card-depth-1))] bg-[rgb(var(--card-depth-0))/0.94] shadow-[0_18px_40px_rgb(var(--card-depth-2)/0.2)] backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}
