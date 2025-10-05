import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BLOG_TITLE } from "@/constants";
import CodeSnippet from "@/components/CodeSnippet/CodeSnippet";
import dynamic from "next/dynamic";

const DivisionGroupsDemo = dynamic(() =>
  import("@/components/DivisionGroupsDemo")
);

const CircularColorsDemo = dynamic(() =>
  import("@/components/CircularColorsDemo")
);

export const generateMetadata = async ({ params }) => {
  const { postSlug } = await params;
  const { frontmatter } = await loadBlogPost(postSlug);
  const { title, abstract } = frontmatter;

  return {
    title: `${title} • ${BLOG_TITLE}`,
    description: abstract,
  };
};

async function BlogPost({ params }) {
  const { postSlug } = await params;

  const { frontmatter, content } = await loadBlogPost(postSlug);
  const { title, publishedOn } = frontmatter;

  const customMarkdown = {
    pre: CodeSnippet,
    DivisionGroupsDemo,
    CircularColorsDemo,
  };

  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={publishedOn} />
      <div className={styles.page}>
        <MDXRemote source={content} components={{ ...customMarkdown }} />
      </div>
    </article>
  );
}

export default BlogPost;
