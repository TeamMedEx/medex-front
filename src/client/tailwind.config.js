/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
   mode: 'jit',
   content: [
      path.join(__dirname, './pages/**/*.{js,ts,jsx,tsx}'),
      path.join(__dirname, './components/**/*.{js,ts,jsx,tsx}'),
      path.join(
         __dirname,
         '../../node_modules/react-daisyui/dist/react-daisyui.cjs',
      ),
      path.join(__dirname, '../../node_modules/daisyui/dist/**/*'),
   ],
   theme: {
      fontFamily: {
         nunito: ['poppins', 'sans-serif'],
      },
   },
   plugins: [require('daisyui')],
};
