import { motion } from "motion/react";
import { Award, Briefcase, Users } from "lucide-react";
import { PageContainer } from "@/components/shared/PageContainer";
import { SectionHeading } from "@/components/shared/SectionHeading";

const benefits = [
  {
    icon: Award,
    title: "Industry-Relevant Curriculum",
    description:
      "Programs designed with current market demands, ensuring you learn the skills employers actually need.",
  },
  {
    icon: Users,
    title: "Expert-Led Training",
    description:
      "Learn from experienced professionals who bring real-world insights and practical knowledge to every class.",
  },
  {
    icon: Briefcase,
    title: "Career-Focused Support",
    description:
      "Comprehensive career guidance including job placement assistance, portfolio reviews, and interview preparation.",
  },
] as const;

const WhyIEIT = () => {
  return (
    <section className="bg-white">
      <PageContainer size="default" padding="lg" className="py-16 sm:py-20">
        <SectionHeading
          heading="Why Choose IEIT"
          subtitle="We combine practical training with career support to help you succeed in the technology industry."
          align="center"
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-[color:var(--ieit-blue)]/[0.08]">
                  <Icon className="size-6 text-[color:var(--ieit-blue)]" />
                </div>

                <h3 className="text-lg font-semibold text-[color:var(--ieit-navy)]">
                  {benefit.title}
                </h3>

                <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
};

export default WhyIEIT;
