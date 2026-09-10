const DashboardHeader = () => {
  return (
    <div>
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ieit-blue">
        Dashboard
      </p>

      <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
        Overview
      </h1>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
        Manage your IEIT website, courses, branches, enquiries and institute
        content.
      </p>
    </div>
  );
};

export default DashboardHeader;
