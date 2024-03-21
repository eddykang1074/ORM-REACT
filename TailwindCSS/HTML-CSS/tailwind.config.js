/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"], //해당 파일형식들에 적용된 tailwind class만 번들링 대상이 되어 최종 css파일을 경량화시킴
  theme: {
    extend: {},
  },
  plugins: [],
};
