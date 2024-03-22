# Prettier Plugin for Fluent 
[![npm version](https://badge.fury.io/js/@luca-iachini%2Fprettier-plugin-fluent.svg)](https://badge.fury.io/js/@luca-iachini%2Fprettier-plugin-fluent)

<p align="center">
  &nbsp;&nbsp;<img alt="Prettier"
  height="80"
  src="https://cdn.rawgit.com/prettier/prettier-logo/master/images/prettier-icon-light.svg">&nbsp;&nbsp;
  &nbsp;&nbsp;<img alt="Fluent"
  height="80"
  src="https://avatars.githubusercontent.com/u/24696436?s=200&v=4">&nbsp;&nbsp;
</p>

Prettier plugin for formatting  [Fluent](https://projectfluent.org/) files. Fluent is a localization paradigm designed to unleash the expressive power of natural language. The format used to describe translation resources in Fluent is called FTL.

FTL is designed to be simple to read, yet powerful enough to represent complex concepts from natural languages such as gender, plurals, conjugations, and more.

## What is Prettier?

[Prettier](https://prettier.io/) is an opinionated code formatter that supports various programming languages and file formats. It aims to enforce a consistent code style across your entire project, making code formatting less of a hassle and allowing developers to focus more on writing code rather than formatting it.

## Installation

You can install `prettier-plugin-fluent` via npm or yarn:

```bash
npm install --save-dev prettier-plugin-fluent
# or
yarn add --dev prettier-plugin-fluent
```

## Usage

Once installed, the plugin will automatically format `.ftl` files whenever you run Prettier.

```bash
npx prettier --write .
```

Replace `.` with the path to your Fluent files or directories containing Fluent files that you want to format.

## Test

```bash
yarn build && yarn node --experimental-vm-modules $(yarn bin jest)
```

## Features

- **Consistent Formatting**: Ensure that your Fluent files are formatted consistently across your project.
- **Ease of Use**: Seamlessly integrate with Prettier to format your Fluent files without any additional setup.
- **Preservation of FTL Semantics**: The plugin ensures that the formatting changes do not alter the semantic meaning of your Fluent resources.

## Contributing

Contributions are welcome! If you encounter any bugs or have suggestions for improvements, please feel free to open an issue or submit a pull request on [GitHub](https://github.com/luca-iachini/prettier-plugin-fluent).

Before submitting a pull request, please make sure to read our [Contributing Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
