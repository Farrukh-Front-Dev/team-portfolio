import blogIndex from "./blogs/index.json";

// Blog post type
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content?: BlogContent[];
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    bio?: string;
  };
  coverImage?: string;
  published?: boolean;
}

// Blog content types
export type BlogContent =
  | { type: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; language: string; code: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "quote"; text: string; author?: string };

// Load blog posts from JSON
export const blogPosts: BlogPost[] = blogIndex as BlogPost[];

export const categories = [
  "All",
  "Tutorial",
  "Deep Dive",
  "Performance",
  "Architecture",
  "CSS",
  "Opinion",
];

// Get all published posts
export const getPublishedPosts = (): BlogPost[] => {
  return blogPosts.filter((post) => post.published !== false);
};

// Get post by slug
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};

// Get posts by category
export const getPostsByCategory = (category: string): BlogPost[] => {
  if (category === "All") return getPublishedPosts();
  return blogPosts.filter(
    (post) => post.category === category && post.published !== false
  );
};

// Get posts by tag
export const getPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter(
    (post) => post.tags.includes(tag) && post.published !== false
  );
};

// Get recent posts
export const getRecentPosts = (limit: number = 3): BlogPost[] => {
  return getPublishedPosts()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

// Get all unique tags
export const getAllTags = (): string[] => {
  const tags = new Set<string>();
  blogPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
};
