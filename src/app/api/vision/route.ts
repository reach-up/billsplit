import { scrapeBill } from "./scrapeBill";

export async function GET(req: Request) {
  const billUrl = "https://asprise.com/ocr/api/img/blog/rcpt/US-1.jpg";
  // const { billUrl } = await req.json();

  const start = new Date();
  const output = await scrapeBill(billUrl);
  const endJson = new Date();
  
  console.log(
    "Time it took to generate Bill JSON: ",
    (endJson.getTime() - start.getTime()) / 1000
  );

  return Response.json(output);
}
