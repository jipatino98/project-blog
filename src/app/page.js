import React from "react";

import BlogSummaryCard from "@/components/BlogSummaryCard";
import { getBlogPostList } from "@/helpers/file-helpers";

import styles from "./homepage.module.css";

export const metadata = () => {
  return {
    title: "Bits & Bytes",
    description: "A wonderful blog about JavaScript",
  };
};

async function Home() {
  const blogPosts = await getBlogPostList();
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>

      {/* TODO: Iterate over the data read from the file system! */}
      {blogPosts.map(({ slug, ...delegated }) => (
        <BlogSummaryCard key={slug} slug={slug} {...delegated} />
      ))}
    </div>
  );
}

export default Home;
