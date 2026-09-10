import { DashboardStats } from "@/types/adminDashboard";
import {
  BellIcon,
  CheckCircle2Icon,
  Clock3Icon,
  MessageSquareIcon,
} from "lucide-react";

interface DashboardSummaryProps {
  stats: DashboardStats;
}

const DashboardSummary = ({ stats }: DashboardSummaryProps) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {/* Converted */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <CheckCircle2Icon className="size-4" />
          </div>

          <div>
            <p className="text-xs text-slate-400">Converted</p>

            <p className="text-lg font-bold text-slate-950">
              {stats.enquiries.converted}
            </p>
          </div>
        </div>
      </div>

      {/* Contacted */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
            <Clock3Icon className="size-4" />
          </div>

          <div>
            <p className="text-xs text-slate-400">Contacted</p>

            <p className="text-lg font-bold text-slate-950">
              {stats.enquiries.contacted}
            </p>
          </div>
        </div>
      </div>

      {/* Unread */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-red-50 text-red-600">
            <MessageSquareIcon className="size-4" />
          </div>

          <div>
            <p className="text-xs text-slate-400">Unread Messages</p>

            <p className="text-lg font-bold text-slate-950">
              {stats.contactMessages.unread}
            </p>
          </div>
        </div>
      </div>

      {/* Published notices */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-ieit-blue/5 text-ieit-blue">
            <BellIcon className="size-4" />
          </div>

          <div>
            <p className="text-xs text-slate-400">Published Notices</p>

            <p className="text-lg font-bold text-slate-950">
              {stats.notices.published}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
