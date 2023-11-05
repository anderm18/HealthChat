import { BingChat } from "bing-chat-rnz";
// import dotenv from "dotenv"; -- dev only

const searchPrompt = 
`
Medical Problem:

  { MEDICAL_ISSUE }
  
  Identify which specialty would be best to treat it
  
  Find doctors in or near: { CITY , STATE } that match that specialty and accept the insurance: { INSURANCE }.

  Please do not respond with any symbols, only plaintext. If you must link a site, only respond with the link's url.
  Fill in this JSON (doctors is a list of doctors, an example doctor object is shown) as your response, and respond with only the filled out JSON form below. Nothing else. Try to fill as many doctors and as much info in the JSON as you can:
  
  {
    "specialty": <answer>
    "doctors": [
           {
               "doctorname": "<name>",
               "address": "<address>",
               "phone_number": "<phone number>",
               "website": "<website if exists, else leave string empty>",
               "board_certified": "<true or false, if board certification is not an thing for this kind of speciality, just type N/A.>",
               "rating": <the doctors review out of 5 stars, if you can find it. Please return the integer representing the rating. Otherwise, return -1>"
           }
     ]
  }

  If you do not think the medical problem stated is a medical problem, return the below JSON instead. Remember, it is ok to return the above JSON with no doctors, this should only be used when you have tried everything and cannot determine this to be a medical issue.
  {
    "error": "Unknown Request"
  }
`;

// dotenv.config(); -- dev only

const api = new BingChat({
  cookie: process.env.BING_COOKIE ? process.env.BING_COOKIE: ""
});

const searchMed = async (req: any, res: any) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  var variant = process.env.BING_VARIANT;
  var prompt: string = searchPrompt
                      .replace("MEDICAL_ISSUE", req.body.MEDICAL_ISSUE)
                      .replace("CITY", req.body.CITY)
                      .replace("STATE", req.body.STATE)
                      .replace("INSURANCE", req.body.INSURANCE ? req.body.INSURANCE : "any");

  try {
    const ret = await api.sendMessage(prompt, { variant });
    res.json(JSON.parse(ret.text));
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export default searchMed;