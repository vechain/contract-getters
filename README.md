# VeChain Getters

Framework-agnostic VeChain getters (read-only) library with example applications.

## 📦 Packages

- **`@vechain/getters-core`** - Framework-agnostic VeChain getters library

## 🚀 Examples

This repository includes two example applications demonstrating how to use the getters library:

### Node.js Example

A simple Node.js application showcasing server-side usage.

```bash
# Run the Node.js example
yarn example:nodejs

# Development mode with hot reload
yarn example:nodejs:dev
```

### React/Next.js Example

A modern React application built with Next.js 14, demonstrating both server-side and client-side usage.

```bash
# Run the React example
yarn example:react

# Build for production
yarn example:react:build
```

Visit [http://localhost:3000](http://localhost:3000) to see the React example in action.

## 🛠️ Development

### Prerequisites

- Node.js 18+
- Yarn 1.22+

### Setup

1. **Install dependencies:**

   ```bash
   yarn install
   ```

2. **Build the core library:**

   ```bash
   yarn build
   ```

3. **Run examples:**

   ```bash
   # Node.js example
   yarn example:nodejs

   # React example
   yarn example:react
   ```

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
   export { createClient } from "./client"
   export { getAccountBalance } from "./getters/account"
   export { getLatestBlock } from "./getters/block"
   export { getTransaction } from "./getters/transaction"
   ```

2. **Update examples** to use the new getters:

   - Update imports in both example applications
   - Add real VeChain network calls
   - Implement proper error handling and loading states

3. **Add TypeScript types** for better developer experience

## 📖 Example Usage

### Node.js

```javascript
import { createClient, getAccountBalance } from "@vechain/getters-core"

const client = createClient({
  nodeUrl: "https://testnet.vechain.org",
})

const balance = await getAccountBalance(client, "0x...")
console.log("Balance:", balance)
```

### React

```typescript
import { useEffect, useState } from "react"
import { getLatestBlock } from "@vechain/getters-core"

function LatestBlock({ client }) {
  const [block, setBlock] = useState(null)

  useEffect(() => {
    getLatestBlock(client).then(setBlock)
  }, [client])

  return <div>Latest Block: {block?.number}</div>
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
