# Node.js Getters Example

A simple Node.js application demonstrating server-side usage of the VeChain getters library.

## Features

- **TypeScript**: Full TypeScript implementation with strict type checking
- **ES Modules**: Modern JavaScript module system with TypeScript compilation
- **Hot Reload**: Development mode with `tsx watch` for instant TypeScript compilation
- **Build System**: Proper TypeScript build pipeline with source maps and declarations
- **Type Safety**: Strongly typed VeChain getter usage

## Getting Started

### Prerequisites

Make sure you have built the core library first:

```bash
# From the project root
yarn build
```

### Installation

```bash
# Install dependencies (if not already done from root)
yarn install
```

### Running the Example

**Development mode with hot reload:**

```bash
yarn dev
```

**Production mode:**

```bash
yarn start
```

**From the project root:**

```bash
# Development
yarn example:nodejs:dev

# Production
yarn example:nodejs
```

## Project Structure

```
nodejs-example/
├── src/
│   └── index.ts          # Main TypeScript application file
├── dist/                 # Compiled JavaScript output (generated)
│   ├── index.js
│   ├── index.d.ts
│   └── index.js.map
├── package.json          # Node.js dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## Current Implementation

The example currently demonstrates:

1. **TypeScript Integration**: Full TypeScript implementation with type annotations
2. **Basic Import**: Importing functions from `@vechain/getters-core` with proper typing
3. **Function Calls**: Calling the `ping()` function with explicit return type
4. **Typed Variables**: Using TypeScript type annotations for variables
5. **Async Function Types**: Demonstrating `Promise<void>` return types
6. **Success Validation**: Confirming the library integration works with type safety

## Adding Real VeChain Functionality

When you implement actual getters, update `src/index.ts` to include:

```typescript
import { createClient, getAccountBalance, getLatestBlock, getTransaction } from "@vechain/getters-core"

// Create client
const client = createClient({
  nodeUrl: "https://testnet.vechain.org",
  network: "testnet",
})

// Example usage
async function demonstrateGetters() {
  try {
    // Get latest block
    const latestBlock = await getLatestBlock(client)
    console.log("Latest block:", latestBlock)

    // Get account balance
    const balance = await getAccountBalance(client, "0x...")
    console.log("Account balance:", balance)

    // Get transaction
    const tx = await getTransaction(client, "0x...")
    console.log("Transaction:", tx)
  } catch (error) {
    console.error("Error:", error)
  }
}

demonstrateGetters()
```

## TypeScript Support

The example includes TypeScript configuration for:

- Type checking with `yarn typecheck`
- Modern ES2022 target
- Node.js types
- Strict type checking

## Scripts

- `yarn start` - Build and run the compiled application
- `yarn dev` - Run with hot reload using tsx watch
- `yarn build` - Compile TypeScript to JavaScript
- `yarn typecheck` - Type check without emitting files
- `yarn clean` - Remove compiled output directory
