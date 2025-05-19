import { scrapeBill } from "../../../lib/scrapeBill";

export async function POST(req: Request) {
  const { billUrl } = await req.json();

  const start = new Date();
  const output = await scrapeBill({
    billUrl,
  });
  const endJson = new Date();

  console.log(
    "Time it took to generate Bill JSON: ",
    (endJson.getTime() - start.getTime()) / 1000
  );

  return Response.json(output);
}
