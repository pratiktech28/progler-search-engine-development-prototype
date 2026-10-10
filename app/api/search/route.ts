import { generateText } from 'ai'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const query = typeof body?.query === 'string' ? body.query.trim() : ''
    const type = body?.type === 'news' ? 'news' : 'search'

    if (!query || query.length > 300) {
      return NextResponse.json({ error: 'Enter a valid search query.' }, { status: 400 })
    }

    const apiKey = process.env.SERPER_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Search is not configured yet.' }, { status: 503 })
    }

    const response = await fetch(`https://google.serper.dev/${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-KEY': apiKey },
      body: JSON.stringify({ q: query, num: 10, gl: 'in', hl: 'en' }),
      cache: 'no-store',
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'The search provider is unavailable.' }, { status: 502 })
    }

    const payload = await response.json()
    const results = (payload.organic ?? payload.news ?? []).map((item: Record<string, unknown>, index: number) => ({
      position: index + 1,
      title: typeof item.title === 'string' ? item.title : 'Untitled result',
      link: typeof item.link === 'string' ? item.link : '#',
      snippet: typeof item.snippet === 'string' ? item.snippet : '',
      source: typeof item.source === 'string' ? item.source : (() => {
        try { return new URL(typeof item.link === 'string' ? item.link : 'https://progler.local').hostname } catch { return 'Web result' }
      })(),
      date: typeof item.date === 'string' ? item.date : undefined,
    }))

    let overview = ''
    try {
      const response = await generateText({
        model: 'google/gemini-3.5-flash',
        system: 'You are Progler AI. Give a concise, neutral answer based only on the provided search results. Cite sources inline as [1], [2]. If evidence is limited, say so. Do not invent facts.',
        prompt: `Question: ${query}\n\nSearch results:\n${results.slice(0, 8).map((result: { title: string; link: string; snippet: string }, index: number) => `[${index + 1}] ${result.title}\n${result.link}\n${result.snippet}`).join('\\n\\n')}`,
        maxOutputTokens: 420,
      })
      overview = response.text.trim()
    } catch {
      overview = ''
    }

    if (!overview && results.length > 0) {
      overview = `Progler found ${results.length} relevant sources for “${query}”. The strongest matches focus on ${results.slice(0, 2).map((result: { title: string }) => result.title).join(' and ')}. Review the linked sources for full context.`
    }

    return NextResponse.json({ query, results, overview })
  } catch {
    return NextResponse.json({ error: 'Unable to complete this search.' }, { status: 500 })
  }
}
