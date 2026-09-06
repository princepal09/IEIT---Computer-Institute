import {
  Edit2Icon,
  MapPinIcon,
  MoreHorizontalIcon,
  Trash2Icon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AdminBranch } from "@/types/branchDashboard";

interface BranchTableProps {
  branches: AdminBranch[];
  onEdit: (branch: AdminBranch) => void;
  onDelete: (branch: AdminBranch) => void;
}




const BranchTable = ({ branches, onEdit, onDelete }: BranchTableProps) => {

    
  if (branches.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <MapPinIcon className="mx-auto size-8 text-slate-300" />

        <h3 className="mt-3 text-sm font-semibold text-slate-900">
          No branches found
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Create your first branch to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Branch
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Contact
              </th>

              <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                Courses
              </th>

              <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="w-16 px-3 py-3" />
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {branches.map((branch) =>  (
              <tr key={branch.id} className="transition hover:bg-slate-50/60">
                {/* BRANCH */}

                <td className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ieit-blue/5 text-ieit-blue">
                      <MapPinIcon className="size-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-900">
                        {branch.name}
                      </p>

                      <p className="mt-0.5 max-w-sm truncate text-sm text-slate-500">
                        {branch.address}
                      </p>
                    </div>
                  </div>
                </td>

                {/* CONTACT */}

                <td className="px-5 py-4">
                  <div className="space-y-1 text-sm">
                    {branch.phone && (
                      <p className="text-slate-700">{branch.phone}</p>
                    )}

                    {branch.email && (
                      <p className="max-w-[220px] truncate text-slate-500">
                        {branch.email}
                      </p>
                    )}

                    {!branch.phone && !branch.email && (
                      <span className="text-slate-400">—</span>
                    )}
                  </div>
                </td>

                {/* COURSES */}

                <td className="px-5 py-4 text-center">
                  <span className="inline-flex min-w-8 items-center justify-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                    {branch.courses?.length}
                  </span>
                </td>

                {/* STATUS */}

                <td className="px-5 py-4 text-center">
                  {branch.isActive ? (
                    <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
                      Inactive
                    </span>
                  )}
                </td>

                {/* ACTIONS */}

                <td className="px-3 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex size-8 items-center justify-center rounded-lg hover:bg-slate-100">
                      <MoreHorizontalIcon className="size-4" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-36">
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => onEdit(branch)}
                      >
                        <Edit2Icon className="mr-2 size-4" />
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="cursor-pointer text-red-600 focus:text-red-600"
                        onClick={() => onDelete(branch)}
                      >
                        <Trash2Icon className="mr-2 size-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BranchTable;
