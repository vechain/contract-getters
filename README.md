# VeChain Getters

Framework-agnostic VeChain getters (read-only) library with example applications. Seamlessly integrates with existing VeChain SDK projects or works standalone.

## 🚀 Getting Started

### Installation

```bash
yarn add @vechain/getters-core
# or
npm install @vechain/getters-core
```

### Usage

There are three ways to use VeChain Getters:

1. **Create a new VeChainClient** (recommended for new projects):

```typescript
import { VeChainClient } from '@vechain/getters-core';

const client = VeChainClient.create({
    nodeUrl: 'https://testnet.vechain.org',
});

const balance = await getVot3Balance(client, walletAddress);
```

2. **Use with existing ThorClient** (for projects already using VeChain SDK):

```typescript
import { ThorClient } from '@vechain/sdk-network';
import { VeChainClient } from '@vechain/getters-core';

// Use your existing ThorClient
const thorClient = ThorClient.at('https://testnet.vechain.org');
const client = VeChainClient.from(thorClient);

const balance = await getVot3Balance(client, walletAddress);
```

3. **Custom Contract Addresses** (for testing or custom deployments):

```typescript
const client = VeChainClient.create({
    nodeUrl: 'https://testnet.vechain.org',
    overrideAddresses: {
        vot3ContractAddress: '0x6e8b4a88d37897fc11f6ba12c805695f1c41f40e',
        // ... other contract addresses
    },
});
```

## 📦 Packages

- **`@vechain/getters-core`** - Framework-agnostic VeChain getters library with built-in TypeScript support

## 🎯 Examples

This repository includes example applications demonstrating different usage patterns:

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
- `yarn example:react` - Run React example in development
- `yarn example:react:build` - Build React example for production

## 📁 Project Structure

```
vechain-getters/
├── packages/
│   └── getters-core/          # Core getters library
│       ├── src/
│       ├── package.json
│       └── tsconfig.json
├── examples/
│   ├── nodejs-example/        # Node.js example app
│   │   ├── src/
│   │   ├── package.json
│   │   └── README.md
│   └── react-example/         # React/Next.js example app
│       ├── src/
│       ├── package.json
│       └── README.md
├── package.json               # Root workspace config
├── turbo.json                # Turbo build config
└── README.md                 # This file
```

## 🔧 Adding VeChain Getters

The examples are set up and ready to showcase your getters. To add real VeChain functionality:

1. **Implement getters** in `packages/getters-core/src/index.ts`:

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

## 📖 Complete Example

```typescript
import { ThorClient } from '@vechain/sdk-network';
import { getVot3Balance, VeChainClient } from '@vechain/getters-core';

// Example 1: Using existing ThorClient
const thorClient = ThorClient.at('https://testnet.vechain.org');
const client = VeChainClient.from(thorClient);
const balance1 = await getVot3Balance(client, walletAddress);

// Example 2: Direct VeChainClient creation
const client2 = VeChainClient.create({
    nodeUrl: 'https://testnet.vechain.org',
});
const balance2 = await getVot3Balance(client2, walletAddress);

// Example 3: Custom contract addresses
const client3 = VeChainClient.create({
    nodeUrl: 'https://testnet.vechain.org',
    options: {
        // Optional ThorClient options
        pollingInterval: 10000,
    },
    overrideAddresses: {
        // Override specific contract addresses
        vot3ContractAddress: '0x6e8b4a88d37897fc11f6ba12c805695f1c41f40e',
    },
});
const balance3 = await getVot3Balance(client3, walletAddress);
```

### React Integration

```typescript
import { useEffect, useState } from 'react';
import { VeChainClient, getVot3Balance } from '@vechain/getters-core';

function VOT3Balance({ walletAddress }) {
    const [balance, setBalance] = useState<string>();
    const [error, setError] = useState<Error>();

    useEffect(() => {
        const client = VeChainClient.create({
            nodeUrl: 'https://testnet.vechain.org',
        });

        getVot3Balance(client, walletAddress)
            .then(setBalance)
            .catch(setError);

        return () => client.destroy();
    }, [walletAddress]);

    if (error) return <div>Error: {error.message}</div>;
    if (!balance) return <div>Loading...</div>;

    return <div>VOT3 Balance: {balance}</div>;
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.
