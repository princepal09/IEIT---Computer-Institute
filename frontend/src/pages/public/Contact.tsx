import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

import { PageContainer } from "@/components/shared/PageContainer";
import ContactForm from "@/components/public/contact/ContactForm";

const Contact = () => {
  return (
    <main className="bg-[#f7f9f8]">
      <PageContainer padding="md">
        <section className="py-16 sm:py-20 lg:py-24">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ieit-blue">
              Contact IEIT
            </p>

            <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.045em] text-slate-900 sm:text-5xl">
              Let&apos;s connect.
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-[15px]">
              Have questions about our courses, admissions, or branches?
              We&apos;re here to help you find the right learning path.
            </p>
          </div>

          {/* Contact content */}
          <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
            {/* Left */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-slate-900">
                  We&apos;re here to help.
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                  Whether you want to know more about a course, admission
                  process, or one of our branches, feel free to contact us.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <ContactInfo
                  icon={<PhoneIcon className="size-4" />}
                  title="Phone"
                  value="+91 9536815699"
                />

                <ContactInfo
                  icon={<MailIcon className="size-4" />}
                  title="Email"
                  value="ieitalmora@gmail.com"
                />

                <ContactInfo
                  icon={<MapPinIcon className="size-4" />}
                  title="Our Branches"
                  value="Almora · Bageshwar · Delhi"
                />
              </div>
            </div>

            {/* Right */}
            <ContactForm />
          </div>
        </section>
      </PageContainer>
    </main>
  );
};

type ContactInfoProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
};

const ContactInfo = ({ icon, title, value }: ContactInfoProps) => {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-ieit-blue/10 text-ieit-blue">
        {icon}
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-900">{title}</p>
        <p className="mt-0.5 text-xs text-slate-500">{value}</p>
      </div>
    </div>
  );
};

export default Contact;
