"use client";

import { Article } from "@/types/article";
import { useEffect, useState } from "react";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    const getArticles = async () => {
      const data = await fetch("/api/qiita").then((res) =>
        res.json(),
      );
      setArticles(data);
    };
    getArticles();
  }, []);

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
          onClick={() => setShowAll(true)}
        >
          すべて表示
        </div>
      )}
    </div>
  );
}
