import { PageContainer } from "@/components/shared/PageContainer";

import ContactTable from "@/components/admin/contact/ContactTable";

const ContactPage = () => {
  return (
    <PageContainer className="py-6 sm:py-8">
      <div className="mb-8">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ieit-blue">
          Admin
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          Contact
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          View and manage messages submitted through the contact form.
        </p>
      </div>

      <ContactTable />
    </PageContainer>
  );
};

export default ContactPage;
