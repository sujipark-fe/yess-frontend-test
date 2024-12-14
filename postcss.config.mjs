module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: ['>0.2%', "not dead", "not op_mini all"],
    }),
  ],
  overrides: [
    {
      files: ['src/**/*.{js,ts,jsx,tsx}'],
      customSyntax: 'postcss-styled-syntax',
    },
  ],
};
