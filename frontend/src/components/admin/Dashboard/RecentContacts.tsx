import {
  ContactIcon,
  MessageSquareIcon,
} from "lucide-react";

import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { DashboardContact } from "@/types/adminDashboard";


interface RecentContactsProps {
  contacts: DashboardContact[];
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

const RecentContacts = ({
  contacts,
}: RecentContactsProps) => {
  return (
    <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ieit-blue">
              Messages
            </p>

            <h2 className="mt-1 text-lg font-bold text-slate-950">
              Recent Contact Messages
            </h2>
          </div>

          <Link
            to="/admin/contact"
            className="text-xs font-semibold text-ieit-blue hover:underline"
          >
            View all
          </Link>
        </div>

        {/* Empty */}
        {contacts.length === 0 ? (
          <div className="flex min-h-52 flex-col items-center justify-center px-5 text-center">
            <div className="flex size-11 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
              <MessageSquareIcon className="size-5" />
            </div>

            <p className="mt-3 text-sm font-semibold text-slate-800">
              No recent messages
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Contact messages will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="p-5 hover:bg-slate-50/70"
              >
                <div className="flex gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ieit-blue/5 text-ieit-blue">
                    <ContactIcon className="size-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {contact.name}
                      </p>

                      <span
                        className={[
                          "rounded-full px-2.5 py-1 text-[10px] font-semibold",
                          contact.status === "UNREAD"
                            ? "bg-red-50 text-red-700"
                            : "bg-slate-100 text-slate-600",
                        ].join(" ")}
                      >
                        {contact.status}
                      </span>
                    </div>

                    <p className="mt-1 truncate text-xs text-slate-400">
                      {contact.email}
                    </p>

                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-600">
                      {contact.message}
                    </p>

                    <p className="mt-2 text-[11px] text-slate-400">
                      {formatDate(contact.createdAt)}
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

export default RecentContacts;