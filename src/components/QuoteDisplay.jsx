import { useState, useEffect } from 'react';
import { quotes } from '../data/quotes';

export default function QuoteDisplay({ className = "" }) {
    const [quote, setQuote] = useState(quotes[0]);

    useEffect(() => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);

        const interval = setInterval(() => {
            const nextQuote = quotes[Math.floor(Math.random() * quotes.length)];
            setQuote(nextQuote);
        }, 60000); // Change quote every minute

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`text-center p-6 bg-regal-navy/80 backdrop-blur-sm rounded-xl shadow-sm border border-cerulean/50 flex flex-col justify-center items-center h-full w-full ${className}`}>
            <p className="text-xl md:text-2xl font-serif text-powder-blue mb-4 leading-relaxed">
                "{quote.text}"
            </p>
            <p className="text-sm text-cerulean font-medium uppercase tracking-wider">
                — {quote.source}
            </p>
        </div>
    );
}
