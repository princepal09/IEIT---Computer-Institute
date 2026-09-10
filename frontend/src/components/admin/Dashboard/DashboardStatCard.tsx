import type { ElementType } from "react";

import { ChevronRightIcon } from "lucide-react";

import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";

interface DashboardStatCardProps {
  label: string;
  value: number;
  description: string;
  icon: ElementType;
  href: string;
}

const DashboardStatCard = ({
  label,
  value,
  description,
  icon: Icon,
  href,
}: DashboardStatCardProps) => {
  return (
    <Link to={href} className="group block">
      <Card className="h-full rounded-2xl border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex size-11 items-center justify-center rounded-xl bg-ieit-blue/5 text-ieit-blue">
              <Icon className="size-5" />
            </div>

            <ChevronRightIcon className="size-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-ieit-blue" />
          </div>

          <p className="mt-5 text-2xl font-bold text-slate-950">{value}</p>

          <p className="mt-1 text-sm font-semibold text-slate-800">{label}</p>

          <p className="mt-1 text-xs text-slate-400">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default DashboardStatCard;
