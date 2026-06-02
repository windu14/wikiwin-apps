/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ['CourierPrime_400Regular'],
        courierBold: ['CourierPrime_700Bold'],
      }
    },
  },
  plugins: [],
}
