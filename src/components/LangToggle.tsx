import { useLang } from '@/context/LanguageContext'

export function LangToggle() {
  const { lang, setLang } = useLang()

  return (
    <button
      onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-vv-gold/30 hover:border-vv-gold/60 transition-all"
      style={{ color: '#c9a84c', fontSize: '10px', letterSpacing: '0.15em' }}
      aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      <span className={lang === 'es' ? 'opacity-100 font-semibold' : 'opacity-40'}>ES</span>
      <span className="opacity-30">|</span>
      <span className={lang === 'en' ? 'opacity-100 font-semibold' : 'opacity-40'}>EN</span>
    </button>
  )
}
