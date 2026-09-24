import { ProglerSearch } from '@/components/progler-search'

const popularShortcuts = ['GitHub', 'YouTube', 'Figma', 'NotebookLM', 'ChatGPT', 'LeetCode']

export default function Page() {
  return (
    <>
      <ProglerSearch shortcuts={popularShortcuts} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Progler',
            description: 'A fast, thoughtful search engine for the modern web.',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://progler.vercel.app/?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
    </>
  )
}
