import { InboxIcon, UsersIcon } from "lucide-react";

import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { DashboardEnquiry } from "@/types/adminDashboard";


interface RecentEnquiriesProps {
  enquiries: DashboardEnquiry[];
}

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const getStatusClass = (
  status: DashboardEnquiry["status"]
) => {
  switch (status) {
    case "NEW":
      return "bg-blue-50 text-blue-700";

    case "CONTACTED":
      return "bg-amber-50 text-amber-700";

    case "CONVERTED":
      return "bg-emerald-50 text-emerald-700";

    case "CLOSED":
      return "bg-slate-100 text-slate-600";
  }
};

const RecentEnquiries = ({
  enquiries,
}: RecentEnquiriesProps) => {
  return (
    <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ieit-blue">
              Leads
            </p>

            <h2 className="mt-1 text-lg font-bold text-slate-950">
              Recent Enquiries
            </h2>
          </div>

          <Link
            to="/admin/enquiries"
            className="text-xs font-semibold text-ieit-blue hover:underline"
          >
            View all
          </Link>
        </div>

        {/* Empty */}
        {enquiries.length === 0 ? (
          <div className="flex min-h-52 flex-col items-center justify-center px-5 text-center">
            <div className="flex size-11 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
              <InboxIcon className="size-5" />
            </div>

            <p className="mt-3 text-sm font-semibold text-slate-800">
              No recent enquiries
            </p>

            <p className="mt-1 text-xs text-slate-400">
              New enquiries will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {enquiries.map((enquiry) => (
              <div
                key={enquiry.id}
                className="p-5 hover:bg-slate-50/70"
              >
                <div className="flex gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ieit-blue/5 text-ieit-blue">
                    <UsersIcon className="size-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {enquiry.name}
                      </p>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClass(
                          enquiry.status
                        )}`}
                      >
                        {enquiry.status}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-slate-400">
                      {enquiry.phone}
                      {enquiry.email &&
                        ` • ${enquiry.email}`}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                      {enquiry.branch && (
                        <span>
                          {enquiry.branch.name}
                        </span>
                      )}

                      {enquiry.course && (
                        <span>
                          • {enquiry.course.name}
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-[11px] text-slate-400">
                      {formatDate(enquiry.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentEnquiries;