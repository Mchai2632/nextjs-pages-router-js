import { Inbox } from "lucide-react";

export default function EmptyState({
  icon: Icon = Inbox,
  title = "No data available",
  description = "Try adjusting your filters or add new content.",
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
      <Icon className="w-10 h-10 mb-4 text-gray-400" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
