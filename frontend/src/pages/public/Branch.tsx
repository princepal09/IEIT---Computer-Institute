import { useParams } from "react-router-dom";

import { useBranch } from "@/hooks/useOneBranch";
import BranchHero from "@/components/public/branches/BranchHero";
import BranchContact from "@/components/public/branches/BranchContact";
import BranchInfo from "@/components/public/branches/BranchInfo";
import LoadingState from "@/components/shared/LoadingState";

const Branch = () => {
  const { branchSlug } = useParams<{ branchSlug: string }>();

  const { data: response, isLoading, isError, error } = useBranch(branchSlug);

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError || !response?.data) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Branch not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {error instanceof Error
              ? error.message
              : "Unable to load branch information."}
          </p>
        </div>
      </section>
    );
  }

  const branch = response.data;

  return (
    <main>
      <BranchHero branch={branch} />

      {/* <BranchInfo branch={branch} /> */}

      <BranchContact branch={branch} />
    </main>
  );
};

export default Branch;
