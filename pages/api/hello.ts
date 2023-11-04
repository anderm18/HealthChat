import { BingChat } from "bing-chat-rnz";
import dotenv from "dotenv";

dotenv.config();

const api = new BingChat({
  cookie: process.env.BING_COOKIE,
});

export default async (req: any, res: any) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed. This Endpoint is Strictly a GET" });
  }

  let { prompt } = req.query;

  var variant = process.env.BING_VARIANT;
  prompt = "Find me a doctor who can look at my back in Troy, NY that accepts Unicare";

  try {
    const ret = await api.sendMessage(prompt, { variant });
    res.json(ret);
    console.log(ret.text);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};