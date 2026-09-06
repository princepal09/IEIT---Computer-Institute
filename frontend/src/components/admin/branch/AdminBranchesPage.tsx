import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import ConfirmationModal from "@/components/shared/ConfirmationModal";

import BranchForm from "@/components/admin/branch/BranchForm";
import BranchTable from "@/components/admin/branch/BranchTable";

import {
  useAdminBranches,
  useDeleteAdminBranch,
} from "@/hooks/useAdminBranches";

import type { AdminBranch } from "@/types/branchDashboard";

import { getErrorMessage } from "@/utils/error";

const AdminBranchesPage = () => {
  const [formOpen, setFormOpen] =
    useState(false);

  const [selectedBranch, setSelectedBranch] =
    useState<AdminBranch | null>(null);

  const [branchToDelete, setBranchToDelete] =
    useState<AdminBranch | null>(null);

  const {
    data: branches = [],
    isLoading,
    isError,
  } = useAdminBranches();


  const deleteMutation =
    useDeleteAdminBranch();

  /*
   * CREATE
   */
  const handleCreate = () => {
    setSelectedBranch(null);
    setFormOpen(true);
  };

  /*
   * EDIT
   */
  const handleEdit = (
    branch: AdminBranch
  ) => {
    setSelectedBranch(branch);
    setFormOpen(true);
  };

  /*
   * DELETE
   */
  const handleDelete = (
    branch: AdminBranch
  ) => {
    setBranchToDelete(branch);
  };

  /*
   * CONFIRM DELETE
   */
  const handleConfirmDelete = () => {
    if (!branchToDelete) {
      return;
    }

    deleteMutation.mutate(
      branchToDelete.id,
      {
        onSuccess: () => {
          toast.success(
            "Branch deleted successfully"
          );

          setBranchToDelete(null);
        },

        onError: (error) => {
          toast.error(
            getErrorMessage(error)
          );
        },
      }
    );
  };

  /*
   * FORM OPEN / CLOSE
   */
  const handleFormOpenChange = (
    open: boolean
  ) => {
    setFormOpen(open);

    if (!open) {
      setSelectedBranch(null);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}

      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">
            Branches
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage institute branches.
          </p>
        </div>

        <Button
          onClick={handleCreate}
          className="rounded-xl bg-ieit-blue hover:bg-ieit-blue/90"
        >
          <PlusIcon className="mr-2 size-4" />
          Add Branch
        </Button>
      </div>

      {/* TABLE */}

      {isLoading ? (
        <div className="flex min-h-40 items-center justify-center rounded-2xl border border-slate-200 bg-white">
          <p className="text-sm text-slate-500">
            Loading branches...
          </p>
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm font-medium text-red-600">
            Failed to load branches.
          </p>
        </div>
      ) : (
        <BranchTable
          branches={branches}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* CREATE / EDIT FORM */}

      <BranchForm
        open={formOpen}
        onOpenChange={
          handleFormOpenChange
        }
        branch={selectedBranch}
      />

      {/* DELETE CONFIRMATION */}

      <ConfirmationModal
        open={Boolean(
          branchToDelete
        )}
        onOpenChange={(open) => {
          if (
            !open &&
            !deleteMutation.isPending
          ) {
            setBranchToDelete(null);
          }
        }}
        title="Delete Branch?"
        description={
          branchToDelete
            ? `Are you sure you want to delete "${branchToDelete.name}"? This action cannot be undone.`
            : "Are you sure you want to delete this branch?"
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={
          handleConfirmDelete
        }
        loading={
          deleteMutation.isPending
        }
        variant="danger"
      />
    </div>
  );
};

export default AdminBranchesPage;