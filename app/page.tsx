import { HeroSection } from "@/components/hero-section"

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://icb033.github.io/#organization',
      name: 'Infrastructure Consultant Bureau',
      alternateName: 'ICB',
      url: 'https://icb033.github.io',
      email: 'icb033@gmail.com',
      description:
        'Infrastructure Consultant Bureau (ICB) specializes in the design and engineering of bridges, roads, flyovers, and structural systems. Engineering the frameworks that carry tomorrow.',
      founder: {
        '@type': 'Person',
        '@id': 'https://icb033.github.io/#founder',
        name: 'Supriyolal Bandyopadhyay',
        jobTitle: 'Founder & Lead Consultant',
        worksFor: {
          '@type': 'Organization',
          name: 'Infrastructure Consultant Bureau',
        },
      },
      foundingDate: '2024',
      knowsAbout: [
        'Bridge Design',
        'Road Infrastructure',
        'Flyover Construction',
        'Structural Engineering',
        'Civil Engineering',
        'Infrastructure Consulting',
      ],
      areaServed: {
        '@type': 'Country',
        name: 'India',
      },
      slogan: 'Engineering the frameworks that carry tomorrow',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://icb033.github.io/#website',
      url: 'https://icb033.github.io',
      name: 'Infrastructure Consultant Bureau (ICB)',
      description:
        'Official website of Infrastructure Consultant Bureau, founded by Supriyolal Bandyopadhyay.',
      publisher: {
        '@id': 'https://icb033.github.io/#organization',
      },
    },
    {
      '@type': 'WebPage',
      '@id': 'https://icb033.github.io/#webpage',
      url: 'https://icb033.github.io',
      name: 'Infrastructure Consultant Bureau (ICB) | Founded by Supriyolal Bandyopadhyay',
      description:
        'Engineering the frameworks that carry tomorrow. Specializing in bridges, roads, flyovers, and structural design.',
      isPartOf: {
        '@id': 'https://icb033.github.io/#website',
      },
      about: {
        '@id': 'https://icb033.github.io/#organization',
      },
    },
  ],
}

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
    </main>
  )
}
