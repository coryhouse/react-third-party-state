module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    // "plugin:@typescript-eslint/strict",
    // "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:react-query/recommended",
  ],
  plugins: [
    "react",
    "react-hooks",
    "eslint-plugin-react-compiler",
    // "@typescript-eslint",
    "@tanstack/query",
  ],
  rules: {
    "react-compiler/react-compiler": "error",
  },
};
