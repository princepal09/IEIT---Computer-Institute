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
    description: "Diploma in Computer Application & Multimedia.",
    category: "1 Year Diploma",
    duration: "1 Year",
    subtitle: "Computer Application & Multimedia",
    icon: "</>",
    featured: true,
  },

  {
    id: "dcap",
    title: "DCAP",
    description: "Diploma in Computer Application & Programming.",
    category: "1 Year Diploma",
    duration: "1 Year",
    subtitle: "Computer Application & Programming",
    icon: "{}",
    variant: "lime",
  },

  {
    id: "cca",
    title: "CCA",
    description: "Certificate in Computer Application.",
    category: "6 Month Certificate",
    duration: "6 Months",
    subtitle: "Computer Application",
    icon: "</>",
    variant: "blue",
  },

  {
    id: "com",
    title: "COM",
    description: "Certificate in Office Management.",
    category: "6 Month Certificate",
    duration: "6 Months",
    subtitle: "Office Management",
    icon: "↗",
    variant: "neutral",
  },
];