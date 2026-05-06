"use client";

import { useScrollAnimation } from "@hooks/useScrollAnimation";
import { blogPosts } from "@content/blogPosts";
import BlogDrum from "@components/features/blog/BlogDrum";

export default function BlogPage() {
  const sectionRef = useScrollAnimation({ threshold: 0.05 });

  // Get only published posts
  const publishedPosts = blogPosts.filter((post) => post.published !== false);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-16 sm:py-20 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Header */}
      <div className="animate-fadeInUp mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold 
                       mb-4 tracking-tight
                       text-gray-900
                       dark:bg-linear-to-r dark:from-white dark:to-gray-300
                       dark:bg-clip-text dark:text-transparent">
          Blog
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Thoughts, tutorials, and insights about web development, programming, and technology.
        </p>
      </div>

      {/* 3D Blog Drum */}
      <div className="animate-fadeInUp animation-delay-200">
        <BlogDrum posts={publishedPosts} />
      </div>

      {/* Stats */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fadeInUp animation-delay-300">
        <div className="text-center p-6 rounded-xl bg-white dark:bg-white/10 
                      border border-gray-200 dark:border-white/20
                      dark:backdrop-blur-xl">
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {publishedPosts.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Articles
          </div>
        </div>

        <div className="text-center p-6 rounded-xl bg-white dark:bg-white/10 
                      border border-gray-200 dark:border-white/20
                      dark:backdrop-blur-xl">
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {new Set(publishedPosts.map((p) => p.category)).size}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Categories
          </div>
        </div>

        <div className="text-center p-6 rounded-xl bg-white dark:bg-white/10 
                      border border-gray-200 dark:border-white/20
                      dark:backdrop-blur-xl">
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {publishedPosts.reduce((acc, post) => {
              const time = parseInt(post.readTime);
              return acc + (isNaN(time) ? 0 : time);
            }, 0)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Minutes of Content
          </div>
        </div>

        <div className="text-center p-6 rounded-xl bg-white dark:bg-white/10 
                      border border-gray-200 dark:border-white/20
                      dark:backdrop-blur-xl">
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {new Set(publishedPosts.flatMap((p) => p.tags)).size}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Unique Tags
          </div>
        </div>
      </div>

      {/* Categories Legend */}
      <div className="mt-12 animate-fadeInUp animation-delay-400">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          Categories
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {Array.from(new Set(publishedPosts.map((p) => p.category))).map((category) => {
            const categoryColors: Record<string, string> = {
              Tutorial: "bg-blue-500",
              "Deep Dive": "bg-purple-500",
              Performance: "bg-green-500",
              Architecture: "bg-yellow-500",
              CSS: "bg-pink-500",
              Opinion: "bg-indigo-500",
            };

            return (
              <div
                key={category}
                className="flex items-center gap-2 px-4 py-2 rounded-full
                         bg-white dark:bg-white/10 border border-gray-200 dark:border-white/20
                         dark:backdrop-blur-xl"
              >
                <div className={`w-3 h-3 rounded-full ${categoryColors[category] || "bg-blue-500"}`} />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {category}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ({publishedPosts.filter((p) => p.category === category).length})
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
