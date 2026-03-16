import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { id } = await params;
  const response = await fetch(
    `https://${process.env.MICROCMS_SERVICE_ID}.microcms.io/api/v1/blog/${id}`,
    {
      headers: {
        "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY ?? "",
      },
    },
  );
  const responseJson = await response.json();
  const data = {
    id: responseJson.id,
    content: responseJson.content,
    description: responseJson.description,
    title: responseJson.title,
    thumbnail: responseJson.thumbnail?.url,
    createdAt: new Date(responseJson.createdAt).toLocaleDateString(),
  };
  return Response.json(data);
}
