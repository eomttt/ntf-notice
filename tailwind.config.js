module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      transitionModalProperty: {
        opacity: 'opacity',
        transform: 'transform',
      },
      colors: {
        primary: '#42F8EA',
        modalBg: 'rgba(113, 118, 123, 0.54)',
      },
      minWidth: {
        24: '6rem',
      },
    },
  },
  plugins: [],
};
