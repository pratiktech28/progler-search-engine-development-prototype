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

    return NextResponse.json({ query, results })
  } catch {
    return NextResponse.json({ error: 'Unable to complete this search.' }, { status: 500 })
  }
}
