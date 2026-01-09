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
    <div className="min-h-screen bg-space-indigo flex flex-col items-center justify-start p-4 pt-12 relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cerulean to-powder-blue" />



      <main className="w-full max-w-6xl z-10 grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
        <Timer
          onTimerStart={handleTimerStart}
          onTimerStop={handleTimerStop}
          className="md:col-span-2 md:row-span-2 min-h-[400px]"
        />
        <QuoteDisplay className="md:col-span-1 md:row-span-1 min-h-[200px]" />
        <SoundControl
          externalPlayingState={isSoundPlaying}
          onToggleExternal={setIsSoundPlaying}
          className="md:col-span-1 md:row-span-1 min-h-[200px]"
        />

        <div className="md:col-span-3 text-center text-sm text-powder-blue mt-8">
          Designed to help you focus for the sake of Allah.
          <p className="text-xs opacity-60 mt-1">Podomo - Waqt Focus</p>
        </div>
      </main>

    </div>
  )
}

export default App
