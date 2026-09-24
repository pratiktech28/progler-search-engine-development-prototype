'use client'

import { FormEvent, useState } from 'react'
import { Camera, Grid3X3, Mic, Moon, Plus, Search, Sun, X } from 'lucide-react'

function normalizeQuery(value: string) {
  return value.trim().replace(/\s+/g, ' ')
}

export function ProglerSearch({ shortcuts }: { shortcuts: string[] }) {
  const [query, setQuery] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [dark, setDark] = useState(true)
  const [notice, setNotice] = useState('')
  const [showShortcutForm, setShowShortcutForm] = useState(false)
  const [shortcutName, setShortcutName] = useState('')
  const [customShortcuts, setCustomShortcuts] = useState<string[]>([])

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const cleanQuery = normalizeQuery(query)
    if (!cleanQuery) {
      setNotice('Type something to search Progler.')
      return
    }
    setSubmittedQuery(cleanQuery)
    setNotice('')
  }

  function addShortcut(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const cleanName = normalizeQuery(shortcutName)
    if (!cleanName) return
    setCustomShortcuts((current) => current.includes(cleanName) ? current : [...current, cleanName])
    setShortcutName('')
    setShowShortcutForm(false)
  }

  function chooseAction(action: 'search' | 'ai') {
    const cleanQuery = normalizeQuery(query)
    if (!cleanQuery) {
      setNotice(action === 'ai' ? 'Ask Progler AI anything.' : 'Type something to search Progler.')
      return
    }
    setSubmittedQuery(cleanQuery)
    setNotice(action === 'ai' ? `Exploring AI for “${cleanQuery}”` : '')
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
            <button className="icon-button" aria-label="Open Progler apps" type="button"><Grid3X3 size={20} /></button>
            <button className="avatar" aria-label="Open account" type="button">P</button>
          </div>
        </nav>
      </header>

      <section className="progler-center" aria-label="Progler search">
        <div className="progler-wordmark" aria-label="Progler">Progler</div>
        <form className="search-form" onSubmit={submitSearch} role="search">
          <Search className="search-leading" size={21} aria-hidden="true" />
          <input
            aria-label="Search Progler"
            autoComplete="off"
            value={query}
            onChange={(event) => { setQuery(event.target.value); setNotice('') }}
            placeholder="Search Progler or type a URL"
          />
          {query && <button type="button" className="search-action" aria-label="Clear search" onClick={() => setQuery('')}><X size={19} /></button>}
          <button type="button" className="search-action" aria-label="Voice search" onClick={() => setNotice('Voice search is ready for a future connection.')}><Mic size={21} /></button>
          <button type="button" className="search-action" aria-label="Search by image" onClick={() => setNotice('Image search is ready for a future connection.')}><Camera size={21} /></button>
        </form>
        <div className="shortcut-section">
          <div className="shortcut-heading">
            <span>Shortcuts</span>
            <button className="add-shortcut" type="button" onClick={() => setShowShortcutForm((current) => !current)} aria-expanded={showShortcutForm}>
              <Plus size={16} aria-hidden="true" />
              <span>Add shortcut</span>
            </button>
          </div>
          {showShortcutForm && (
            <form className="shortcut-form" onSubmit={addShortcut}>
              <input aria-label="Shortcut name" value={shortcutName} onChange={(event) => setShortcutName(event.target.value)} placeholder="Shortcut name" autoFocus />
              <button type="submit">Add</button>
            </form>
          )}
          <div className="shortcut-grid" aria-label="Popular shortcuts">
            {[...shortcuts, ...customShortcuts].map((shortcut) => <button className="shortcut" type="button" key={shortcut} onClick={() => setQuery(shortcut)}><span className="shortcut-icon">{shortcut[0]}</span><span>{shortcut}</span></button>)}
          </div>
        </div>
        <div className="search-buttons">
          <button type="button" onClick={() => chooseAction('search')}>Progler Search</button>
          <button type="button" onClick={() => chooseAction('ai')}>Explore AI</button>
        </div>
        <p className="language-line">Progler offered in <a href="#hindi">हिन्दी</a> <a href="#english">English</a></p>
        {(notice || submittedQuery) && <p className="search-feedback" role="status">{notice || `Searching Progler for “${submittedQuery}”`}</p>}
      </section>

      <footer className="progler-footer">
        <span>India</span>
        <div className="footer-right">
          <a href="#privacy">Privacy</a><a href="#terms">Terms</a><a href="#settings">Settings</a>
          <button onClick={() => setDark(!dark)} aria-label={dark ? 'Use light theme' : 'Use dark theme'} type="button">{dark ? <Sun size={15} /> : <Moon size={15} />}</button>
        </div>
      </footer>
    </main>
  )
}
