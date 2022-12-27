module.exports = {
  root: true,
  extends: ["custom"],
  settings: {
    next: {
      rootDir: ["apps/webapp/"],
    },
  },
  rules: {
    "no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", ignoreRestSiblings: true },
    ],
  },
};
