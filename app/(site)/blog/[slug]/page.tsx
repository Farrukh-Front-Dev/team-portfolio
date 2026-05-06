"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiCalendar, FiClock, FiTag, FiShare2 } from "react-icons/fi";
import { useScrollAnimation } from "@hooks/useScrollAnimation";
import { getPostBySlug, type BlogContent } from "@content/blogPosts";

// Blog content renderer component
function BlogContentRenderer({ content }: { content: BlogContent[] }) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none
                    prose-headings:text-gray-900 dark:prose-headings:text-white
                    prose-p:text-gray-700 dark:prose-p:text-gray-300
                    prose-a:text-blue-600 dark:prose-a:text-blue-400
                    prose-code:text-blue-600 dark:prose-code:text-blue-400
                    prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800
                    prose-pre:text-gray-100
                    prose-strong:text-gray-900 dark:prose-strong:text-white">
      {content.map((block, index) => {
        switch (block.type) {
          case "heading":
            const HeadingTag = `h${block.level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
            const headingClasses = {
              1: "text-3xl font-bold mt-8 mb-4",
              2: "text-2xl font-bold mt-6 mb-3",
              3: "text-xl font-bold mt-5 mb-2",
              4: "text-lg font-bold mt-4 mb-2",
              5: "text-base font-bold mt-3 mb-2",
              6: "text-sm font-bold mt-2 mb-1",
            };
            return (
              <HeadingTag key={index} className={headingClasses[block.level]}>
                {block.text}
              </HeadingTag>
            );

          case "paragraph":
            return (
              <p key={index} className="mb-4 leading-relaxed">
                {block.text}
              </p>
            );

          case "list":
            return (
              <ul key={index} className="list-disc list-inside mb-4 space-y-2">
                {block.items.map((item, i) => (
                  <li key={i} className="text-gray-700 dark:text-gray-300">
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            );

          case "code":
            return (
              <div key={index} className="mb-6">
                <pre className="rounded-lg p-4 overflow-x-auto">
                  <code className={`language-${block.language}`}>
                    {block.code}
                  </code>
                </pre>
              </div>
            );

          case "image":
            return (
              <figure key={index} className="my-8">
                <div className="relative w-full h-96 rounded-lg overflow-hidden">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "quote":
            return (
              <blockquote key={index} className="border-l-4 border-blue-500 pl-4 my-6 italic">
                <p className="text-gray-700 dark:text-gray-300">{block.text}</p>
                {block.author && (
                  <footer className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    — {block.author}
                  </footer>
                )}
              </blockquote>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const sectionRef = useScrollAnimation({ threshold: 0.05 });

  // Get post from JSON
  const post = getPostBySlug(slug);

  // Load full content from separate JSON file
  const [fullContent, setFullContent] = React.useState<BlogContent[] | null>(null);

  React.useEffect(() => {
    if (post) {
      import(`@content/blogs/${slug}.json`)
        .then((module) => {
          setFullContent(module.default.content);
        })
        .catch(() => {
          console.error(`Content not found for ${slug}`);
        });
    }
  }, [slug, post]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Post Not Found
          </h1>
          <Link
            href="/blog"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share failed:", err);
      }
    }
  };

  return (
    <article
      ref={sectionRef}
      className="min-h-screen py-16 sm:py-20 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Back Button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 
                 hover:text-gray-900 dark:hover:text-white transition-colors mb-8
                 animate-fadeInUp"
      >
        <FiArrowLeft className="w-4 h-4" />
        Back to Blog
      </Link>

      {/* Header */}
      <header className="mb-12 animate-fadeInUp animation-delay-100">
        {/* Category */}
        <span className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4
                       bg-blue-100 text-blue-700 dark:bg-blue-400/20 dark:text-blue-300">
          {post.category}
        </span>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 
                     text-gray-900 dark:text-white leading-tight">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <div className="flex items-center gap-2">
            <FiCalendar className="w-4 h-4" />
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FiClock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <FiShare2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm
                       bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300
                       dark:backdrop-blur-xl"
            >
              <FiTag className="w-3.5 h-3.5" />
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative w-full h-96 rounded-xl overflow-hidden mb-12 animate-fadeInUp animation-delay-200">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="animate-fadeInUp animation-delay-300">
        {fullContent ? (
          <BlogContentRenderer content={fullContent} />
        ) : (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {/* Author Bio */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/20 animate-fadeInUp animation-delay-400">
        <div className="flex items-start gap-4">
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              {post.author.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {post.author.bio}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
