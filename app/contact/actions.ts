"use server";

import { Resend } from "resend";

interface ContactFormState {
  success: boolean;
  error: string | null;
}

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!name || !email || !message) {
    return { success: false, error: "All fields are required." };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!apiKey) {
    console.log("[contact] RESEND_API_KEY not set. Logging submission:", {
      name,
      email,
      message,
    });
    return { success: true, error: null };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "boltn Contact Form <contact@boltn.com>",
      to: contactEmail || "steve@boltn.com",
      subject: `New contact from ${name}`,
      replyTo: email,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    return { success: true, error: null };
  } catch (err) {
    console.error("[contact] Resend error:", err);
    return {
      success: false,
      error: "Something went wrong sending your message. Try again or email us directly.",
    };
  }
}
