import { motion } from "motion/react";
import { ArrowRightIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "item-1",
    question: "What courses does IEIT offer?",
    answer:
      "IEIT offers practical, career-focused courses in areas such as Full-Stack Web Development, Python & Data Science, Cloud Computing, and UI/UX Design.",
  },
  {
    id: "item-2",
    question: "Who can join IEIT?",
    answer:
      "Our programs are designed for students, beginners, graduates, and anyone looking to build practical technology skills.",
  },
  {
    id: "item-3",
    question: "Are the courses practical?",
    answer:
      "Yes. Our learning approach focuses on hands-on practice, projects, real-world concepts, and building skills that can be applied beyond the classroom.",
  },
  {
    id: "item-4",
    question: "Does IEIT provide career support?",
    answer:
      "IEIT focuses on helping students become career-ready through practical projects, guidance, skill development, and career-oriented learning.",
  },
  {
    id: "item-5",
    question: "How can I enroll in a course?",
    answer:
      "You can explore the available courses and contact IEIT to learn about current batches, eligibility, fees, and the enrollment process.",
  },
];

const FAQ = () => {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#f7f9fc]
        pt-2
        pb-8
        sm:pt-4
        sm:pb-10
        lg:pt-29
        lg:pb-12
      "
    >
      {/* =========================================================
          BACKGROUND GLOWS
          ========================================================= */}

      {/* Blue glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-40
          top-10
          h-80
          w-80
          rounded-full
          bg-blue-200/20
          blur-3xl
        "
      />

      {/* Red glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-0
          h-80
          w-80
          rounded-full
          bg-red-200/20
          blur-3xl
        "
      />

      {/* =========================================================
          CONTAINER
          ========================================================= */}

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        {/* =======================================================
            HEADER
            ======================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="mx-auto max-w-2xl text-center"
        >
          {/* Eyebrow */}

          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-red-500/50" />

            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-red-600">
              FAQ
            </span>

            <span className="h-px w-8 bg-red-500/50" />
          </div>

          {/* Heading */}

          <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            Questions?
            <span className="block text-ieit-blue">We have answers.</span>
          </h2>

          {/* Description */}

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-[15px]">
            Everything you need to know about learning at IEIT.
          </p>
        </motion.div>

        {/* =======================================================
            FAQ ACCORDION
            ======================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.55,
            delay: 0.1,
            ease: "easeOut",
          }}
          className="mt-5 sm:mt-6"
        >
          <Accordion defaultValue={["item-1"]} className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="
                  group
                  overflow-hidden
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-5
                  shadow-[0_8px_30px_-25px_rgba(15,23,42,0.25)]
                  transition-all
                  duration-300
                  hover:border-slate-300
                  data-open:border-red-200
                  data-open:shadow-[0_15px_40px_-25px_rgba(220,38,38,0.25)]
                  sm:px-6
                "
              >
                <AccordionTrigger
                  className="
                    gap-4
                    py-5
                    text-left
                    text-sm
                    font-semibold
                    text-slate-800
                    hover:no-underline
                    [&>svg]:size-4
                    [&>svg]:text-slate-400
                    [&>svg]:transition-colors
                    data-[state=open]:[&>svg]:text-red-500
                  "
                >
                  <div className="flex items-center gap-4">
                    {/* Number */}

                    <span
                      className="
                        flex
                        size-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-md
                        bg-slate-100
                        font-mono
                        text-[9px]
                        font-bold
                        tracking-[0.08em]
                        text-slate-500
                        transition-all
                        duration-200
                        group-data-[state=open]:bg-red-50
                        group-data-[state=open]:text-red-600
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Question */}

                    <span className="transition-colors group-data-[state=open]:text-slate-950">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent
                  className="
                    pb-5
                    pl-11
                    text-sm
                    leading-6
                    text-slate-500
                    sm:pl-11
                  "
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* =======================================================
            CONTACT PROMPT
            ======================================================= */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.25,
          }}
          className="mt-6 flex items-center justify-center"
        >
          <a
            href="/contact"
            className="
              group
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-slate-200
              bg-white
              px-4
              py-2
              font-mono
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-slate-600
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:border-red-200
              hover:text-red-600
              hover:shadow-md
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-red-500/30
            "
          >
            Still have questions?
            <ArrowRightIcon
              className="
                size-3
                transition-transform
                duration-200
                group-hover:translate-x-1
              "
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
