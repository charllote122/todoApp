/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}", // Ensures Tailwind scans your React components
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
