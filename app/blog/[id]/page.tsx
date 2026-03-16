import { Card } from "@/components/atom/card";
import { Blog } from "@/types/blog";
import { cacheTag } from "next/cache";
import sanitizeHtml from "sanitize-html";
import { Suspense } from "react";

async function getBlog(id: string): Promise<Blog> {
  "use cache";
  cacheTag(`blog-${id}`);
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? `https://${process.env.DEPLOY_DOMAIN}/api/blog/${id}`
      : `http://localhost:3000/api/blog/${id}`;
  return fetch(apiUrl).then((res) => res.json());
}

async function BlogContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getBlog(id);
  return (
    <div className="flex flex-row flex-wrap gap-y-4 gap-x-4  items-start content-start justify-center  ">
      <Card
        title={data.title}
        description={data.description}
        thumbnail={data.thumbnail}
        date={data.createdAt}
        content={data.content}
      ></Card>
    </div>
  );
}

export default function BlogPage(props: PageProps<"/blog/[id]">) {
  return (
    <Suspense>
      <BlogContent params={props.params} />
    </Suspense>
  );
}
