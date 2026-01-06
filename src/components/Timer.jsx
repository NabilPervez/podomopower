import { useState, useEffect, useRef } from 'react';

const MODES = {
    pomodoro: { label: 'Pomodoro', time: 25 * 60, color: 'bg-islamic-green' },
    shortBreak: { label: 'Short Break', time: 5 * 60, color: 'bg-teal-600' },
    longBreak: { label: 'Long Break', time: 15 * 60, color: 'bg-blue-600' },
};

export default function Timer({ onTimerStart, onTimerStop }) {
    const [mode, setMode] = useState('pomodoro');
    const [timeLeft, setTimeLeft] = useState(MODES.pomodoro.time);
    const [isRunning, setIsRunning] = useState(false);

    const timerRef = useRef(null);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            onTimerStop && onTimerStop(); // Notify stop

            // Play sound or notify
            if (Notification.permission === 'granted') {
                new Notification("Time's up!", { body: `Your ${MODES[mode].label} session has finished.` });
            }
        }

        return () => clearInterval(timerRef.current);
    }, [isRunning, timeLeft, mode]);

    useEffect(() => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);

    const switchMode = (newMode) => {
        setMode(newMode);
        setTimeLeft(MODES[newMode].time);
        setIsRunning(false);
        onTimerStop && onTimerStop();
    };

    const toggleTimer = () => {
        const nextState = !isRunning;
        setIsRunning(nextState);
        if (nextState) {
            onTimerStart && onTimerStart();
        } else {
            onTimerStop && onTimerStop();
        }
    };

    const resetTimer = () => {
        setIsRunning(false);
        onTimerStop && onTimerStop();
        setTimeLeft(MODES[mode].time);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const progress = ((MODES[mode].time - timeLeft) / MODES[mode].time) * 100;

    return (
        <div className="w-full max-w-md mx-auto bg-slate-800 rounded-3xl shadow-xl overflow-hidden border-2 border-slate-700">
            <div className="flex p-2 bg-slate-900/50 justify-between">
                {Object.keys(MODES).map((key) => (
                    <button
                        key={key}
                        onClick={() => switchMode(key)}
                        className={`flex-1 py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${mode === key
                                ? `${MODES[key].color} text-white shadow-md transform -translate-y-0.5`
                                : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                            }`}
                    >
                        {MODES[key].label}
                    </button>
                ))}
            </div>

            <div className="p-10 text-center relative">
                {/* Progress Ring Background */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    {/* Can add Islamic pattern SVG here later */}
                </div>

                <div className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-islamic-green to-islamic-gold mb-8 font-mono tracking-tighter">
                    {formatTime(timeLeft)}
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={toggleTimer}
                        className={`px-8 py-4 rounded-2xl text-xl font-bold text-white shadow-lg transform active:scale-95 transition-all ${isRunning ? 'bg-slate-700 hover:bg-slate-600' : 'bg-islamic-green hover:bg-green-700'
                            }`}
                    >
                        {isRunning ? 'PAUSE' : 'START'}
                    </button>

                    <button
                        onClick={resetTimer}
                        className="px-6 py-4 rounded-2xl text-xl font-bold text-slate-400 bg-slate-900 hover:bg-slate-700 transition-all"
                    >
                        ↺
                    </button>
                </div>
            </div>

            {/* Progress Bar Line */}
            <div className="h-2 bg-slate-900 w-full">
                <div
                    className={`h-full transition-all duration-1000 ease-linear ${MODES[mode].color}`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
