import type { Metadata } from "next";
import { LegalDocument, type LegalSection } from "@/features/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | El-Bus Fen",
  description:
    "How El-Bus Fen handles information used to provide its bus tracking service.",
};

const sections: LegalSection[] = [
  {
    heading: "What this policy covers",
    paragraphs: [
      "This policy explains how El-Bus Fen handles information when you use the service to sign in and view or share bus-related information. It applies to the El-Bus Fen website and app experience.",
    ],
  },
  {
    heading: "Google sign-in",
    paragraphs: [
      "When you choose Google sign-in, Google provides El-Bus Fen with a sign-in credential. The server verifies that credential with Google before creating your El-Bus Fen session. El-Bus Fen does not receive or store your Google password.",
      "For a Google account, we use the name and email address included in the verified Google profile to create or find your El-Bus Fen account. The Google credential itself is not stored after verification, and the application does not currently store the Google profile photo or Google account identifier in the user profile.",
    ],
  },
  {
    heading: "Information stored by El-Bus Fen",
    paragraphs: [
      "Your El-Bus Fen profile may contain your name, email address, onboarding status, and the bus preferences or map information you provide while using the service.",
      "This can include a selected bus route, bus stop identifier, and coordinates associated with a selected stop or map entry. These details help the service show relevant bus information; they are not collected from your device as continuous background location tracking.",
    ],
  },
  {
    heading: "Cookies and sessions",
    paragraphs: [
      "After successful sign-in, El-Bus Fen creates an encrypted, HTTP-only session cookie in your browser. It is used to recognize your account and expires after seven days. The cookie is not used to store your Google password or Google sign-in credential.",
      "You can clear the session by deleting the site cookies in your browser. Doing so may require you to sign in again.",
    ],
  },
  {
    heading: "How information is used",
    paragraphs: [
      "Information is used to authenticate you, maintain your account, remember your selected bus details, and provide the bus map and related service features. We do not sell your personal information.",
    ],
  },
  {
    heading: "Third-party services",
    paragraphs: [
      "Google processes the sign-in interaction under Google’s own terms and privacy policy. El-Bus Fen also relies on hosting and database providers to operate the service. Those providers may process information on our behalf as needed to provide infrastructure, security, and storage.",
    ],
  },
  {
    heading: "Changes and questions",
    paragraphs: [
      "This policy may be updated as El-Bus Fen changes. The date at the top of this page indicates when it was last revised. Questions or privacy requests can be raised through the current support channel provided with the service.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      eyebrow="Privacy policy"
      title="Your information, explained plainly."
      intro="El-Bus Fen uses a small amount of account and bus preference information to answer the question: where is the bus?"
      updated="September 8, 2026"
      sections={sections}
    />
  );
}
