import { NextRequest } from "next/server";

export async function GET(req: NextRequest): Promise<Response> {
  const limit = req.nextUrl.searchParams.get("limit") || null;
  const response = await fetch(
    `https://${process.env.MICROCMS_SERVICE_ID}.microcms.io/api/v1/blog?${limit ? `limit=${limit}` : ""}`,
    {
      headers: {
        "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY,
      },
    },
  );

  const responseJson = await response.json().then((data) => data.contents);
  const data = responseJson.map(
    ({
      id,
      description,
      title,
    }: {
      id: string;
      description: string;
      title: string;
    }) => ({
      id,
      description,
      title,
    }),
  );
  return Response.json(data);
}
