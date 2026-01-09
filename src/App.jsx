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
