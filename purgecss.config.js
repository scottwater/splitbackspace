module.exports = {
  content: ["./dist/**/*.html"],
  css: ["./dist/assets/*.css"],
  options: {
    whitelist: ["playing", "track", "stop-button", "play-button"],
  },
  extractors: [
    {
      extractor: function (content) {
        return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
      },
      extensions: ["html"],
    },
  ],
};
