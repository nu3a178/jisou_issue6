import { Card } from "@/components/components/card";
import { Article } from "@/types/article";

export default async function Home() {
  const apiURl =
    process.env.NODE_ENV === "production"
      ? `https://${process.env.DEPLOY_DOMAIN}/api/qiita`
      : `http://localhost:3000/api/qiita`;
  const data = (await fetch(apiURl).then((res) => res.json())) as Article[];
  return (
    <div className="flex flex-row flex-wrap gap-y-4 gap-x-4  items-start content-start justify-center  ">
      {data.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          thumbnail={item.thumbnail}
          url={item.url}
        />
      ))}
    </div>
  );
}
