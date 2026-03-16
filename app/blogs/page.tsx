import { Card } from "@/components/atom/card";
import { Blog } from "@/types/blog";
import { Suspense } from "react";

async function BlogsContent() {
  const apiURl =
    process.env.NODE_ENV === "production"
      ? `https://${process.env.DEPLOY_DOMAIN}/api/blog`
      : `http://localhost:3000/api/blog`;
  const blogUrl =
    process.env.NODE_ENV === "production"
      ? `https://${process.env.DEPLOY_DOMAIN}/blog`
      : `http://localhost:3000/blog`;
  const data = (await fetch(apiURl).then((res) => res.json())) as Blog[];
  return (
    <div className="flex flex-row flex-wrap gap-y-4 gap-x-4  items-start content-start justify-center  ">
      {data.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          description={item.description}
          url={`${blogUrl}/${item.id}`}
          thumbnail={item.thumbnail}
        />
      ))}
    </div>
  );
}

export default function Blogs() {
  return (
    <Suspense>
      <BlogsContent />
    </Suspense>
  );
}
