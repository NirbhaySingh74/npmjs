# NPMJS Clone

A web application built to replicate the core functionality of [npmjs.com](https://www.npmjs.com), allowing users to search for NPM packages, view package details, and explore specific versions of the packages.

## Features

1. **Search NPM Packages**: Users can search for NPM packages using the NPM registry API.
2. **Package Detail Page**: View detailed information about an NPM package, including its name, description, license, and repository link.
3. **Package Version Page**: Explore specific versions of a package with details about changes and dependencies.

## Tech Stack

- **Frontend**: React, TypeScript
- **State Management**: Zustand
- **CSS Framework**: Tailwind CSS
- **Routing**: React Router
- **API**: Axios for fetching data from the [NPM Registry API](https://github.com/npm/registry/blob/main/docs/REGISTRY-API.md)

## Installation

### Prerequisites

- Node.js (version >= 14)
- npm or yarn

### Steps to Install

1. Clone the repository:
   ```bash
   git clone https://github.com/NirbhaySingh74/npmjs
   cd npmjs
   ```
2. Install the dependencies:

```bash
npm install
```

or

```
yarn install
```

3. Run the development server:

```bash
npm run dev
```

or

```bash
yarn dev
```
