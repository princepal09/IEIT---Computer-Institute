import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/shared/PageContainer";

const FinalCTA = () => {
  return (
    <section className="bg-white">
      <PageContainer size="default" padding="lg" className="py-16 sm:py-20">
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-[color:var(--ieit-navy)] px-8 py-16 text-center sm:px-16 sm:py-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          {/* Decorative circles */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -top-20 -right-20 size-64 rounded-full bg-[color:var(--ieit-blue)]/10" />
            <div className="absolute -bottom-16 -left-16 size-48 rounded-full bg-[color:var(--ieit-cyan)]/10" />
          </div>

          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              Ready to Start Your IT Career?
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-base text-white/60 sm:text-lg">
              Join thousands of students who have transformed their careers with
              IEIT. Your journey starts here.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                render={<Link to="/enquire" />}
                className="gap-2 bg-white px-6 text-[0.9rem] font-semibold text-[color:var(--ieit-navy)] hover:bg-white/90"
              >
                Enroll Now
                <ArrowRight className="size-4" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                render={<Link to="/contact" />}
                className="gap-2 border-white/20 px-6 text-[0.9rem] font-semibold text-white hover:bg-white/10"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </motion.div>
      </PageContainer>
    </section>
  );
};

export default FinalCTA;
