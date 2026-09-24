'use client'

import { FormEvent, useState } from 'react'
import { Camera, Grid3X3, ImageIcon, Mic, Moon, Plus, Search, Sun, X } from 'lucide-react'

function normalizeQuery(value: string) {
  return value.trim().replace(/\s+/g, ' ')
}

const modes = ['Web', 'News', 'Images', 'AI']
const trending = ['AI & Technology', 'Global Markets', 'World News', 'Science', 'Sports']

export function ProglerSearch({ shortcuts }: { shortcuts: string[] }) {
  const [query, setQuery] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [dark, setDark] = useState(true)
  const [notice, setNotice] = useState('')
  const [mode, setMode] = useState('Web')
  const [showShortcutForm, setShowShortcutForm] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [shortcutName, setShortcutName] = useState('')
  const [shortcutUrl, setShortcutUrl] = useState('')
  const [customShortcuts, setCustomShortcuts] = useState<string[]>([])

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const cleanQuery = normalizeQuery(query)
    if (!cleanQuery) { setNotice('Type something to search Progler.'); return }
    setSubmittedQuery(cleanQuery)
    setNotice(mode === 'AI' ? `Exploring AI for “${cleanQuery}”` : `Searching Progler for “${cleanQuery}”`)
  }

  function addShortcut(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const cleanName = normalizeQuery(shortcutName)
    if (!cleanName) return
    setCustomShortcuts((current) => current.includes(cleanName) ? current : [...current, cleanName])
    setShortcutName('')
    setShortcutUrl('')
    setShowShortcutForm(false)
  }

  function chooseAction(action: 'search' | 'ai') {
    setMode(action === 'ai' ? 'AI' : 'Web')
    const cleanQuery = normalizeQuery(query)
    if (!cleanQuery) { setNotice(action === 'ai' ? 'Ask Progler AI anything.' : 'Type something to search Progler.'); return }
    setSubmittedQuery(cleanQuery)
    setNotice(action === 'ai' ? `Exploring AI for “${cleanQuery}”` : `Searching Progler for “${cleanQuery}”`)
  }

  return (
    <main className={`progler-home ${dark ? 'progler-dark' : 'progler-light'}`}>
      <header className="progler-header">
        <nav className="progler-nav" aria-label="Primary navigation">
          <div className="progler-nav-links"><a href="#about">About</a><a href="#store">Store</a></div>
          <div className="progler-nav-actions">
            <a href="#mail">Mail</a><a href="#images">Images</a>
            <button className="icon-button" aria-label="Open Progler apps" title="Progler apps" type="button"><Grid3X3 size={19} /></button>
            <div className="profile-wrap">
              <button className="avatar" aria-label="Open account menu" aria-expanded={showProfile} type="button" onClick={() => setShowProfile((value) => !value)}>P</button>
              {showProfile && <div className="profile-menu" role="menu"><strong>Welcome to Progler</strong><span>Account settings coming soon</span></div>}
            </div>
          </div>
        </nav>
      </header>

      <section className="progler-center" aria-label="Progler search">
        <div className="progler-wordmark" aria-label="Progler">Progler</div>
        <p className="tagline">Search the web, intelligently.</p>
        <form className="search-form" onSubmit={submitSearch} role="search">
          <Search className="search-leading" size={20} aria-hidden="true" />
          <input aria-label="Search Progler" autoComplete="off" value={query} onChange={(event) => { setQuery(event.target.value); setNotice('') }} placeholder="Search Progler or type a URL" />
          {query && <button type="button" className="search-action" aria-label="Clear search" onClick={() => setQuery('')}><X size={18} /></button>}
          <button type="button" className="search-action" aria-label="Voice search" onClick={() => setNotice('Voice search is ready for a future connection.')}><Mic size={20} /></button>
          <button type="button" className="search-action" aria-label="Search by image" onClick={() => setNotice('Image search is ready for a future connection.')}><Camera size={20} /></button>
        </form>
        <div className="search-modes" role="tablist" aria-label="Search modes">
          {modes.map((item) => <button key={item} role="tab" aria-selected={mode === item} className={mode === item ? 'active' : ''} type="button" onClick={() => setMode(item)}>{item === 'Images' && <ImageIcon size={14} />} {item}</button>)}
        </div>
        <div className="search-buttons"><button className="primary-action" type="button" onClick={() => chooseAction('search')}>Search with Progler</button><button type="button" onClick={() => chooseAction('ai')}>Explore AI</button></div>

        <section className="shortcut-section" aria-labelledby="shortcut-title">
          <div className="shortcut-heading"><span id="shortcut-title">Shortcuts</span><button className="add-shortcut" type="button" onClick={() => setShowShortcutForm(true)}><Plus size={15} aria-hidden="true" /> Add shortcut</button></div>
          {showShortcutForm && <form className="shortcut-popover" onSubmit={addShortcut}><div className="popover-title">Add shortcut <button type="button" aria-label="Close shortcut form" onClick={() => setShowShortcutForm(false)}><X size={16} /></button></div><input aria-label="Shortcut name" value={shortcutName} onChange={(event) => setShortcutName(event.target.value)} placeholder="Shortcut name" autoFocus /><input aria-label="Shortcut URL" value={shortcutUrl} onChange={(event) => setShortcutUrl(event.target.value)} placeholder="URL (optional)" type="url" /><div className="popover-actions"><button type="button" onClick={() => setShowShortcutForm(false)}>Cancel</button><button className="confirm" type="submit">Add shortcut</button></div></form>}
          <div className="shortcut-grid" aria-label="Popular shortcuts">{[...shortcuts, ...customShortcuts].map((shortcut) => <button className="shortcut" type="button" key={shortcut} onClick={() => setQuery(shortcut)}><span className="shortcut-icon">{shortcut[0]}</span><span>{shortcut}</span></button>)}</div>
        </section>

        <section className="trending" aria-labelledby="trending-title"><span id="trending-title">Trending searches</span><div>{trending.map((item) => <button key={item} type="button" onClick={() => setQuery(item)}>{item}</button>)}</div></section>
        <div className="system-row"><span><i /> Demo environment</span><span>~80 ms response</span></div>
        <p className="language-line">Progler offered in <a href="#hindi">हिन्दी</a><a href="#english">English</a></p>
        {(notice || submittedQuery) && <p className="search-feedback" role="status">{notice}</p>}
      </section>

      <footer className="progler-footer"><span>India</span><div className="footer-right"><a href="#privacy">Privacy</a><a href="#terms">Terms</a><a href="#settings">Settings</a><button onClick={() => setDark(!dark)} aria-label={dark ? 'Use light theme' : 'Use dark theme'} type="button">{dark ? <Sun size={15} /> : <Moon size={15} />}</button></div></footer>
    </main>
  )
}
