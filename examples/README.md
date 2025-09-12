# VeChain Getters Examples

This directory contains example applications demonstrating how to use the `@vechain/contract-getters` library in different environments.

## Available Examples

### 1. Node.js Example (`nodejs-example/`)

A simple Node.js application showcasing server-side usage of VeChain getters.

**Features:**

- ES modules setup
- TypeScript support
- Direct function imports and usage
- Example patterns for async operations

**Run the example:**

```bash
# From the root directory
yarn example:nodejs

# Or with watch mode for development
yarn example:nodejs:dev

# Or directly from the example directory
cd examples/nodejs-example
yarn start
```

## Setup Instructions

1. **Install dependencies** (from the root directory):

    ```bash
    yarn install
    ```

2. **Build the core library** (required for examples to work):

    ```bash
    yarn build
    ```

3. **Run any example** using the commands above.

## Next Steps

Once you implement your VeChain getters in the core library:

1. Update the exports in `packages/contract-getters/src/index.ts`
2. Add proper TypeScript types
3. Update the examples to use real VeChain functionality
4. Add error handling and loading states
5. Create more sophisticated demo components

## Example Usage Patterns

### Basic Import and Usage

```typescript
import { createClient, getAccountBalance } from '@vechain/contract-getters';

const client = createClient({ nodeUrl: 'https://testnet.vechain.org' });
const balance = await getAccountBalance(client, '0x...');
```
