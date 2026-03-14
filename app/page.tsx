"use client";

import { Article } from "@/types/article";
import { useEffect, useState } from "react";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [showAll, setShowAll] = useState(false);
  const getArticles = async (page: number, perPage: number) => {
    const data = await fetch(
      `/api/qiita?page=${page}&per_page=${perPage}`,
    ).then((res) => res.json());
    return data;
  };

  useEffect(() => {
    async function fetchArticles() {
      return await getArticles(1, 4);
    }
    fetchArticles().then((data) => setArticles(data));
  }, []);

  const clickShowAll = async () => {
    setShowAll(true);
    const data = await getArticles(1, 100);
    setArticles(data);
  };
  return (
    <div className="flex flex-col items-center bg-zinc-50 font-sans dark:bg-black min-h-screen">
      <div className="flex flex-row flex-wrap gap-y-4 gap-x-4  items-start content-start justify-center  ">
        {articles
          .filter((item, i) => (showAll ? true : i < 4))
          .map((item, index) => (
            <a href={item.url} key={index}>
              <div className="card border-1 w-100">
                <figure>
                  <img src={item.thumbnail} alt={item.title} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{item.title}</h2>
                </div>
              </div>
            </a>
          ))}
      </div>
      {showAll ? null : (
        <div
          className="btn w-100 m-4 bg-black text-white"
          onClick={clickShowAll}
        >
          すべて表示
        </div>
      )}
    </div>
  );
}
