module.exports = {
  extends: ["turbo", "prettier", "plugin:import/recommended"],
  rules: {
    "import/no-duplicates": ["error", { considerQueryString: true }],
  },
};
