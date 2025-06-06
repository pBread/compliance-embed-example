import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log("incoming-message", JSON.stringify(req.body, null, 2));

  res.status(200).json({ status: "done" });
}
