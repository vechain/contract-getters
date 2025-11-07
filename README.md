# VeChain Getters

A simple, beginner-friendly library for reading data from VeChain smart contracts. No complex setup required - just install and call functions! Works with any JavaScript/TypeScript project and integrates seamlessly with existing VeChain SDK projects.

## 🚀 Getting Started

### Installation

1. **Install the main package:**

```bash
# Using yarn
yarn add @vechain/contract-getters

# Using npm
npm install @vechain/contract-getters
```

2. **Install peer dependencies:**

```bash
# Using yarn
yarn add @vechain/vechain-contract-types @vechain/sdk-network ethers

# Using npm
npm install @vechain/vechain-contract-types @vechain/sdk-network ethers
```

### Usage

There are 4 ways to use VeChain Getters, from simplest to most customized:

#### 1. **No Client Required** (simplest - perfect for beginners):

```typescript
import { getVot3Balance } from '@vechain/contract-getters';

// Just call the function - no setup needed!
const balance = await getVot3Balance(
    '0x66E9709bc01B8c0AfC99a7dC513f501821306E85',
);
console.log(`Balance: ${balance}`);
```

#### 2. **Custom Network** (specify which VeChain network to use):

```typescript
import { getVot3Balance } from '@vechain/contract-getters';

const balance = await getVot3Balance(
    '0x66E9709bc01B8c0AfC99a7dC513f501821306E85',
    {
        networkUrl: 'https://testnet.vechain.org',
    },
);
```

#### 3. **Use Existing ThorClient** (for projects already using VeChain SDK):

```typescript
import { ThorClient } from '@vechain/sdk-network';
import { VeChainClient, getVot3Balance } from '@vechain/contract-getters';

// Use your existing ThorClient
const thorClient = ThorClient.at('https://testnet.vechain.org');
const vechainClient = VeChainClient.from(thorClient);

const balance = await getVot3Balance(
    '0x66E9709bc01B8c0AfC99a7dC513f501821306E85',
    {
        client: vechainClient,
    },
);
```

#### 4. **Custom Contract Addresses** (for testing or custom deployments):

```typescript
import { VeChainClient, getVot3Balance } from '@vechain/contract-getters';

const vechainClient = VeChainClient.create({
    nodeUrl: 'https://testnet.vechain.org',
    overrideAddresses: {
        vot3ContractAddress: '0x6e8b4a88d37897fc11f6ba12c805695f1c41f40e',
        // ... other contract addresses
    },
});

const balance = await getVot3Balance(
    '0x66E9709bc01B8c0AfC99a7dC513f501821306E85',
    {
        client: vechainClient,
    },
);
```

## 📦 Packages

- **`@vechain/contract-getters`** - Framework-agnostic VeChain getters library with built-in TypeScript support

## 🎯 Examples

Check out the `examples/nodejs-example/` folder for a complete working example that demonstrates all 4 usage patterns. You can run it with:

```bash
yarn example:nodejs
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- Yarn 1.22+

### Setup

1. **Install dependencies:**

    ```bash
    yarn install
    ```

2. **Start core package in watch mode:**

    ```bash
    yarn core:dev
    ```

3. **Run example with hot reload:**
    ```bash
    yarn example:nodejs:dev
    ```

### Core Package Scripts

- `yarn core:dev` - Start core package in watch mode
- `yarn core:build` - Build core package
- `yarn core:typecheck` - Run type checking

### Available Scripts

- `yarn build` - Build all packages
- `yarn dev` - Start all packages in development mode
- `yarn test` - Run tests for all packages
- `yarn lint` - Lint all packages
- `yarn typecheck` - Type check all packages
- `yarn clean` - Clean build artifacts

### Example Scripts

- `yarn example:nodejs` - Run Node.js example
- `yarn example:nodejs:dev` - Run Node.js example with hot reload

## 📁 Project Structure

```
vechain-getters/
├── packages/
│   └── contract-getters/          # Core getters library
│       ├── src/
│       ├── package.json
│       └── tsconfig.json
├── examples/
│   └── nodejs-example/        # Node.js example app
│       ├── src/
│       ├── package.json
│       └── README.md
├── package.json               # Root workspace config
└── README.md                 # This file
```

## 🔧 Adding VeChain Getters

The examples are set up and ready to showcase your getters. To add real VeChain functionality:

1. **Implement getters** in `packages/contract-getters/src/index.ts`:

    ```typescript
    export { createClient } from './client';
    export { getAccountBalance } from './getters/account';
    export { getLatestBlock } from './getters/block';
    export { getTransaction } from './getters/transaction';
    ```

2. **Update examples** to use the new getters:
    - Update imports in both example applications
    - Add real VeChain network calls
    - Implement proper error handling and loading states

3. **Add TypeScript types** for better developer experience

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.
