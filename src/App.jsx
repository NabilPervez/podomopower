import { useState } from 'react'
import Timer from './components/Timer'
import QuoteDisplay from './components/QuoteDisplay'
import SoundControl from './components/SoundControl'

function App() {
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);

  const handleTimerStart = () => {
    setIsSoundPlaying(true);
  };

  const handleTimerStop = () => {
    setIsSoundPlaying(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-start p-4 pt-12 relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-islamic-green to-islamic-gold" />

      <header className="mb-8 text-center z-10">
        <div className="inline-block p-4 rounded-full bg-slate-900 shadow-lg border border-slate-800 mb-4">
          <img src="/pwa-192x192.png" alt="Logo" className="w-16 h-16 object-contain" />
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
          <span className="text-islamic-green">Waqt</span> Focus
        </h1>
      </header>

      <main className="w-full max-w-3xl z-10 flex flex-col gap-6">
        <Timer onTimerStart={handleTimerStart} onTimerStop={handleTimerStop} />
        <QuoteDisplay />
        <SoundControl externalPlayingState={isSoundPlaying} onToggleExternal={setIsSoundPlaying} />


        <div className="text-center text-sm text-slate-500 mt-8">
          Designed to help you focus for the sake of Allah.
        </div>
      </main>

    </div>
  )
}

export default App
