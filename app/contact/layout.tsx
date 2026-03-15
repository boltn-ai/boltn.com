import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Drop a message or book a discovery call. No forms committee, no 3-day SLA. Just a reply from a real person.",
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
