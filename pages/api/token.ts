import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, DEMO_PHONE, DEMO_EMAIL } =
  process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const inquiry = await client.trusthub.v1.complianceTollfreeInquiries.create({
    notificationEmail: DEMO_EMAIL!,
    tollfreePhoneNumber: DEMO_PHONE!,
  });

  res.status(200).json(inquiry);
}
