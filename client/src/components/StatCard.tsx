import { cn } from "../utils/cn";

interface StatCardProps {
  title: string;
  subtitle?: string;
  value: string;
  percentage?: string;
  percentageType?: "increase" | "decrease";
  icon: React.ReactNode;
  action?: React.ReactNode;
}

export default function StatCard({
  title,
  subtitle,
  value,
  percentage,
  percentageType = "increase",
  icon,
  action,
}: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-5 transition">
      <div className="flex justify-between items-start">
        <h5 className="text-gray-700 dark:text-gray-300 font-semibold">
          {title} {subtitle && <span className="text-sm text-gray-400">| {subtitle}</span>}
        </h5>
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <i className="bi bi-three-dots" />
        </button>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="h-12 w-12 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300">
          {icon}
        </div>
        <div>
          <h6 className="text-xl font-bold text-gray-900 dark:text-white">{value}</h6>
          {percentage && (
            <p
              className={cn(
                "text-sm font-medium",
                percentageType === "increase" ? "text-green-500" : "text-red-500"
              )}
            >
              {percentage} {percentageType === "increase" ? "increase" : "decrease"}
            </p>
          )}
          {action && <div className="mt-2">{action}</div>}
        </div>
      </div>
    </div>
  );
}
