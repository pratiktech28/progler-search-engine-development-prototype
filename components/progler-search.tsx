'use client'

import { FormEvent, useState } from 'react'
import { Camera, Grid3X3, Mic, Moon, Search, Sun } from 'lucide-react'

export function ProglerSearch() {
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [dark, setDark] = useState(true)

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (query.trim()) setSubmitted(true)
  }

  function runSearch() {
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
            <button className="icon-button" aria-label="Progler apps"><Grid3X3 size={20} /></button>
            <button className="avatar" aria-label="Account">P</button>
          </div>
        </nav>
      </header>

      <section className="progler-center" aria-label="Progler search">
        <div className="progler-wordmark" aria-label="Progler">Progler</div>
        <form className="search-form" onSubmit={submitSearch} role="search">
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
          <button type="button" onClick={runSearch}>Progler Search</button>
          <button type="button" onClick={runSearch}>Explore AI</button>
        </div>
        <p className="language-line">Progler offered in <a href="#hindi">हिन्दी</a> <a href="#english">English</a></p>
        {submitted && query.trim() && <p className="search-feedback">Searching Progler for &quot;{query.trim()}&quot;</p>}
      </section>

      <footer className="progler-footer">
        <span>India</span>
        <div className="footer-right">
          <a href="#privacy">Privacy</a><a href="#terms">Terms</a><a href="#settings">Settings</a>
          <button onClick={() => setDark(!dark)} aria-label={dark ? 'Use light theme' : 'Use dark theme'}>{dark ? <Sun size={15} /> : <Moon size={15} />}</button>
        </div>
      </footer>
    </main>
  )
}
