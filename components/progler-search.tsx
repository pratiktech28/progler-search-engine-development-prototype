'use client'

import { FormEvent, useState } from 'react'
import { Camera, Grid3X3, Mic, Moon, Plus, Search, Sparkles, Sun } from 'lucide-react'

const shortcuts = [
  { label: 'GitHub', mark: '◉' },
  { label: 'YouTube', mark: '▶', tone: 'text-red-500' },
  { label: 'Figma', mark: 'F', tone: 'text-fuchsia-300' },
  { label: 'NotebookLM', mark: 'G', tone: 'text-blue-400' },
  { label: 'Chatgpt', mark: '◎', tone: 'text-white' },
  { label: 'Leetcode', mark: '↗', tone: 'text-amber-300' },
]

export function ProglerSearch() {
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [dark, setDark] = useState(true)

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (query.trim()) setSubmitted(true)
  }

  return (
    <main className={`progler-home ${dark ? 'progler-dark' : 'progler-light'}`}>
      <header className="progler-header">
        <nav className="progler-nav" aria-label="Primary navigation">
          <div className="progler-nav-links">
            <a href="#about">About</a>
            <a href="#store">Store</a>
          </div>
          <div className="progler-nav-actions">
            <a href="#mail">Mail</a>
            <a href="#images">Images</a>
            <button className="icon-button" aria-label="Progler apps"><Grid3X3 size={20} strokeWidth={2.2} /></button>
            <button className="avatar" aria-label="Account">P</button>
          </div>
        </nav>
      </header>

      <section className="progler-center" aria-label="Progler search">
        <div className="progler-wordmark" aria-label="Progler">progler</div>
        <form className="search-form" onSubmit={submitSearch}>
          <Search className="search-leading" size={21} aria-hidden="true" />
          <input
            aria-label="Search Progler"
            value={query}
            onChange={(event) => { setQuery(event.target.value); setSubmitted(false) }}
            placeholder="Search Progler or type a URL"
          />
          <button type="button" className="search-action" aria-label="Voice search"><Mic size={21} /></button>
          <button type="button" className="search-action" aria-label="Search by image"><Camera size={21} /></button>
        </form>
        <div className="search-buttons">
          <button onClick={() => setSubmitted(true)}>Progler Search</button>
          <button onClick={() => setSubmitted(true)}>I&apos;m Feeling Lucky</button>
        </div>
        <p className="language-line">Progler offered in <a href="#hindi">हिन्दी</a> <a href="#english">English</a></p>

        <div className="feature-row">
          <button className="feature-card" onClick={() => setQuery('')}>
            <span className="feature-icon"><Sparkles size={19} /></span>
            <span><strong>Do more with Progler AI</strong><small>Ask, create, summarize</small></span>
          </button>
          <button className="feature-card" onClick={() => setQuery('Create images')}>
            <span className="feature-icon warm">✦</span>
            <span><strong>Create images</strong><small>Imagine, illustrate, edit</small></span>
          </button>
        </div>

        <div className="shortcut-grid">
          {shortcuts.map((shortcut) => (
            <button className="shortcut" key={shortcut.label} onClick={() => setQuery(shortcut.label)}>
              <span className={`shortcut-icon ${shortcut.tone ?? ''}`}>{shortcut.mark}</span>
              <span>{shortcut.label}</span>
            </button>
          ))}
          <button className="shortcut" onClick={() => setQuery('')}>
            <span className="shortcut-icon"><Plus size={20} /></span>
            <span>Add shortcut</span>
          </button>
        </div>

        {submitted && query.trim() && <p className="search-feedback">Searching Progler for “{query.trim()}”</p>}
      </section>

      <footer className="progler-footer">
        <div className="footer-left"><span>India</span></div>
        <div className="footer-right">
          <a href="#privacy">Privacy</a><a href="#terms">Terms</a><a href="#settings">Settings</a>
          <button onClick={() => setDark(!dark)} aria-label={dark ? 'Use light theme' : 'Use dark theme'}>{dark ? <Sun size={15} /> : <Moon size={15} />}</button>
        </div>
      </footer>
    </main>
  )
}

export { shortcuts }
