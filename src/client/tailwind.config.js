/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  content: [
    path.join(__dirname, './pages/**/*.{js,ts,jsx,tsx}'),
    path.join(__dirname, './components/**/*.{js,ts,jsx,tsx}'),
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  theme: {},
  plugins: [require('daisyui')],
};
