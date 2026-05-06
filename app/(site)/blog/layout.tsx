import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Farrukh's Portfolio",
  description: "Thoughts, tutorials, and insights about web development, programming, and technology.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
