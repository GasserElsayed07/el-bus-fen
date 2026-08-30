import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const metadata: Metadata = {
  title: "El-Bus fen",
  description: "Answer the age old question, el bus fen?",
  applicationName: "El-Bus Fen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
      >
        <body
          className="min-h-full flex flex-col"
          style={{
            fontFamily:
              "SF Pro Display, SF Pro Text, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          }}
        >
          {children}
        </body>
      </GoogleOAuthProvider>
    </html>
  );
}
