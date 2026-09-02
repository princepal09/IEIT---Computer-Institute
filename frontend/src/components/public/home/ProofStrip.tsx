import { motion } from "motion/react";
import { Users, Building2, BookOpen, Award } from "lucide-react";
import { PageContainer } from "@/components/shared/PageContainer";
import AnimatedNumber from "@/components/shared/AnimatedNumber";

const stats = [
  { label: "Students Trained", value: 5000, suffix: "+", icon: Users },
  { label: "Branches Nationwide", value: 4, suffix: "+", icon: Building2 },
  { label: "Professional Courses", value: 20, suffix: "+", icon: BookOpen },
  { label: "Student Satisfaction", value: 98, suffix: "%", icon: Award },
] as const;

const ProofStrip = () => {
  return (
    <section className="border-y border-border bg-muted/40">
      <PageContainer size="default" padding="lg">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[color:var(--ieit-blue)]/[0.08]">
                  <Icon className="size-5 text-[color:var(--ieit-blue)]" />
                </div>
                <div>
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    delay={i * 0.1}
                    className="text-xl font-bold tracking-tight text-[color:var(--ieit-navy)] sm:text-2xl"
                  />
                  <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
};

export default ProofStrip;
