# VeChain Getters

A simple, beginner-friendly library for reading data from VeChain smart contracts. No complex setup required - just install and call functions! Works with any JavaScript/TypeScript project and integrates seamlessly with existing VeChain SDK projects.

**✨ Lightweight**: Only 7.5k (3.2k gzipped) - minimal impact on your bundle size!

## 🚀 Getting Started

### Installation

Install the library along with its required peer dependencies:

```bash
# Using yarn
yarn add @vechain/contract-getters @vechain/sdk-network @vechain/vebetterdao-contracts ethers

# Using npm
npm install @vechain/contract-getters @vechain/sdk-network @vechain/vebetterdao-contracts ethers
```

> **Note**: This library requires `@vechain/sdk-network`, `@vechain/vebetterdao-contracts`, and `ethers` as peer dependencies. Make sure to install them alongside the main package.

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
