## prerequisite

1. Install Http Server (Ngnix, Apache ...)

2. Install Nodejs and NPM

## How to deploy

Before you can build this project, you must install and configure the following dependencies on your machine:
Enviroment require: nodejs + nginx

1. Pull source code from Giblab or bitbucket.

You will only need to run this command when dependencies change in [package.json](package.json).

    npm install

2. config url api file webpack.common.js
   set variable SERVER_API_URL = url api value
3. Build source
   npm run webpack:build

4. Copy source from target/classes/static/ vào thư mục của nginx.

## Rule tsLint

1. Source tslint will turn off for development, if you want to open it, let add :

"{
"extends": ["tslint:latest", "tslint-eslint-rules", "tslint-react", "tslint-config-prettier"],
"jsRules": {
"class-name": true,
"comment-format": [true, "check-space"],
"eofline": true,
"forin": true,
"indent": [true, "spaces", 2],
"label-position": true,
"max-line-length": [true, 180],
"member-access": false,
"member-ordering": [true, "static-before-instance", "variables-before-functions"],
"no-arg": true,
"no-bitwise": false,
"no-console": [true, "log", "debug", "info", "time", "timeEnd", "trace"],
"no-construct": true,
"no-debugger": true,
"no-duplicate-variable": true,
"no-empty": false,
"no-eval": true,
"no-shadowed-variable": true,
"no-string-literal": false,
"no-switch-case-fall-through": true,
"no-trailing-whitespace": true,
"no-unused-expression": [true, "allow-fast-null-checks"],
"no-var-keyword": true,
"no-implicit-dependencies": [true, "dev"],
"object-literal-sort-keys": false,
"one-line": [true, "check-open-brace", "check-catch", "check-else", "check-whitespace"],
"quotemark": [true, "single", "jsx-double", "avoid-escape"],
"radix": true,
"semicolon": [true, "always", "ignore-bound-class-methods"],
"triple-equals": [true, "allow-null-check"],
"variable-name": false,
"whitespace": [true, "check-branch", "check-decl", "check-operator", "check-separator", "check-type"],
"prefer-const": true,
"arrow-parens": [true, "ban-single-arg-parens"],
"arrow-return-shorthand": [true],
"import-spacing": true,
"no-consecutive-blank-lines": [true],
"object-literal-shorthand": true,
"space-before-function-paren": [true, { "named": "never", "asyncArrow": "always" }],
"trailing-comma": [
true,
{
"multiline": "never",
"singleline": "never"
}
],
"ordered-imports": [false],
"curly": [true, "ignore-same-line"],
"switch-default": true,
"cyclomatic-complexity": [true, 40],
"no-invalid-this": [true],
"no-magic-numbers": false,

    "ter-arrow-body-style": [true],
    "ter-no-irregular-whitespace": [true],
    "ter-no-sparse-arrays": [true],
    "ter-func-call-spacing": [true, "never"],
    "no-multi-spaces": [true],
    "brace-style": [
      true,
      "1tbs",
      {
        "allowSingleLine": true
      }
    ],
    "object-curly-spacing": [true, "always"],
    "space-in-parens": [true, "never"]

},
"rules": {
"class-name": true,
"comment-format": [true, "check-space"],
"eofline": true,
"forin": true,
"indent": [true, "spaces", 2],
"label-position": true,
"max-line-length": [true, 180],
"member-access": false,
"member-ordering": [true, "static-before-instance", "variables-before-functions"],
"no-arg": true,
"no-bitwise": false,
"no-console": [true, "log", "debug", "info", "time", "timeEnd", "trace"],
"no-construct": true,
"no-debugger": true,
"no-duplicate-variable": true,
"no-empty": false,
"no-eval": true,
"no-inferrable-types": [true],
"no-shadowed-variable": true,
"no-string-literal": false,
"no-switch-case-fall-through": true,
"no-trailing-whitespace": true,
"no-unused-expression": [true, "allow-fast-null-checks"],
"no-var-keyword": true,
"no-implicit-dependencies": [false, "dev"],
"object-literal-sort-keys": false,
"one-line": [true, "check-open-brace", "check-catch", "check-else", "check-whitespace"],
"quotemark": [true, "single", "jsx-double", "avoid-escape"],
"radix": true,
"semicolon": [true, "always", "ignore-bound-class-methods"],
"triple-equals": [true, "allow-null-check"],
"typedef-whitespace": [
true,
{
"call-signature": "nospace",
"index-signature": "nospace",
"parameter": "nospace",
"property-declaration": "nospace",
"variable-declaration": "nospace"
}
],
"variable-name": false,
"whitespace": [
true,
"check-branch",
"check-decl",
"check-operator",
"check-module",
"check-separator",
"check-type",
"check-typecast",
"check-preblock"
],
"prefer-const": true,
"arrow-parens": [true, "ban-single-arg-parens"],
"arrow-return-shorthand": [true],
"import-spacing": true,
"no-consecutive-blank-lines": [true],
"object-literal-shorthand": true,
"space-before-function-paren": [true, { "named": "never", "asyncArrow": "always" }],
"trailing-comma": [
true,
{
"multiline": "never",
"singleline": "never"
}
],
"ordered-imports": [false],
"curly": [true, "ignore-same-line"],
"switch-default": true,
"cyclomatic-complexity": [true, 40],
"no-invalid-this": [true],
"no-magic-numbers": false,
"ban-types": [true, ["Object", "Use {} instead."]],
"no-submodule-imports": [true, "app", "uuid/v4", "@fortawesome", "lodash", "react-toastify"],

    "ter-arrow-body-style": [true],
    "ter-no-irregular-whitespace": [true],
    "ter-no-sparse-arrays": [true],
    "ter-func-call-spacing": [true, "never"],
    "no-multi-spaces": [true],
    "array-bracket-spacing": [false],
    "brace-style": [
      true,
      "1tbs",
      {
        "allowSingleLine": true
      }
    ],
    "object-curly-spacing": [true, "always"],
    "space-in-parens": [true, "never"],

    "jsx-boolean-value": [true, "never"],
    "jsx-no-multiline-js": false,
    "jsx-alignment": false

},
"rulesDirectory": []
}" in tslist.json.

2. Open in webpack.common.js

- find:
  // {
  // test: /\.(tsx?|js|jsx)\$/,
  // enforce: 'pre',
  // loader: 'tslint-loader',
  // exclude: [utils.root('node_modules')]
  // }

- commit and rebuild "npm start" to build and restart tslint
