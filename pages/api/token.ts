import type { NextApiHandler } from "next";
import twilio from "twilio";

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, DEMO_PHONE, DEMO_EMAIL } =
  process.env;

if (!TWILIO_ACCOUNT_SID) throw Error("missing env TWILIO_ACCOUNT_SID");
if (!TWILIO_AUTH_TOKEN) throw Error("missing env TWILIO_AUTH_TOKEN");
if (!DEMO_PHONE) throw Error("missing DEMO_PHONE");
if (!DEMO_EMAIL) throw Error("missing DEMO_EMAIL");

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const createComplianceTollfreeInquiry = async () => {
  const inqiry = await client.trusthub.v1.complianceTollfreeInquiries.create({
    notificationEmail: DEMO_EMAIL,
    tollfreePhoneNumber: DEMO_PHONE,
  });

  console.log(inqiry.inquiryId);

  return inqiry;
};

const handler: NextApiHandler = async (req, res) => {
  const inquiry = await createComplianceTollfreeInquiry();
  res.status(200).json({ inquiry });
};

export default handler;
