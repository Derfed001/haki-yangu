// All referral numbers below are real, publicly listed Kenyan services --
// verify current numbers before an actual deployment, orgs occasionally
// change lines. Content is deliberately short (USSD screens are ~182 chars)
// and framed as general information, never as a legal conclusion on a
// specific case.

const DISCLAIMER = "This is general info, not legal advice. For your case, talk to a lawyer.";

const TOPICS = {
  land: {
    menuLabel: "Land & Property Rights",
    guide:
      "LAND & PROPERTY: The Matrimonial Property Act protects a spouse's " +
      "share of matrimonial property, regardless of whose name it's in. " +
      "The Land Registration Act requires spousal consent before land is " +
      "sold. If land was grabbed, report to your Chief or Land Registrar.",
    referral: "Free legal aid: FIDA-Kenya toll-free 0800 720 050.",
  },
  gbv: {
    menuLabel: "GBV & Safety",
    guide:
      "GBV & SAFETY: The Protection Against Domestic Violence Act makes " +
      "domestic violence a crime. You can get a protection order from a " +
      "court. Support, shelter and emergency rescue are available now.",
    referral: "National GBV Helpline: 1195 (toll-free, 24/7). For children: National Child Helpline 116.",
  },
  workplace: {
    menuLabel: "Workplace Rights",
    guide:
      "WORKPLACE RIGHTS: The Employment Act entitles you to a written " +
      "contract, at least 21 working days annual leave, 90 days maternity " +
      "leave, and protection from sexual harassment at work.",
    referral: "Unresolved disputes: Ministry of Labour, or FIDA-Kenya toll-free 0800 720 050.",
  },
  inheritance: {
    menuLabel: "Marriage & Inheritance",
    guide:
      "MARRIAGE & INHERITANCE: Under the Law of Succession Act, a " +
      "surviving spouse and children are entitled to a share of a " +
      "deceased person's estate. Daughters and widows do not lose their " +
      "right to inherit.",
    referral: "Help with succession cases: FIDA-Kenya toll-free 0800 720 050, or the Public Trustee.",
  },
};

const REPORT_CATEGORIES = {
  "1": "Land & Property",
  "2": "GBV & Safety",
  "3": "Workplace",
  "4": "Marriage & Inheritance",
  "5": "Other",
};

module.exports = { DISCLAIMER, TOPICS, REPORT_CATEGORIES };
