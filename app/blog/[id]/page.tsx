import { Card } from "@/components/components/card";
import { Blog } from "@/types/blog";
import sanitizeHtml from "sanitize-html";
export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? `https://${process.env.DEPLOY_DOMAIN}/api/blog/${id}`
      : `http://localhost:3000/api/blog/${id}`;
  const data = (await fetch(apiUrl).then((res) => res.json())) as Blog;
  return (
    <div className="flex flex-row flex-wrap gap-y-4 gap-x-4  items-start content-start justify-center  ">
      <Card
        title={data.title}
        description={data.description}
        thumbnail={data.thumbnail}
        date={data.createdAt}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(data.content ?? ""),
          }}
        />
      </Card>
    </div>
  );
}
