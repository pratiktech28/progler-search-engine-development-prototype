'use client'

import { useState } from 'react'
import {
  ArrowUpRight,
  Clock3,
  ExternalLink,
  Image as ImageIcon,
  Menu,
  Mic,
  MoreHorizontal,
  Newspaper,
  Search,
  Sparkles,
  X,
} from 'lucide-react'

const resultData = [
  {
    title: 'Cristiano Ronaldo | Biography, Facts & Career',
    url: 'wikipedia.org › Cristiano_Ronaldo',
    description: 'Cristiano Ronaldo dos Santos Aveiro is a Portuguese professional footballer who plays as a forward. Explore his career, records, clubs, and latest achievements.',
    accent: 'bg-[#dbeafe]',
    mark: 'W',
  },
  {
    title: 'Cristiano Ronaldo — Official Website',
    url: 'cristianoronaldo.com',
    description: 'Discover the latest news, exclusive content, and updates from one of the greatest footballers of all time.',
    accent: 'bg-[#f1f5f9]',
    mark: 'CR',
  },
  {
    title: 'Cristiano Ronaldo career statistics',
    url: 'uefa.com › players › 63706',
    description: 'Goals, appearances, titles and more. Get verified player statistics, match history, and tournament records from UEFA.',
    accent: 'bg-[#e0f2fe]',
    mark: 'U',
  },
]

const related = ['Cristiano Ronaldo age', 'Cristiano Ronaldo net worth', 'Ronaldo latest news', 'Cristiano Ronaldo goals']

export function ProglerSearch() {
  const [query, setQuery] = useState('Cristiano Ronaldo')
  const [activeTab, setActiveTab] = useState('All')
  const [showMenu, setShowMenu] = useState(false)

  function submitSearch(event: React.FormEvent) {
    event.preventDefault()
    const trimmed = query.trim()
    if (trimmed) setQuery(trimmed)
  }

  return (
    <div className="min-h-screen bg-[#fbfcfe] text-slate-900">
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1320px] items-center gap-5 px-5 py-4 lg:px-8">
          <button className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 md:hidden" aria-label="Open menu"><Menu size={20} /></button>
          <a href="#" className="flex items-center gap-2.5" aria-label="Progler home">
            <span className="grid h-9 w-9 place-items-center rounded-[11px] bg-slate-950 text-sm font-bold tracking-[-0.08em] text-white shadow-[0_5px_14px_rgba(15,23,42,0.18)]">P<span className="text-cyan-300">.</span></span>
            <span className="text-[19px] font-semibold tracking-[-0.04em]">progler</span>
          </a>
          <form onSubmit={submitSearch} className="relative max-w-[650px] flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input aria-label="Search" value={query} onChange={(e) => setQuery(e.target.value)} className="h-11 w-full rounded-full border border-slate-200 bg-slate-50/70 pl-11 pr-24 text-[15px] outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100" />
            <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 text-slate-400">
              {query && <button type="button" onClick={() => setQuery('')} className="rounded-full p-1.5 hover:bg-slate-200" aria-label="Clear search"><X size={16} /></button>}
              <button type="button" className="hidden rounded-full p-1.5 hover:bg-slate-200 sm:block" aria-label="Voice search"><Mic size={17} /></button>
            </div>
          </form>
          <nav className="ml-auto hidden items-center gap-5 text-sm text-slate-500 md:flex">
            <a href="#about" className="hover:text-slate-950">About</a>
            <a href="#labs" className="hover:text-slate-950">Labs</a>
            <button className="rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-700 hover:border-slate-400">Sign in</button>
          </nav>
        </div>
      </header>

      <div className="border-b border-slate-200/70 bg-white">
        <div className="mx-auto flex max-w-[1320px] items-center gap-7 overflow-x-auto px-5 lg:px-8">
          {['All', 'News', 'Images', 'Videos', 'Maps', 'More'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`relative whitespace-nowrap py-3.5 text-[13px] font-medium transition ${activeTab === tab ? 'text-slate-950' : 'text-slate-500 hover:text-slate-900'}`}>
              {tab === 'News' && <Newspaper size={14} className="mr-1.5 inline-block" />}{tab === 'Images' && <ImageIcon size={14} className="mr-1.5 inline-block" />}{tab}
              {activeTab === tab && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-cyan-500" />}
            </button>
          ))}
          <div className="relative ml-auto hidden sm:block">
            <button onClick={() => setShowMenu(!showMenu)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="More search settings"><MoreHorizontal size={19} /></button>
            {showMenu && <div className="absolute right-0 top-10 z-10 w-48 rounded-xl border border-slate-200 bg-white p-1.5 text-sm shadow-xl"><button className="w-full rounded-lg px-3 py-2 text-left hover:bg-slate-50">Search settings</button><button className="w-full rounded-lg px-3 py-2 text-left hover:bg-slate-50">Language</button></div>}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1320px] px-5 py-8 lg:px-8 lg:py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,760px)_minmax(290px,1fr)] lg:gap-20">
          <section>
            <div className="mb-7 flex items-center justify-between gap-4">
              <p className="text-[13px] text-slate-500">About 24,800,000 results <span className="mx-1 text-slate-300">·</span> 0.32 seconds</p>
              <button className="flex items-center gap-1.5 text-[13px] font-medium text-slate-600 hover:text-slate-950"><Clock3 size={15} /> Recent</button>
            </div>

            <article className="mb-9 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_7px_24px_rgba(15,23,42,0.04)]">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-700"><span className="grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br from-cyan-400 to-blue-600 text-[11px] text-white"><Sparkles size={13} /></span> Progler Overview</div>
                <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700">AI generated</span>
              </div>
              <div className="px-5 py-5 sm:px-6">
                <p className="text-[15px] leading-7 text-slate-700"><strong className="font-semibold text-slate-950">Cristiano Ronaldo</strong> is a Portuguese professional footballer widely regarded as one of the greatest players of all time. He plays as a forward and is known for his remarkable goal-scoring record, athleticism, and longevity.</p>
                <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                  {['Born: February 5, 1985', 'Portugal', 'Forward'].map((item) => <span key={item} className="rounded-full bg-slate-50 px-3 py-1.5 text-[12px] text-slate-600">{item}</span>)}
                </div>
                <p className="mt-4 text-[12px] text-slate-400">Information synthesized from 12 sources <span className="mx-1">·</span> <button className="font-medium text-slate-500 underline underline-offset-2">Learn more</button></p>
              </div>
            </article>

            {resultData.map((result) => <article key={result.title} className="group mb-8"><div className="mb-1.5 flex items-center gap-2 text-[12px] text-slate-500"><span className={`grid h-6 w-6 place-items-center rounded-md ${result.accent} text-[10px] font-bold text-slate-700`}>{result.mark}</span><span>{result.url}</span><button className="opacity-0 transition group-hover:opacity-100" aria-label="Result options"><MoreHorizontal size={15} /></button></div><a href="#" className="flex items-start gap-2"><h2 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-900 underline decoration-transparent underline-offset-4 transition group-hover:text-blue-700 group-hover:decoration-blue-200">{result.title}</h2><ArrowUpRight size={16} className="mt-1 shrink-0 text-slate-300 transition group-hover:text-blue-500" /></a><p className="mt-2 text-[14px] leading-6 text-slate-600">{result.description}</p></article>)}

            <div className="border-t border-slate-200 pt-7"><h3 className="mb-4 text-[15px] font-semibold">People also search for</h3><div className="grid gap-2 sm:grid-cols-2">{related.map((item) => <button key={item} onClick={() => setQuery(item)} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-[13px] text-slate-700 transition hover:border-slate-400 hover:shadow-sm"><Search size={15} className="text-slate-400" />{item}<ArrowUpRight size={14} className="ml-auto text-slate-300" /></button>)}</div></div>
          </section>

          <aside className="hidden lg:block">
            <div className="sticky top-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_7px_24px_rgba(15,23,42,0.04)]">
              <div className="mb-5 flex items-start justify-between"><div><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Knowledge panel</p><h2 className="mt-1 text-xl font-semibold tracking-[-0.03em]">Cristiano Ronaldo</h2></div><div className="grid h-11 w-11 place-items-center rounded-xl bg-slate-950 text-lg font-bold text-white">CR</div></div>
              <div className="grid grid-cols-2 gap-2 border-y border-slate-100 py-4 text-[12px]"><div><p className="text-slate-400">Full name</p><p className="mt-1 font-medium text-slate-700">Cristiano Ronaldo dos Santos Aveiro</p></div><div><p className="text-slate-400">Nationality</p><p className="mt-1 font-medium text-slate-700">Portuguese</p></div></div>
              <dl className="space-y-4 py-5 text-[13px]"><div className="flex justify-between gap-4"><dt className="text-slate-400">Born</dt><dd className="font-medium">February 5, 1985</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-400">Height</dt><dd className="font-medium">1.87 m</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-400">Current club</dt><dd className="font-medium">Al-Nassr</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-400">Position</dt><dd className="font-medium">Forward</dd></div></dl>
              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 py-2.5 text-[13px] font-medium text-slate-700 transition hover:bg-slate-100">View full profile <ExternalLink size={14} /></button>
            </div>
            <div className="mt-5 rounded-2xl bg-slate-950 p-5 text-white"><div className="mb-5 flex items-center gap-2 text-sm font-medium"><span className="grid h-7 w-7 place-items-center rounded-lg bg-cyan-400 text-slate-950"><Sparkles size={15} /></span> Progler Labs</div><p className="text-[15px] font-medium leading-6">Search that understands what you mean.</p><p className="mt-2 text-[12px] leading-5 text-slate-400">Our independent index combines live sources with useful context, without the noise.</p><button className="mt-5 flex items-center gap-1 text-[12px] font-semibold text-cyan-300">Explore Labs <ArrowUpRight size={14} /></button></div>
          </aside>
        </div>
      </main>
      <footer className="mt-10 border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-[1320px] flex-col gap-3 px-5 py-6 text-[12px] text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-8"><span>© 2026 Progler Search</span><div className="flex gap-5"><a href="#privacy" className="hover:text-slate-700">Privacy</a><a href="#terms" className="hover:text-slate-700">Terms</a><a href="#feedback" className="hover:text-slate-700">Send feedback</a></div></div></footer>
    </div>
  )
}

export { resultData }

