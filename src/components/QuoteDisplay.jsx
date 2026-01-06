import { useState, useEffect } from 'react';
import { quotes } from '../data/quotes';

export default function QuoteDisplay() {
    const [quote, setQuote] = useState(quotes[0]);

    useEffect(() => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);

        const interval = setInterval(() => {
            const nextQuote = quotes[Math.floor(Math.random() * quotes.length)];
            setQuote(nextQuote);
        }, 60000); // Change quote every minute or on pomodoro complete potentially

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-islamic-green/10 max-w-2xl mx-auto my-8">
            <p className="text-xl md:text-2xl font-serif text-islamic-green mb-4 leading-relaxed">
                "{quote.text}"
            </p>
            <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">
                — {quote.source}
            </p>
        </div>
    );
}
