import { useState } from 'react'
import Timer from './components/Timer'
import QuoteDisplay from './components/QuoteDisplay'
import SoundControl from './components/SoundControl'

function App() {
  return (
    <div className="min-h-screen bg-off-white flex flex-col items-center justify-center p-4 relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-islamic-green to-islamic-gold" />

      <header className="mb-8 text-center z-10">
        <div className="inline-block p-4 rounded-full bg-white shadow-sm mb-4">
          <img src="/pwa-192x192.png" alt="Logo" className="w-16 h-16 object-contain" />
        </div>
        <h1 className="text-4xl font-bold text-slate-800 tracking-tight mb-2">
          <span className="text-islamic-green">Waqt</span> Focus
        </h1>
        <p className="text-slate-500 max-w-md mx-auto">
          "Time is like a sword; if you do not cut it, it will cut you." — Imam Shafi'i
        </p>
      </header>

      <main className="w-full max-w-3xl z-10 flex flex-col gap-8">
        <Timer />
        <QuoteDisplay />
        <SoundControl />

        {/* Task List Placeholder or Features */}
        <div className="text-center text-sm text-slate-400 mt-8">
          Designed to help you focus for the sake of Allah.
        </div>
      </main>

    </div>
  )
}

export default App
