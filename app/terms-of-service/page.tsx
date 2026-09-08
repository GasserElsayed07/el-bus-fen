import type { Metadata } from "next";
import { LegalDocument, type LegalSection } from "@/features/legal";

export const metadata: Metadata = {
  title: "Terms of Service | El-Bus Fen",
  description: "Terms for using the El-Bus Fen bus information service.",
};

const sections: LegalSection[] = [
  {
    heading: "Using El-Bus Fen",
    paragraphs: [
      "El-Bus Fen is a bus information and coordination tool. By using the service, you agree to these terms and to use the service lawfully and respectfully.",
      "You may sign in with Google to create an El-Bus Fen account. You are responsible for maintaining access to the Google account you use and for activity performed through your El-Bus Fen account.",
    ],
  },
  {
    heading: "Bus information is not a guarantee",
    paragraphs: [
      "Bus locations, routes, stops, and user-submitted information may be delayed, incomplete, inaccurate, or unavailable. El-Bus Fen is not an official transportation authority and does not guarantee that a bus will arrive, follow a route, or be shown at an exact location.",
      "Use your own judgment, follow local transportation and safety rules, and allow enough time for your journey. Do not rely on El-Bus Fen as the sole source of information for an urgent or safety-critical trip.",
    ],
  },
  {
    heading: "Your contributions",
    paragraphs: [
      "When you submit bus or map information, you must have the right to share it and should take reasonable care that it is accurate. Do not submit private information about another person, misleading reports, malicious content, or anything that could put another person at risk.",
      "You give El-Bus Fen permission to use submitted bus-related information to operate, maintain, and improve the service. You retain responsibility for what you submit.",
    ],
  },
  {
    heading: "Prohibited use",
    paragraphs: [
      "You must not attempt to bypass authentication, interfere with the service, probe its systems, scrape it in a way that harms availability, upload malicious code, or use the service to harass, impersonate, or harm others.",
      "We may suspend or restrict access when necessary to protect users, the service, or its infrastructure.",
    ],
  },
  {
    heading: "Availability and changes",
    paragraphs: [
      "The service is provided as available. Features may change, be interrupted, or be removed as El-Bus Fen is developed. We may update these terms when the service or its legal obligations change; the revised date will appear at the top of this page.",
    ],
  },
  {
    heading: "Disclaimer and responsibility",
    paragraphs: [
      "To the extent allowed by law, El-Bus Fen is provided without guarantees about accuracy, availability, fitness for a particular purpose, or uninterrupted operation. You are responsible for deciding whether information from the service is suitable for your situation and for complying with applicable laws and safety requirements.",
    ],
  },
  {
    heading: "Questions",
    paragraphs: [
      "Questions about these terms can be raised through the current support channel provided with the service.",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalDocument
      eyebrow="Terms of service"
      title="A clear agreement for the ride."
      intro="These terms set the ground rules for using El-Bus Fen and its community-sourced bus information."
      updated="September 8, 2026"
      sections={sections}
    />
  );
}
