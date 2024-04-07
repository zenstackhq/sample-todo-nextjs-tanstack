/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui'), require('@tailwindcss/line-clamp')],
    daisyui: {
        themes: ['light'],
    },
};
