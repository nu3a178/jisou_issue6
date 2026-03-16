"use client";

import { Card } from "@/components/atom/card";
import { PrimaryButton } from "@/components/atom/primary-button";
import { Article } from "@/types/article";
import { Blog } from "@/types/blog";
import { useEffect, useState } from "react";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const getArticles = async (page: number, perPage: number) => {
    const data = await fetch(
      `/api/qiita?page=${page}&per_page=${perPage}`,
    ).then((res) => res.json());
    return data;
  };
  const getBlogs = async () => {
    const data = await fetch(`/api/blog?limit=4`).then((res) => res.json());
    return data;
  };

  useEffect(() => {
    async function fetchArticles() {
      return await getArticles(1, 4);
    }
    fetchArticles().then((data) => setArticles(data));
    async function fetchBlogs() {
      return await getBlogs();
    }
    fetchBlogs().then((res) => setBlogs(res));
  }, []);

  return (
    <>
      <p className="text-2xl font-bold mb-4 self-start p-2">Articles</p>
      <div className="flex flex-row flex-wrap gap-y-4 gap-x-4  items-start content-start justify-center  ">
        {articles.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            thumbnail={item.thumbnail}
            url={item.url}
          />
        ))}
      </div>
      <a href="/articles">
        <PrimaryButton>すべて表示</PrimaryButton>
      </a>
      <p className="text-2xl font-bold mb-4 self-start p-2">Blogs</p>
      <div className="flex flex-row flex-wrap gap-y-4 gap-x-4  items-start content-start justify-center  ">
        {blogs.map((item, i) => (
          <Card
            key={i}
            title={item.title}
            description={item.description}
            url={`/blog/${item.id}`}
            thumbnail={item.thumbnail}
          />
        ))}
      </div>
      <a href="/blogs">
        <PrimaryButton>もっと見る</PrimaryButton>
      </a>
    </>
  );
}
