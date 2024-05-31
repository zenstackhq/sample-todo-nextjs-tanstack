module.exports = {
	rules: {
		curly: 1,
		eqeqeq: 1,
		latedef: 0,
		newcap: 0,
		noarg: 0,
		strict: 0,
		"no-trailing-spaces": 1,
		"no-unexpected-multiline": 1,
		"no-cond-assign": 1,
		"no-console": 1,
		"no-debugger": 1,
		"no-dupe-args": 1,
		"no-dupe-keys": 1,
		"no-duplicate-case": 1,
		"no-empty": 1,
		"no-ex-assign": 1,
		"no-extra-boolean-cast": 1,
		"no-extra-parens": 0,
		"no-extra-semi": 1,
		"no-invalid-regexp": 1,
		"no-irregular-whitespace": 1,
		"no-sparse-arrays": 1,
		"no-unreachable": 1,
		"no-unsafe-finally": 1,
		"no-unsafe-negation": 1,
		"use-isnan": 1,
		"valid-jsdoc": 0,
		"valid-typeof": 1,
		"block-scoped-var": 1,
		"class-methods-use-this": 0,
		complexity: 0,
		"consistent-return": 1,
		"default-case": 1,
		"dot-location": ["error", "property"],
		"dot-notation": 1,
		"no-alert": 1,
		"no-case-declarations": 1,
		"no-else-return": 1,
		"no-extra-bind": 1,
		"no-implicit-globals": 0,
		"no-invalid-this": 1,
		"no-lone-blocks": 1,
		"no-loop-func": 1,
		"no-multi-spaces": 0,
		"no-new": 1,
		"no-octal": 1,
		"no-redeclare": 0,
		"no-return-assign": 1,
		"no-self-assign": 1,
		"no-self-compare": 1,
		"no-sequences": 1,
		"no-unmodified-loop-condition": 1,
		"no-unused-expressions": [
			"warn",
			{
				allowShortCircuit: true,
				allowTernary: true
			}
		],
		"no-useless-escape": 1,
		"no-useless-return": 1,
		radix: 1,
		"wrap-iife": 0,
		"no-catch-shadow": 1,
		"no-delete-var": 1,
		"no-label-var": 1,
		"no-restricted-globals": 1,
		"no-shadow": 0,
		"@typescript-eslint/no-shadow": ["error"],
		"no-shadow-restricted-names": 1,
		"no-undef": 1,
		"no-undef-init": 1,
		"no-undefined": 1,
		"no-use-before-define": 0,
		"array-bracket-newline": 0,
		"array-bracket-spacing": 1,
		"array-element-newline": 0,
		"block-spacing": 1,
		"brace-style": [
			"warn"
		],
		camelcase: 0,
		"capitalized-comments": 0,
		"comma-dangle": 1,
		"comma-spacing": 1,
		"consistent-this": 0,
		"eol-last": "error",
		"func-call-spacing": 1,
		"@typescript-eslint/indent": [
			"warn",
			"tab",
			{
				SwitchCase: 1
			}
		],
		"keyword-spacing": 1,
		"key-spacing": 1,
		"line-comment-position": 0,
		"max-depth": 1,
		"max-len": 0,
		"max-params": ["off", 5],
		"max-statements": 0,
		"max-statements-per-line": 1,
		"multiline-ternary": 0,
		"new-parens": 1,
		"newline-per-chained-call": 0,
		"no-lonely-if": 1,
		"no-mixed-operators": 1,
		"no-mixed-spaces-and-tabs": 1,
		"no-multiple-empty-lines": 1,
		"no-nested-ternary": 1,
		"no-unneeded-ternary": 1,
		"no-whitespace-before-property": 1,
		"object-curly-newline": [
			"warn",
			{
				consistent: true
			}
		],
		"object-curly-spacing": ["error", "always"],
		"object-property-newline": 0,
		quotes: "off",
		semi: ["warn", "always"],
		"semi-spacing": [
			"error",
			{
				before: false,
				after: true
			}
		],
		"space-in-parens": ["warn", "never"],
		"space-infix-ops": 1,
		"space-unary-ops": 1,
		"@typescript-eslint/semi": ["error"],
		"@typescript-eslint/brace-style": [
			"warn"
		],
		"@typescript-eslint/member-delimiter-style": [
			"error",
			{
				multiline: {
					delimiter: "semi",
					requireLast: true
				},
				singleline: {
					delimiter: "semi",
					requireLast: true
				}
			}
		],
		"@typescript-eslint/no-empty-function": [
			"error",
			{
				allow: ["constructors"]
			}
		],
		"@typescript-eslint/quotes": ["error", "double"],
		"@typescript-eslint/no-extra-parens": [
			1,
			"all",
			{
				nestedBinaryExpressions: false,
				returnAssign: false
			}
		],
		"@typescript-eslint/no-unused-vars": [
			"warn",
			{
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_",
				ignoreRestSiblings: true
			}
		],
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		"@typescript-eslint/no-redeclare": ["error"],
		"@typescript-eslint/naming-convention": [
			"error",
			{
				selector: ["classMethod", "typeMethod"],
				format: ["PascalCase", "camelCase"],
				modifiers: ["public"]
			},
			{
				selector: ["classMethod", "typeMethod"],
				format: ["camelCase"],
				modifiers: ["protected", "private"]
			}
		],
		"@typescript-eslint/no-misused-promises": [
			"error",
			{
				checksVoidReturn: {
					attributes: false
				}
			}
		],
		"@typescript-eslint/unbound-method": [
			"error",
			{
				ignoreStatic: true
			}
		]
	},
	extends: [
		"next/core-web-vitals",
		"plugin:react-hooks/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:@tanstack/eslint-plugin-query/recommended"
	],
	env: {
		browser: true,
		jest: true,
		node: true
	},
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint", "testing-library"],
	parserOptions: {
		project: "./tsconfig.json",
		tsconfigRootDir: __dirname
	},
	ignorePatterns: ["zmodel/lib/hooks/**/*.ts", "components/ui/**/*.tsx", "components/ui/**/*.ts", "types/next.d.ts", "tailwind.config.js", "postcss.config.js", "next.config.js"]
};
