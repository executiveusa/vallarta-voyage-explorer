import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLang } from '@/context/LanguageContext'
import { TRUST } from '@/content/trust'

export default function TrustPage({ page }: { page: keyof typeof TRUST }) {
  const { lang } = useLang()
  const c = TRUST[page][lang]
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0b1630', color: '#f5f0e8' }}>
      <Navbar />
      <main id="main-content" className="flex-1 mx-auto w-full max-w-2xl px-6 pt-32 pb-20">
        <h1 className="mb-4 text-4xl font-semibold md:text-5xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          {c.title}
        </h1>
        {c.draft && (
          <p className="mb-6 rounded-lg border border-[#e8b04a]/50 bg-[#e8b04a]/10 p-4 text-sm" role="note">
            {c.draft}
          </p>
        )}
        <p className="mb-10 text-lg leading-relaxed opacity-90">{c.lead}</p>
        {c.sections.map((s) => (
          <section key={s.h} className="mb-8">
            <h2 className="mb-2 text-xl font-semibold">{s.h}</h2>
            {s.p.map((t) => (
              <p key={t} className="mb-3 leading-relaxed opacity-90">{t}</p>
            ))}
          </section>
        ))}
      </main>
      <Footer />
    </div>
  )
}
