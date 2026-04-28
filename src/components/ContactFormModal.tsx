import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Mail, Building2, Phone, MessageSquare, CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormStatus = "idle" | "sending" | "success" | "error";

const ContactFormModal = ({ isOpen, onClose }: ContactFormModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setName("");
        setEmail("");
        setCompany("");
        setPhone("");
        setMessage("");
        setStatus("idle");
      }, 300);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #0f172a, #1e293b); padding: 24px; border-radius: 12px 12px 0 0;">
          <h2 style="color: #2dd4bf; margin: 0; font-size: 22px;">🚀 New Expert Consultation Request</h2>
          <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 14px;">via ReguLattice Website</p>
        </div>
        <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px; width: 120px; vertical-align: top;"><strong>Name</strong></td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px; vertical-align: top;"><strong>Email</strong></td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px;"><a href="mailto:${email}" style="color: #0d9488;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px; vertical-align: top;"><strong>Company</strong></td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px;">${company || "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px; vertical-align: top;"><strong>Phone / WhatsApp</strong></td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px;">${phone || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #64748b; font-size: 14px; vertical-align: top;"><strong>Message</strong></td>
              <td style="padding: 12px 0; color: #0f172a; font-size: 14px; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
        </div>
      </div>
    `;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Messages: [
            {
              From: {
                Email: "info@regulattice.com",
                Name: "ReguLattice Website",
              },
              To: [
                {
                  Email: "info@regulattice.com",
                  Name: "ReguLattice",
                },
                {
                  Email: "moazzamwaheed@gmail.com",
                  Name: "Moazzam Waheed",
                },
              ],
              Subject: `Expert Consultation Request from ${name}`,
              TextPart: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nPhone/WhatsApp: ${phone}\nMessage: ${message}`,
              HTMLPart: htmlBody,
              ReplyTo: {
                Email: email,
                Name: name,
              },
            },
          ],
        }),
      });

      const data = await response.json();
      console.log("Mailjet response:", data);

      if (response.ok && data?.Messages?.[0]?.Status === "success") {
        setStatus("success");
      } else {
        console.error("Mailjet error:", data);
        setStatus("error");
      }
    } catch (err) {
      console.error("Send failed:", err);
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-slate-900 px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-600/20 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Talk to an Expert</h3>
                    <p className="text-sm text-slate-400">We'll get back to you within 24 hours.</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 transition-colors"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-teal-600" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h4>
                    <p className="text-slate-500 mb-6">
                      Thanks for reaching out, {name}. Our compliance experts will be in touch shortly.
                    </p>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Work Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@company.com"
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Company
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Acme Corp"
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone / WhatsApp */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Phone No. / WhatsApp
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+92 300 1234567"
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        How can we help? <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        placeholder="Tell us about your compliance goals, team size, and timeline..."
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all resize-none"
                      />
                    </div>

                    {/* Error message */}
                    {status === "error" && (
                      <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                        Something went wrong. Please try again or email us directly at{" "}
                        <a href="mailto:moazzamwaheed@gmail.com" className="underline font-semibold">
                          moazzamwaheed@gmail.com
                        </a>
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white font-semibold py-3 rounded-lg hover:bg-teal-500 hover:shadow-[0_0_20px_rgba(13,148,136,0.3)] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactFormModal;
