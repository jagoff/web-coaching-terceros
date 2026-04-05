import HeroClient from './HeroClient'

export default function HeroServer({ pathname }: { pathname?: string }) {
  // Detect language from URL during SSR
  const isEnglish = pathname?.startsWith('/en') || false

  return <HeroClient ssrLanguage={isEnglish ? 'en' : 'es'} />
}
