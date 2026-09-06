import {
  BookOpenIcon,
  Building2Icon,
  CalendarDaysIcon,
  EyeIcon,
  MailIcon,
  MessageSquareIcon,
  PhoneIcon,
  Trash2Icon,
  UserIcon,
} from "lucide-react";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import ConfirmationModal from "@/components/shared/ConfirmationModal";
import EnquirySkeleton from "@/components/shared/skeletons/EnquirySkeleton";

import {
  useAdminEnquiries,
  useDeleteAdminEnquiry,
  useUpdateAdminEnquiry,
} from "@/hooks/useAdminEnquiry";

import { getErrorMessage } from "@/utils/error";
import { AdminEnquiry, EnquiryStatus } from "@/types/enquiryDashboard";

const EnquiryTable = () => {
  const { data: enquiries = [], isLoading, isError } = useAdminEnquiries();

  const updateMutation = useUpdateAdminEnquiry();

  const deleteMutation = useDeleteAdminEnquiry();

  const [selectedEnquiry, setSelectedEnquiry] = useState<AdminEnquiry | null>(
    null
  );

  const [enquiryToDelete, setEnquiryToDelete] = useState<AdminEnquiry | null>(
    null
  );

  /*
   * Format date
   */
  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

  /*
   * Format status
   */
  const formatStatus = (status: EnquiryStatus) => {
    switch (status) {
      case "NEW":
        return "New";

      case "CONTACTED":
        return "Contacted";

      case "CONVERTED":
        return "Converted";

      case "CLOSED":
        return "Closed";

      default:
        return status;
    }
  };

  /*
   * Status styles
   */
  const getStatusClass = (status: EnquiryStatus) => {
    switch (status) {
      case "NEW":
        return "bg-blue-50 text-blue-700";

      case "CONTACTED":
        return "bg-amber-50 text-amber-700";

      case "CONVERTED":
        return "bg-emerald-50 text-emerald-700";

      case "CLOSED":
        return "bg-slate-100 text-slate-600";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  /*
   * Update status
   */
  const handleStatusChange = (enquiry: AdminEnquiry, status: EnquiryStatus) => {
    if (enquiry.status === status) {
      return;
    }

    updateMutation.mutate(
      {
        enquiryId: enquiry.id,
        data: {
          status,
        },
      },
      {
        onSuccess: (updatedEnquiry) => {
          toast.success(`Enquiry marked as ${formatStatus(status)}.`);

          setSelectedEnquiry((current) =>
            current?.id === updatedEnquiry.id ? updatedEnquiry : current
          );
        },

        onError: (error) => {
          toast.error(getErrorMessage(error));
        },
      }
    );
  };

  /*
   * Delete enquiry
   */
  const handleDelete = () => {
    if (!enquiryToDelete) {
      return;
    }

    deleteMutation.mutate(enquiryToDelete.id, {
      onSuccess: () => {
        toast.success("Enquiry deleted successfully.");

        if (selectedEnquiry?.id === enquiryToDelete.id) {
          setSelectedEnquiry(null);
        }

        setEnquiryToDelete(null);
      },

      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  /*
   * Loading
   */
  if (isLoading) {
    return (
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <Skeleton className="h-3 w-24 rounded-md" />

            <Skeleton className="mt-2 h-7 w-40 rounded-md" />
          </div>

          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        <EnquirySkeleton />
      </div>
    );
  }

  /*
   * Error
   */
  if (isError) {
    return (
      <Card className="rounded-2xl border-red-100 bg-white shadow-sm">
        <CardContent className="flex min-h-64 flex-col items-center justify-center text-center">
          <div className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <MessageSquareIcon className="size-5" />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-slate-900">
            Failed to load enquiries
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Please try refreshing the page.
          </p>
        </CardContent>
      </Card>
    );
  }

  /*
   * Empty
   */
  if (!enquiries.length) {
    return (
      <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
        <CardContent className="flex min-h-64 flex-col items-center justify-center text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-ieit-blue/5 text-ieit-blue">
            <MessageSquareIcon className="size-6" />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-slate-900">
            No enquiries
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Course and branch enquiries will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div>
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ieit-blue">
              Admissions
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-950">Enquiries</h2>
          </div>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {enquiries.length}{" "}
            {enquiries.length === 1 ? "enquiry" : "enquiries"}
          </span>
        </div>

        {/* Desktop Table */}
        <Card className="hidden overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm lg:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500">
                    Name
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500">
                    Contact
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500">
                    Branch
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500">
                    Course
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500">
                    Date
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {enquiries.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50"
                  >
                    {/* Name */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-ieit-blue/5 text-ieit-blue">
                          <UserIcon className="size-4" />
                        </div>

                        <span className="text-sm font-semibold text-slate-900">
                          {item.name}
                        </span>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm text-slate-700">{item.phone}</p>

                        {item.email && (
                          <p className="mt-0.5 max-w-[180px] truncate text-xs text-slate-400">
                            {item.email}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Branch */}
                    <td className="px-5 py-4">
                      <span className="text-sm text-slate-600">
                        {item.branch?.name || "—"}
                      </span>
                    </td>

                    {/* Course */}
                    <td className="px-5 py-4">
                      <span className="text-sm text-slate-600">
                        {item.course?.name || "General Enquiry"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <select
                        value={item.status}
                        disabled={updateMutation.isPending}
                        onChange={(event) =>
                          handleStatusChange(
                            item,
                            event.target.value as EnquiryStatus
                          )
                        }
                        className={[
                          "cursor-pointer rounded-full border-0 px-3 py-1.5 text-xs font-medium outline-none",
                          getStatusClass(item.status),
                        ].join(" ")}
                      >
                        <option value="NEW">New</option>

                        <option value="CONTACTED">Contacted</option>

                        <option value="CONVERTED">Converted</option>

                        <option value="CLOSED">Closed</option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="text-sm text-slate-500">
                        {formatDate(item.createdAt)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedEnquiry(item)}
                          className="rounded-lg"
                        >
                          <EyeIcon className="mr-2 size-4" />
                          View
                        </Button>

                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          disabled={deleteMutation.isPending}
                          onClick={() => setEnquiryToDelete(item)}
                          className="size-9 rounded-lg"
                        >
                          <Trash2Icon className="size-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Mobile / Tablet */}
        <div className="grid gap-4 lg:hidden">
          {enquiries.map((item) => (
            <Card
              key={item.id}
              className="rounded-2xl border-slate-200 bg-white shadow-sm"
            >
              <CardContent className="p-5">
                {/* Top */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ieit-blue/5 text-ieit-blue">
                      <UserIcon className="size-5" />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {item.name}
                      </h3>

                      <p className="mt-0.5 text-xs text-slate-500">
                        {item.phone}
                      </p>
                    </div>
                  </div>

                  <span
                    className={[
                      "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium",
                      getStatusClass(item.status),
                    ].join(" ")}
                  >
                    {formatStatus(item.status)}
                  </span>
                </div>

                {/* Details */}
                <div className="mt-5 space-y-3">
                  {item.email && (
                    <div className="flex gap-3">
                      <MailIcon className="mt-0.5 size-4 shrink-0 text-slate-400" />

                      <p className="break-all text-sm text-slate-600">
                        {item.email}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <PhoneIcon className="mt-0.5 size-4 shrink-0 text-slate-400" />

                    <p className="text-sm text-slate-600">{item.phone}</p>
                  </div>

                  <div className="flex gap-3">
                    <Building2Icon className="mt-0.5 size-4 shrink-0 text-slate-400" />

                    <p className="text-sm text-slate-600">
                      {item.branch?.name || "Branch not specified"}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <BookOpenIcon className="mt-0.5 size-4 shrink-0 text-slate-400" />

                    <p className="text-sm text-slate-600">
                      {item.course?.name || "General Enquiry"}
                    </p>
                  </div>

                  {item.message && (
                    <div className="flex gap-3">
                      <MessageSquareIcon className="mt-0.5 size-4 shrink-0 text-slate-400" />

                      <p className="line-clamp-3 text-sm leading-6 text-slate-600">
                        {item.message}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <CalendarDaysIcon className="mt-0.5 size-4 shrink-0 text-slate-400" />

                    <p className="text-sm text-slate-500">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="mt-5">
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Status
                  </label>

                  <select
                    value={item.status}
                    disabled={updateMutation.isPending}
                    onChange={(event) =>
                      handleStatusChange(
                        item,
                        event.target.value as EnquiryStatus
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-ieit-blue"
                  >
                    <option value="NEW">New</option>

                    <option value="CONTACTED">Contacted</option>

                    <option value="CONVERTED">Converted</option>

                    <option value="CLOSED">Closed</option>
                  </select>
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-xl"
                    onClick={() => setSelectedEnquiry(item)}
                  >
                    <EyeIcon className="mr-2 size-4" />
                    View Enquiry
                  </Button>

                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    disabled={deleteMutation.isPending}
                    onClick={() => setEnquiryToDelete(item)}
                    className="size-9 shrink-0 rounded-xl"
                  >
                    <Trash2Icon className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* View Enquiry Modal */}
      {selectedEnquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedEnquiry(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-slate-100 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ieit-blue">
                    Admission Enquiry
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-slate-950">
                    {selectedEnquiry.name}
                  </h3>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedEnquiry(null)}
                  className="rounded-lg"
                >
                  Close
                </Button>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-5 p-5">
              {/* Name */}
              <div>
                <p className="text-xs font-medium text-slate-400">Name</p>

                <p className="mt-1 text-sm font-medium text-slate-800">
                  {selectedEnquiry.name}
                </p>
              </div>

              {/* Phone */}
              <div>
                <p className="text-xs font-medium text-slate-400">Phone</p>

                <p className="mt-1 text-sm text-slate-800">
                  {selectedEnquiry.phone}
                </p>
              </div>

              {/* Email */}
              <div>
                <p className="text-xs font-medium text-slate-400">Email</p>

                <p className="mt-1 break-all text-sm text-slate-800">
                  {selectedEnquiry.email || "Not provided"}
                </p>
              </div>

              {/* Branch */}
              <div>
                <p className="text-xs font-medium text-slate-400">Branch</p>

                <p className="mt-1 text-sm text-slate-800">
                  {selectedEnquiry.branch?.name || "Not specified"}
                </p>
              </div>

              {/* Course */}
              <div>
                <p className="text-xs font-medium text-slate-400">Course</p>

                <p className="mt-1 text-sm text-slate-800">
                  {selectedEnquiry.course?.name || "General Enquiry"}
                </p>
              </div>

              {/* Status */}
              <div>
                <p className="text-xs font-medium text-slate-400">Status</p>

                <select
                  value={selectedEnquiry.status}
                  disabled={updateMutation.isPending}
                  onChange={(event) =>
                    handleStatusChange(
                      selectedEnquiry,
                      event.target.value as EnquiryStatus
                    )
                  }
                  className={[
                    "mt-2 rounded-xl border-0 px-3 py-2 text-sm font-medium outline-none",
                    getStatusClass(selectedEnquiry.status),
                  ].join(" ")}
                >
                  <option value="NEW">New</option>

                  <option value="CONTACTED">Contacted</option>

                  <option value="CONVERTED">Converted</option>

                  <option value="CLOSED">Closed</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <p className="text-xs font-medium text-slate-400">Message</p>

                <div className="mt-2 rounded-xl bg-slate-50 p-4">
                  <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                    {selectedEnquiry.message || "No message provided."}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div>
                <p className="text-xs font-medium text-slate-400">Received</p>

                <p className="mt-1 text-sm text-slate-600">
                  {formatDate(selectedEnquiry.createdAt)}
                </p>
              </div>

              {/* Delete */}
              <Button
                type="button"
                variant="destructive"
                className="w-full rounded-xl"
                onClick={() => {
                  setEnquiryToDelete(selectedEnquiry);

                  setSelectedEnquiry(null);
                }}
              >
                <Trash2Icon className="mr-2 size-4" />
                Delete Enquiry
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmationModal
        open={Boolean(enquiryToDelete)}
        onOpenChange={(open) => {
          if (!open && !deleteMutation.isPending) {
            setEnquiryToDelete(null);
          }
        }}
        title="Delete enquiry?"
        description="This enquiry will be permanently deleted. This action cannot be undone."
        confirmText="Delete Enquiry"
        cancelText="Cancel"
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
        variant="danger"
      />
    </>
  );
};

export default EnquiryTable;
