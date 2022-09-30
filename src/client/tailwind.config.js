/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  content: [
    path.join(__dirname, './pages/**/*.{js,ts,jsx,tsx}'),
    path.join(__dirname, './components/**/*.{js,ts,jsx,tsx}'),
    path.join(
      __dirname,
      '../../node_modules/react-daisyui/dist/react-daisyui.cjs',
    ),
    path.join(__dirname, '../../node_modules/daisyui/dist/**/*'),
  ],
  theme: {},
  plugins: [require('daisyui')],
};
