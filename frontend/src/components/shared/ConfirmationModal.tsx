import {
  AlertTriangleIcon,
  Loader2Icon,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title: string;
  description: string;

  confirmText?: string;
  cancelText?: string;

  onConfirm: () => void;

  loading?: boolean;

  variant?: "danger" | "default";
}

const ConfirmationModal = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  loading = false,
  variant = "danger",
}: ConfirmModalProps) => {
  const isDanger = variant === "danger";

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent className="rounded-2xl border-slate-200 sm:max-w-md">
        <AlertDialogHeader>
          {/* Icon */}
          <div
            className={[
              "mb-2 flex size-11 items-center justify-center rounded-xl",
              isDanger
                ? "bg-red-50 text-red-600"
                : "bg-ieit-blue/5 text-ieit-blue",
            ].join(" ")}
          >
            <AlertTriangleIcon className="size-5" />
          </div>

          <AlertDialogTitle className="text-xl font-bold text-slate-950">
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription className="leading-6 text-slate-500">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-2">
          <AlertDialogCancel
            disabled={loading}
            className="rounded-xl"
          >
            {cancelText}
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(event) => {
              event.preventDefault();
              onConfirm();
            }}
            disabled={loading}
            className={[
              "rounded-xl cursor-pointer",
              isDanger
                ? "bg-red-600 hover:bg-red-700"
                : "bg-ieit-blue hover:bg-ieit-blue/90",
            ].join(" ")}
          >
            {loading && (
              <Loader2Icon className="mr-2 size-4 animate-spin" />
            )}

            {loading ? "Please wait..." : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationModal;