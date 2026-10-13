require("dotenv").config();
const express = require("express");
const AfricasTalking = require("africastalking");

const { DISCLAIMER, TOPICS, REPORT_CATEGORIES } = require("./content");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const at = AfricasTalking({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME,
});
const smsService = at.SMS;

// In-memory store for the hackathon demo only -- swap for a real DB /
// partner-org referral API before any real deployment.
const reports = [];

function generateRef() {
  return "HY-" + Math.floor(1000 + Math.random() * 9000);
}

async function sendSms(to, message) {
  try {
    await smsService.send({
      to: [to],
      message,
      ...(process.env.AT_SMS_SHORTCODE ? { from: process.env.AT_SMS_SHORTCODE } : {}),
    });
  } catch (err) {
    // Don't let an SMS failure break the USSD session -- log and move on.
    console.error("SMS send failed:", err.message);
  }
}

const TOPIC_KEYS = ["land", "gbv", "workplace", "inheritance"];

app.post("/ussd", async (req, res) => {
  const { sessionId, phoneNumber, text = "" } = req.body;
  const parts = text.split("*").filter((p) => p !== "");
  let response;

  try {
    if (parts.length === 0) {
      // Main menu
      response =
        "CON Welcome to Haki Yangu - know your rights\n" +
        "1. Land & Property Rights\n" +
        "2. GBV & Safety\n" +
        "3. Workplace Rights\n" +
        "4. Marriage & Inheritance\n" +
        "5. Report an Issue";
    } else if (["1", "2", "3", "4"].includes(parts[0]) && parts.length === 1) {
      const topic = TOPICS[TOPIC_KEYS[Number(parts[0]) - 1]];
      response = `CON ${topic.guide}\n${topic.referral}\n9. Send this to my phone\n0. Back to menu`;
    } else if (["1", "2", "3", "4"].includes(parts[0]) && parts.length === 2 && parts[1] === "9") {
      const topic = TOPICS[TOPIC_KEYS[Number(parts[0]) - 1]];
      await sendSms(phoneNumber, `HAKI YANGU - ${topic.menuLabel}\n${topic.guide}\n${topic.referral}\n${DISCLAIMER}`);
      response = "END Sent to your phone by SMS. Stay safe.";
    } else if (["1", "2", "3", "4"].includes(parts[0]) && parts.length === 2 && parts[1] === "0") {
      response =
        "CON Welcome to Haki Yangu - know your rights\n" +
        "1. Land & Property Rights\n" +
        "2. GBV & Safety\n" +
        "3. Workplace Rights\n" +
        "4. Marriage & Inheritance\n" +
        "5. Report an Issue";
    } else if (parts[0] === "5" && parts.length === 1) {
      response =
        "CON Report an issue. Select category:\n" +
        "1. Land & Property\n2. GBV & Safety\n3. Workplace\n" +
        "4. Marriage & Inheritance\n5. Other\n0. Back to menu";
    } else if (parts[0] === "5" && parts.length === 2 && parts[1] === "0") {
      response =
        "CON Welcome to Haki Yangu - know your rights\n" +
        "1. Land & Property Rights\n" +
        "2. GBV & Safety\n" +
        "3. Workplace Rights\n" +
        "4. Marriage & Inheritance\n" +
        "5. Report an Issue";
    } else if (parts[0] === "5" && parts.length === 2 && REPORT_CATEGORIES[parts[1]]) {
      response = "CON Briefly describe the issue (few words):";
    } else if (parts[0] === "5" && parts.length >= 3 && REPORT_CATEGORIES[parts[1]]) {
      const category = REPORT_CATEGORIES[parts[1]];
      const description = parts.slice(2).join(" ").slice(0, 140);
      const ref = generateRef();
      reports.push({
        ref,
        phoneNumber,
        category,
        description,
        sessionId,
        createdAt: new Date().toISOString(),
      });
      await sendSms(
        phoneNumber,
        `HAKI YANGU - Report received. Ref: ${ref} (${category}). ` +
          `A partner organization will follow up. If you are in danger now, call 1195 (GBV Helpline, 24/7).`
      );
      response =
        `END Thank you. Your reference is ${ref}.\n` +
        `A partner organization will follow up.\n` +
        `If you're in danger now, call 1195.`;
    } else {
      response = "END Sorry, something went wrong. Please dial in again.";
    }
  } catch (err) {
    console.error("USSD handler error:", err);
    response = "END Sorry, something went wrong. Please try again shortly.";
  }

  res.set("Content-Type", "text/plain");
  res.send(response);
});

// Simple endpoint for the demo/pitch -- lets you show judges the
// "reports received" list without opening a database console.
app.get("/reports", (req, res) => {
  res.json(reports);
});

app.get("/", (req, res) => {
  res.send("Haki Yangu backend is running. Point your AT USSD channel at POST /ussd.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Haki Yangu backend listening on port ${port}`));
