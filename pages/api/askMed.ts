import { BingChat } from "bing-chat-rnz";
import dotenv from "dotenv";

const searchPrompt = 
`
Medical Problem:

  { MEDICAL_ISSUE }
  
  Search the Mayo Clinic and other repuatable medical sources to try to come up with what might be causing this symptom(s)/problem(s).

  Please do not respond with any symbols, only plaintext. If you must link a site, only respond with the link's url. The question may not fill every section of the below JSON and that is ok, sometimes a general description is all that is needed.
  Fill in this JSON (possibles is a list of possible issues that might be causing it, an example possible object is shown) as your response, and respond with only the filled out JSON form below. Nothing else. Try to fill as many possibles and as much info in the JSON as you can:
  
  {
    "general_desc": "<give a short overview of findings. Keep it limited please>"
    "possibles": [
           {
               "possible_name": "<name of what might be causing it>"
               "source": "<link your source>"
               "desc": "<give a short description about what this is. Keep it limited please>"
           }
     ]
  }

  If you do not think the medical problem stated is a medical problem, return the below JSON instead. Remember, it is ok to return the above JSON with no possibles or empty, this should only be used when you have tried everything and cannot determine this to be a medical issue.
  {
    "error": "Unknown Request"
  }
`;

dotenv.config();

const api = new BingChat({
  cookie: process.env.BING_COOKIE ? process.env.BING_COOKIE: ""
});

export default async (req: any, res: any) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  var variant = process.env.BING_VARIANT;
  var prompt: string = searchPrompt
                      .replace("MEDICAL_ISSUE", req.body.MEDICAL_ISSUE);
  console.log(prompt);
  try {
    const ret = await api.sendMessage(prompt, { variant });
    res.json(JSON.parse(ret.text));
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};