import {
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
import ContactSkeleton from "@/components/shared/skeletons/ContactSkeleton";

import {
  useAdminContactMessages,
  useDeleteAdminContactMessage,
  useUpdateAdminContactMessage,
} from "@/hooks/useAdminContact";


import { getErrorMessage } from "@/utils/error";
import { AdminContactMessage, ContactStatus } from "@/types/contactDashboard";

const ContactTable = () => {
  const { data: messages = [], isLoading, isError } = useAdminContactMessages();

  const updateMutation = useUpdateAdminContactMessage();
  const deleteMutation = useDeleteAdminContactMessage();

  const [selectedMessage, setSelectedMessage] =
    useState<AdminContactMessage | null>(null);

  const [messageToDelete, setMessageToDelete] =
    useState<AdminContactMessage | null>(null);

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
  const formatStatus = (status: ContactStatus) => {
    return status === "UNREAD" ? "Unread" : "Read";
  };

  /*
   * Update status
   */
  const handleStatusChange = (
    message: AdminContactMessage,
    status: ContactStatus
  ) => {
    if (message.status === status) {
      return;
    }

    updateMutation.mutate(
      {
        contactId: message.id,
        data: {
          status,
        },
      },
      {
        onSuccess: (updatedMessage) => {
          toast.success(
            status === "READ"
              ? "Message marked as read."
              : "Message marked as unread."
          );

          /*
           * Keep opened message in sync
           */
          setSelectedMessage((current) =>
            current?.id === updatedMessage.id ? updatedMessage : current
          );
        },

        onError: (error) => {
          toast.error(getErrorMessage(error));
        },
      }
    );
  };

  /*
   * Delete message
   */
  const handleDelete = () => {
    if (!messageToDelete) {
      return;
    }

    deleteMutation.mutate(messageToDelete.id, {
      onSuccess: () => {
        toast.success("Contact message deleted successfully.");

        setMessageToDelete(null);

        if (selectedMessage?.id === messageToDelete.id) {
          setSelectedMessage(null);
        }
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

            <Skeleton className="mt-2 h-7 w-44 rounded-md" />
          </div>

          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        <ContactSkeleton />
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
            Failed to load contact messages
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
  if (!messages.length) {
    return (
      <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
        <CardContent className="flex min-h-64 flex-col items-center justify-center text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-ieit-blue/5 text-ieit-blue">
            <MessageSquareIcon className="size-6" />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-slate-900">
            No contact messages
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Contact enquiries will appear here.
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
              Enquiries
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-950">
              Contact Messages
            </h2>
          </div>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {messages.length} {messages.length === 1 ? "message" : "messages"}
          </span>
        </div>

        {/* Desktop */}
        <Card className="hidden overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm lg:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500">
                    Name
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500">
                    Email
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500">
                    Phone
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500">
                    Message
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
                {messages.map((item) => (
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

                    {/* Email */}
                    <td className="px-5 py-4">
                      <span className="text-sm text-slate-600">
                        {item.email}
                      </span>
                    </td>

                    {/* Phone */}
                    <td className="px-5 py-4">
                      <span className="text-sm text-slate-600">
                        {item.phone || "—"}
                      </span>
                    </td>

                    {/* Message */}
                    <td className="max-w-xs px-5 py-4">
                      <p className="truncate text-sm text-slate-600">
                        {item.message}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        disabled={updateMutation.isPending}
                        onClick={() =>
                          handleStatusChange(
                            item,
                            item.status === "UNREAD" ? "READ" : "UNREAD"
                          )
                        }
                        className={[
                          "rounded-full px-2.5 py-1 text-xs font-medium transition",
                          item.status === "UNREAD"
                            ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                            : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
                        ].join(" ")}
                      >
                        {formatStatus(item.status)}
                      </button>
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
                          onClick={() => {
                            setSelectedMessage(item);

                            if (item.status === "UNREAD") {
                              handleStatusChange(item, "READ");
                            }
                          }}
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
                          onClick={() => setMessageToDelete(item)}
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

        {/* Mobile */}
        <div className="grid gap-4 lg:hidden">
          {messages.map((item) => (
            <Card
              key={item.id}
              className="rounded-2xl border-slate-200 bg-white shadow-sm"
            >
              <CardContent className="p-5">
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
                        {item.email}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={updateMutation.isPending}
                    onClick={() =>
                      handleStatusChange(
                        item,
                        item.status === "UNREAD" ? "READ" : "UNREAD"
                      )
                    }
                    className={[
                      "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium",
                      item.status === "UNREAD"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-emerald-50 text-emerald-700",
                    ].join(" ")}
                  >
                    {formatStatus(item.status)}
                  </button>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="flex gap-3">
                    <MailIcon className="mt-0.5 size-4 shrink-0 text-slate-400" />

                    <p className="break-all text-sm text-slate-600">
                      {item.email}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <PhoneIcon className="mt-0.5 size-4 shrink-0 text-slate-400" />

                    <p className="text-sm text-slate-600">
                      {item.phone || "Phone not provided"}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <MessageSquareIcon className="mt-0.5 size-4 shrink-0 text-slate-400" />

                    <p className="line-clamp-3 text-sm leading-6 text-slate-600">
                      {item.message}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <CalendarDaysIcon className="mt-0.5 size-4 shrink-0 text-slate-400" />

                    <p className="text-sm text-slate-500">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-xl"
                    onClick={() => {
                      setSelectedMessage(item);

                      if (item.status === "UNREAD") {
                        handleStatusChange(item, "READ");
                      }
                    }}
                  >
                    <EyeIcon className="mr-2 size-4" />
                    View Message
                  </Button>

                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    disabled={deleteMutation.isPending}
                    onClick={() => setMessageToDelete(item)}
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

      {/* View Message Modal */}
      {selectedMessage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-slate-100 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ieit-blue">
                    Contact Enquiry
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-slate-950">
                    {selectedMessage.name}
                  </h3>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedMessage(null)}
                  className="rounded-lg"
                >
                  Close
                </Button>
              </div>
            </div>

            <div className="space-y-5 p-5">
              <div>
                <p className="text-xs font-medium text-slate-400">Email</p>

                <p className="mt-1 break-all text-sm text-slate-800">
                  {selectedMessage.email}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">Phone</p>

                <p className="mt-1 text-sm text-slate-800">
                  {selectedMessage.phone || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">Status</p>

                <button
                  type="button"
                  disabled={updateMutation.isPending}
                  onClick={() =>
                    handleStatusChange(
                      selectedMessage,
                      selectedMessage.status === "UNREAD" ? "READ" : "UNREAD"
                    )
                  }
                  className={[
                    "mt-2 rounded-full px-3 py-1 text-xs font-medium",
                    selectedMessage.status === "UNREAD"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-emerald-50 text-emerald-700",
                  ].join(" ")}
                >
                  {formatStatus(selectedMessage.status)}
                </button>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">Message</p>

                <div className="mt-2 rounded-xl bg-slate-50 p-4">
                  <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">Received</p>

                <p className="mt-1 text-sm text-slate-600">
                  {formatDate(selectedMessage.createdAt)}
                </p>
              </div>

              <Button
                type="button"
                variant="destructive"
                className="w-full rounded-xl"
                onClick={() => {
                  setMessageToDelete(selectedMessage);
                  setSelectedMessage(null);
                }}
              >
                <Trash2Icon className="mr-2 size-4" />
                Delete Message
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmationModal
        open={Boolean(messageToDelete)}
        onOpenChange={(open) => {
          if (!open && !deleteMutation.isPending) {
            setMessageToDelete(null);
          }
        }}
        title="Delete contact message?"
        description="This contact message will be permanently deleted. This action cannot be undone."
        confirmText="Delete Message"
        cancelText="Cancel"
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
        variant="danger"
      />
    </>
  );
};

export default ContactTable;
