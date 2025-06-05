import { TwilioComplianceEmbed } from "@twilio/twilio-compliance-embed";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [inquiry, setInquiry] = useState<Inquiry>();

  useEffect(() => {
    fetch("/api/token")
      .then((res) => res.json())
      .then(setInquiry);
  }, []);

  if (!inquiry) return <div>Loading</div>;

  return (
    <div style={{ width: "800px", minHeight: "500px", height: "100vh" }}>
      <TwilioComplianceEmbed
        inquiryId={inquiry.inquiryId}
        inquirySessionToken={inquiry.inquirySessionToken}
      />
    </div>
  );
}

interface Inquiry {
  inquiryId: string;
  inquirySessionToken: string;
}
