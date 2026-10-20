export interface Section { h: string; p: string[] }
export interface PageCopy { title: string; lead: string; draft?: string; sections: Section[] }
type Lang = 'en' | 'es'

export const TRUST: Record<'verified' | 'money' | 'privacy' | 'terms', Record<Lang, PageCopy>> = {
  verified: {
    en: {
      title: 'How we verify',
      lead: 'A business gets a Verified badge only when every item below is true and recorded with a date.',
      sections: [
        { h: 'What we check', p: ['We visit in person or meet on live video, and confirm a working phone or WhatsApp number.', 'The owner confirms they run the business by replying to a code we send on WhatsApp.'] },
        { h: 'What the badge says', p: ['The badge shows when we verified, how (in person or live video) and when we will check again, for example: "Verified March 2027, in person, next check September 2027".', 'We re-check every 6 months. If a check is overdue the badge comes off.'] },
        { h: 'Reviews', p: ['Only real reviews: from a QR code at the venue or from proof of booking. We do not import reviews and we do not write them.'] },
        { h: 'Cost', p: ['Verification is always free. Sponsored placements are always labeled "Sponsored" and never change a verification result or remove a review.'] },
        { h: 'Something wrong?', p: ['If a listing is wrong or a business behaved badly, tell us on the report page. We read every report.'] },
      ],
    },
    es: {
      title: 'Cómo verificamos',
      lead: 'Un negocio recibe la insignia Verificado solo cuando todo lo siguiente es cierto y queda registrado con fecha.',
      sections: [
        { h: 'Qué revisamos', p: ['Lo visitamos en persona o nos reunimos por videollamada, y confirmamos que el teléfono o WhatsApp funcione.', 'El dueño confirma que administra el negocio respondiendo un código que le enviamos por WhatsApp.'] },
        { h: 'Qué dice la insignia', p: ['La insignia muestra cuándo verificamos, cómo (en persona o por video) y cuándo volveremos a revisar, por ejemplo: "Verificado marzo 2027, en persona, próxima revisión septiembre 2027".', 'Revisamos cada 6 meses. Si una revisión se atrasa, la insignia se quita.'] },
        { h: 'Reseñas', p: ['Solo reseñas reales: con un código QR en el local o con comprobante de reservación. No importamos reseñas ni las escribimos nosotros.'] },
        { h: 'Costo', p: ['La verificación siempre es gratis. Los espacios patrocinados siempre dicen "Patrocinado" y nunca cambian un resultado de verificación ni eliminan una reseña.'] },
        { h: '¿Algo está mal?', p: ['Si un listado es incorrecto o un negocio se portó mal, avísanos en la página de reportes. Leemos cada reporte.'] },
      ],
    },
  },
  money: {
    en: {
      title: 'How we make money',
      lead: 'Short version: verification is free, and paying us never buys a better verification or hides a review.',
      sections: [
        { h: 'Free', p: ['Getting verified and being listed is free for every business that passes.'] },
        { h: 'Optional paid services', p: ['Businesses can pay for extras such as a featured position or help with their listing. Anything paid is shown as "Sponsored".'] },
        { h: 'What money never does', p: ['Payment never changes whether a business is verified, never removes a review, and never moves a business above a better-reviewed one without a "Sponsored" label.'] },
      ],
    },
    es: {
      title: 'Cómo ganamos dinero',
      lead: 'En corto: la verificación es gratis, y pagarnos nunca compra una mejor verificación ni esconde una reseña.',
      sections: [
        { h: 'Gratis', p: ['Verificarse y aparecer en el directorio es gratis para todo negocio que pase la revisión.'] },
        { h: 'Servicios opcionales de pago', p: ['Los negocios pueden pagar extras, como una posición destacada o ayuda con su ficha. Todo lo pagado se marca como "Patrocinado".'] },
        { h: 'Lo que el dinero nunca hace', p: ['El pago nunca cambia si un negocio está verificado, nunca elimina una reseña y nunca sube a un negocio sobre otro mejor calificado sin la etiqueta "Patrocinado".'] },
      ],
    },
  },
  privacy: {
    en: {
      title: 'Privacy notice',
      lead: 'How we handle personal data collected through this site.',
      draft: 'DRAFT for owner review. Not final legal text. Placeholders in [brackets] must be filled and a Mexican privacy lawyer should review before launch (LFPDPPP).',
      sections: [
        { h: 'Who is responsible', p: ['[Legal name or business name], [address], [contact email]. This is the data controller under Mexico\'s Ley Federal de Protección de Datos Personales en Posesión de los Particulares.'] },
        { h: 'What we collect', p: ['Only what you type into our forms: for business claims, the business and owner contact details; for reports, the report text and optional contact. We do not collect more than the form asks.'] },
        { h: 'Why', p: ['To verify businesses, respond to you, and review reports. We do not sell personal data.'] },
        { h: 'Your rights', p: ['You can access, correct or delete your data, or object to its use (ARCO rights). Write to [contact email].'] },
        { h: 'Service providers', p: ['We store form data with [Supabase region/company] and will list any other provider here.'] },
      ],
    },
    es: {
      title: 'Aviso de privacidad',
      lead: 'Cómo tratamos los datos personales que se recaban en este sitio.',
      draft: 'BORRADOR para revisión del dueño. No es texto legal final. Los [corchetes] deben completarse y un abogado en México debe revisarlo antes de publicar (LFPDPPP).',
      sections: [
        { h: 'Responsable', p: ['[Razón social o nombre], [domicilio], [correo de contacto]. Responsable del tratamiento conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.'] },
        { h: 'Datos que recabamos', p: ['Solo lo que escribes en nuestros formularios: en solicitudes de negocios, datos de contacto del negocio y del dueño; en reportes, el texto del reporte y un contacto opcional. No recabamos más de lo que pide el formulario.'] },
        { h: 'Finalidades', p: ['Verificar negocios, responderte y revisar reportes. No vendemos datos personales.'] },
        { h: 'Tus derechos', p: ['Puedes acceder, rectificar o cancelar tus datos, u oponerte a su uso (derechos ARCO). Escribe a [correo de contacto].'] },
        { h: 'Proveedores', p: ['Guardamos los datos de los formularios con [Supabase, región/empresa] y listaremos aquí cualquier otro proveedor.'] },
      ],
    },
  },
  terms: {
    en: {
      title: 'Terms of use',
      lead: 'Plain terms for using this site.',
      draft: 'DRAFT for owner review. Not final legal text. Review with a lawyer before launch.',
      sections: [
        { h: 'What this site is', p: ['A guide to Puerto Vallarta. Listings are information, not an endorsement or a guarantee. Check details with the business before you go.'] },
        { h: 'Verification', p: ['Verified means the checks on the "How we verify" page were done on the date shown. It does not guarantee future service.'] },
        { h: 'Your submissions', p: ['Only submit information that is true and that you have the right to share. We may decline or remove submissions.'] },
        { h: 'Changes and contact', p: ['We may update these terms. Questions: [contact email]. Governing law and venue: [to be set with counsel].'] },
      ],
    },
    es: {
      title: 'Términos de uso',
      lead: 'Términos claros para usar este sitio.',
      draft: 'BORRADOR para revisión del dueño. No es texto legal final. Revisar con un abogado antes de publicar.',
      sections: [
        { h: 'Qué es este sitio', p: ['Una guía de Puerto Vallarta. Los listados son información, no una recomendación ni una garantía. Confirma los detalles con el negocio antes de ir.'] },
        { h: 'Verificación', p: ['Verificado significa que las revisiones de la página "Cómo verificamos" se hicieron en la fecha indicada. No garantiza el servicio futuro.'] },
        { h: 'Lo que envías', p: ['Envía solo información verdadera que tengas derecho a compartir. Podemos rechazar o quitar envíos.'] },
        { h: 'Cambios y contacto', p: ['Podemos actualizar estos términos. Preguntas: [correo de contacto]. Ley aplicable y jurisdicción: [por definir con un abogado].'] },
      ],
    },
  },
}
