/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // 기존 'tailwindcss'에서 이 명칭으로 변경
    'autoprefixer': {},
  },
};

export default config;