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
    id: "full-stack",
    title: "Full-Stack Web Development",
    description:
      "Master the complete web stack from React to Node.js. Build production-ready applications.",
    category: "Bestseller",
    duration: "6 Months",
    type: "Project-Based",
    icon: "</>",
    featured: true,
  },

  {
    id: "data-science",
    title: "Python & Data Science",
    description:
      "Learn data manipulation, visualization, and machine learning fundamentals.",
    icon: "{}",
    variant: "lime",
  },

  {
    id: "cloud",
    title: "Cloud Computing",
    description: "Build modern cloud-ready applications.",
    subtitle: "AWS & Azure",
    icon: "☁",
    variant: "blue",
  },

  {
    id: "ui-ux",
    title: "UI/UX Design",
    description: "Design intuitive digital experiences.",
    subtitle: "Figma & Prototyping",
    icon: "↗",
    variant: "neutral",
  },
];