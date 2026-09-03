import {
  Clock3Icon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import type { Branch } from "@/types/branch";

interface BranchInfoProps {
  branch: Branch;
}

const BranchInfo = ({ branch }: BranchInfoProps) => {
  const items = [
    {
      icon: MapPinIcon,
      label: "Location",
      value: branch.address,
    },
    {
      icon: PhoneIcon,
      label: "Phone",
      value: branch.phone,
    },
    {
      icon: MailIcon,
      label: "Email",
      value: branch.email,
    },
    {
      icon: Clock3Icon,
      label: "Opening Hours",
      value: `${branch.openingTime} - ${branch.closingTime}`,
    },
  ];

  return (
    <section className="bg-[#f7f9f8] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ieit-blue">
            Branch Information
          </p>

          <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-slate-900 sm:text-4xl">
            Everything you need to know.
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-500">
            Visit {branch.name} and connect with our team for courses,
            admissions, and further information.
          </p>
        </div>

        {/* Information grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.label}
                className="rounded-2xl border-slate-200 bg-white shadow-sm"
              >
                <CardContent className="p-5">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-ieit-blue">
                    <Icon className="size-4" />
                  </div>

                  <p className="mt-5 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                    {item.label}
                  </p>

                  <p className="mt-1.5 break-words text-sm font-semibold leading-6 text-slate-800">
                    {item.value}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BranchInfo;