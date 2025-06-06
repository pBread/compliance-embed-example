import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const TwilioComplianceEmbed = dynamic(
  () =>
    import("@twilio/twilio-compliance-embed").then(
      ({ TwilioComplianceEmbed }) => TwilioComplianceEmbed,
    ),
  { ssr: false },
);

export default function HomePage() {
  const [inquiry, setInquiry] = useState<Inquiry>();

  useEffect(() => {
    fetch("/api/token")
      .then((res) => res.json())
      .then(setInquiry);
  }, []);

  if (!inquiry) return <div>Loading</div>;

  return (
    <div style={{ width: "800px", height: "80vh" }}>
      <div>Phone: {process.env.NEXT_PUBLIC_PHONE}</div>
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
