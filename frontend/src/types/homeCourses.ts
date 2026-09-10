export type Course = {
  id: string;
  title: string;
  description: string;
  category?: string;
  duration?: string;
  type?: string;
  subtitle?: string;
  featured?: boolean;
  icon: string;
  variant?: "blue" | "lime" | "neutral";
};

export const homeCourses: Course[] = [
  {
    id: "dcam",
    title: "DCAM",
    description:
      "Build essential computer and multimedia skills for academic and professional use.",
    category: "1 Year Diploma",
    duration: "1 Year",
    subtitle: "Computer Application & Multimedia",
    icon: "</>",
    featured: true,
  },

  {
    id: "dcap",
    title: "DCAP",
    description:
      "Develop strong computer and programming skills for modern technical careers.",
    category: "1 Year Diploma",
    duration: "1 Year",
    subtitle: "Computer Application & Programming",
    icon: "{}",
    variant: "lime",
  },

  {
    id: "cca",
    title: "CCA",
    description:
      "Learn essential computer applications, office tools, AI, HTML, and CSS.",
    category: "6 Month Certificate",
    duration: "6 Months",
    subtitle: "Certificate in Computer Application",
    icon: "</>",
    variant: "blue",
  },

  {
    id: "com",
    title: "COM",
    description:
      "Build practical office management skills with computer and accounting tools.",
    category: "6 Month Certificate",
    duration: "6 Months",
    subtitle: "Certificate in Office Management",
    icon: "↗",
    variant: "neutral",
  },
];
