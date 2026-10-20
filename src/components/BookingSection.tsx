import { MessageCircle } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { buildWhatsAppLink, getSiteWhatsAppNumber } from "@/lib/whatsapp";

/**
 * Contact section. WhatsApp only: no form that pretends to send anything.
 * Renders nothing until VITE_WHATSAPP_NUMBER is set.
 */
const BookingSection = () => {
  const { lang } = useLang();
  const number = getSiteWhatsAppNumber();
  if (!number) return null;

  const isEs = lang === "es";
  const href = buildWhatsAppLink(
    number,
    isEs
      ? "Hola, me gustaria planear un atardecer en Puerto Vallarta."
      : "Hi, I'd like help planning a sunset in Puerto Vallarta.",
  );

  return (
    <section id="booking" className="py-24 px-6 md:px-10">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          {isEs ? "Escribenos por WhatsApp" : "Message us on WhatsApp"}
        </h2>
        <p className="text-gray-600 mb-8">
          {isEs
            ? "Cuentanos que buscas y te respondemos directamente."
            : "Tell us what you are looking for and we reply directly."}
        </p>
        <a
          href={href}
          className="inline-flex items-center gap-2 rounded-full bg-ocean-600 hover:bg-ocean-700 text-white px-8 py-4 font-medium transition-colors"
        >
          <MessageCircle className="h-5 w-5" />
          WhatsApp
        </a>
      </div>
    </section>
  );
};

export default BookingSection;
