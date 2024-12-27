module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
      jest: true,
    },
    parser: "@babel/eslint-parser",
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      requireConfigFile: false,
      ecmaVersion: 12,
      sourceType: "module",
      babelOptions: {
        presets: ["@babel/preset-react"],
      },
    },
  
    extends: ["eslint:recommended", "plugin:react/recommended"],
  
    plugins: ["react", "react-hooks"],
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "warn",
      "no-console": "warn",
      "no-unused-vars": "warn",
      "react/react-in-jsx-scope": "off",
    },
  };
  