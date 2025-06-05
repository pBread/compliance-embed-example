import { TwilioComplianceEmbed } from "@twilio/twilio-compliance-embed";
import { useEffect, useState } from "react";

interface Inquiry {
  inquiryId: string;
  inquirySessionToken: string;
}

export default function HomePage() {
  const [inquiry, setInquiry] = useState<Inquiry>();

  useEffect(() => {
    const getSetToken = async () => {
      const token = await fetch("/api/token").then((res) => res.json());
      setInquiry(token);
    };

    console.log("getSetToken");

    getSetToken();
  }, []);

  if (inquiry)
    return (
      <TwilioComplianceEmbed
        inquiryId={inquiry.inquiryId}
        inquirySessionToken={inquiry.inquirySessionToken}
      />
    );
  else return <div>Loading</div>;
}
