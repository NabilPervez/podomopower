export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'space-indigo': '#21295c',
                'regal-navy': '#1b3b6f',
                'baltic-blue': '#065a82',
                'cerulean': '#1c7293',
                'powder-blue': '#9eb3c2',
                'off-white': '#F8F9FA',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
