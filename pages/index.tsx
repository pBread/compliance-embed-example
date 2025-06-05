import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const TwilioComplianceEmbed = dynamic(
  () =>
    import("@twilio/twilio-compliance-embed").then((item) => {
      console.debug("import dynamic", Object.keys(item));
      return item.TwilioComplianceEmbed;
    }),
  { ssr: false },
);

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

  console.debug("inquiry", inquiry);

  console.debug("TwilioComplianceEmbed", TwilioComplianceEmbed);

  if (!inquiry) return <div>Loading</div>;

  return (
    <div style={{ width: "500px", height: "500px" }}>
      <TwilioComplianceEmbed
        inquiryId={inquiry.inquiryId}
        inquirySessionToken={inquiry.inquirySessionToken}
      />
    </div>
  );
}
