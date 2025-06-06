import "dotenv-flow/config";
import twilio, { Twilio } from "twilio";

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, HOSTNAME } = process.env;

async function main() {
  const subaccount = await createSubaccount("Owl Ventures");
  console.log("subaccount created", subaccount.sid);

  const client = twilio(subaccount.sid, subaccount.authToken);
  const messagingService = await createMessagingService(client);
  console.log("messagingService created", messagingService.sid);

  const phoneNumber = await provisionPhoneNumber(client);
  console.log("phoneNumber provisioned", messagingService.sid);

  await assignPhoneNumber(client, messagingService.sid, phoneNumber.sid);
  console.log("phoneNumber assigned to messaging service");
}

main();

async function createSubaccount(friendlyName: string) {
  const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  return client.api.v2010.accounts.create({ friendlyName });
}

async function createMessagingService(client: Twilio) {
  return client.messaging.v1.services.create({
    friendlyName: "Notifications",
    useInboundWebhookOnNumber: true,
    inboundMethod: "POST",
    inboundRequestUrl: `https://${HOSTNAME}/api/incoming-message`,
    statusCallback: `https://${HOSTNAME}/api/status-callback`,
  });
}

async function provisionPhoneNumber(client: Twilio) {
  const availableNumbers = await client
    .availablePhoneNumbers("US")
    .tollFree.list();

  const incomingNumber = await client.incomingPhoneNumbers.create({
    phoneNumber: availableNumbers[0].phoneNumber,
  });

  return incomingNumber;
}

async function assignPhoneNumber(
  client: Twilio,
  messagingServiceSid: string,
  phoneNumberSid: string,
) {
  return client.messaging.v1
    .services(messagingServiceSid)
    .phoneNumbers.create({ phoneNumberSid });
}
