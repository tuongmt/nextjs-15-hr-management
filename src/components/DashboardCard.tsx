import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  desc: string;
  className: string;
  buttonName: string;
  onClick: () => void;
}

export default function DashboardCard({
  title,
  desc,
  className,
  buttonName,
  onClick,
}: DashboardCardProps) {
  return (
    <div className="p-5 rounded-2xl border shadow hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-2 ">{desc}</p>
      <div className="mt-4">
        <button
          className={cn(
            "px-4 py-2  text-white rounded hover:bg-blue-600",
            className
          )}
          onClick={onClick}
        >
          {buttonName}
        </button>
      </div>
    </div>
  );
}
