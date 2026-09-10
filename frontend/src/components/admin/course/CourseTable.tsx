import {
  BookOpenIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AdminCourse } from "@/types/coursesDashboard";

interface CourseTableProps {
  courses: AdminCourse[];
  onEdit: (course: AdminCourse) => void;
  onDelete: (course: AdminCourse) => void;
}

const CourseTable = ({ courses, onEdit, onDelete }: CourseTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px]">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/70">
            <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
              Course
            </th>

            <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
              Category
            </th>

            <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
              Duration
            </th>

            <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
              Fee
            </th>

            <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
              Branches
            </th>

            <th className="w-12 px-5 py-3" />
          </tr>
        </thead>

        <tbody>
          {courses.map((course) => {
            const fee = Number(course.fee);

            const originalFee = course.originalFee ?? null;

            return (
              <tr
                key={course.id}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50"
              >
                {/* Course */}

                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ieit-blue/5 text-ieit-blue">
                      <BookOpenIcon className="size-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {course.name}
                      </p>

                      <p className="mt-0.5 max-w-[260px] truncate text-xs text-slate-400">
                        {course.shortDescription}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Category */}

                <td className="px-5 py-4">
                  <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {course.category}
                  </span>
                </td>

                {/* Duration */}

                <td className="px-5 py-4 text-sm text-slate-600">
                  {course.duration}
                </td>

                {/* Fee */}

                <td className="px-5 py-4">
                  <p className="text-sm font-semibold text-slate-900">
                    ₹{Number.isFinite(fee) ? fee.toLocaleString("en-IN") : "-"}
                  </p>

                  {originalFee !== null && originalFee > fee && (
                    <p className="text-xs text-slate-400 line-through">
                      ₹{Number(originalFee).toLocaleString("en-IN")}
                    </p>
                  )}
                </td>

                {/* Branches */}

                <td className="px-5 py-4">
                  <span className="text-sm text-slate-600">
                    {course.branches?.length ?? 0}
                  </span>
                </td>

                {/* Actions */}

                <td className="px-5 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex size-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700">
                      <MoreHorizontalIcon className="size-4" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="w-36 rounded-xl"
                    >
                      <DropdownMenuItem
                        onClick={() => onEdit(course)}
                        className="cursor-pointer rounded-lg"
                      >
                        <PencilIcon className="mr-2 size-4" />
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={() => onDelete(course)}
                        className="cursor-pointer rounded-lg text-red-600 focus:bg-red-50 focus:text-red-600"
                      >
                        <Trash2Icon className="mr-2 size-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
