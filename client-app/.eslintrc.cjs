module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended", // Keep TypeScript recommended rules for compile-time checks
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": "./tsconfig.json" // Ensure ESLint uses your TypeScript config for type-checking
    },
    "plugins": [
        "@typescript-eslint",
        "react"
    ],
    "rules": {
        "@typescript-eslint/no-unused-vars": "off", // for TypeScript files
        "react/react-in-jsx-scope": "off",
        // Examples of turning off or adjusting specific rules:
        "react/prop-types": "off", // Since TypeScript handles types for props, you might not need this

        "no-console": "warn", // Turn off or set to 'warn' if console statements are not critical errors in your project
        // Add or remove rules as needed to fit your project's needs
    }
};
