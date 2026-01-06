import { useState, useEffect, useRef } from 'react';

export default function SoundControl() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const audioContextRef = useRef(null);
    const gainNodeRef = useRef(null);
    const noiseNodeRef = useRef(null);

    useEffect(() => {
        // Cleanup on unmount
        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    useEffect(() => {
        if (isPlaying) {
            if (!audioContextRef.current) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                audioContextRef.current = new AudioContext();
            }

            const ctx = audioContextRef.current; // Re-use context if suspended?
            if (ctx.state === 'suspended') {
                ctx.resume();
            }

            // Create Brown Noise
            const bufferSize = 4096;
            const brownNoise = ctx.createScriptProcessor(bufferSize, 1, 1);

            let lastOut = 0;
            brownNoise.onaudioprocess = (e) => {
                const output = e.outputBuffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    const white = Math.random() * 2 - 1;
                    output[i] = (lastOut + (0.02 * white)) / 1.02;
                    lastOut = output[i];
                    output[i] *= 3.5; // Compensate for gain
                }
            };

            const gainNode = ctx.createGain();
            gainNode.gain.value = volume;

            brownNoise.connect(gainNode);
            gainNode.connect(ctx.destination);

            noiseNodeRef.current = brownNoise;
            gainNodeRef.current = gainNode;

        } else {
            if (noiseNodeRef.current) {
                noiseNodeRef.current.disconnect();
                noiseNodeRef.current = null;
            }
            if (gainNodeRef.current) {
                gainNodeRef.current.disconnect();
                gainNodeRef.current = null;
            }
            if (audioContextRef.current) {
                audioContextRef.current.suspend();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        if (gainNodeRef.current) {
            gainNodeRef.current.gain.value = volume;
        }
    }, [volume]);

    const toggleSound = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="bg-white/90 backdrop-blur rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <button
                    onClick={toggleSound}
                    className={`p-3 rounded-full transition-colors ${isPlaying
                            ? 'bg-islamic-green text-white'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                    aria-label={isPlaying ? "Stop Brown Noise" : "Play Brown Noise"}
                >
                    {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                    )}
                </button>
                <div>
                    <h3 className="font-semibold text-slate-700">Focus Noise</h3>
                    <p className="text-xs text-slate-500">Brown Noise for Deep Focus</p>
                </div>
            </div>

            <div className="flex items-center gap-2 w-32">
                <span className="text-xs text-slate-400">Vol</span>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-islamic-green"
                />
            </div>
        </div>
    );
}
