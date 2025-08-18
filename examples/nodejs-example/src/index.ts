import { ping } from "@vechain/getters-core"

console.log("🔗 VeChain Getters - Node.js Example")
console.log("====================================\n")

// Test the basic ping function
console.log("Testing ping function:")
const result: string = ping()
console.log("ping() =>", result)
console.log("✅ Basic function call successful!\n")

// Example of how you would use the getters once implemented
console.log("Example usage (once getters are implemented):")
console.log(`
// Import getters
import { createClient, getAccountBalance, getLatestBlock } from '@vechain/getters-core';

// Create a client instance
const client = createClient({
  nodeUrl: 'https://testnet.vechain.org',
  network: 'testnet'
});

// Get account balance
const balance = await getAccountBalance(client, '0x...');
console.log('Account balance:', balance);

// Get latest block
const block = await getLatestBlock(client);
console.log('Latest block:', block);
`)

// Example TypeScript function demonstrating typed usage
async function demonstrateTypedGetters(): Promise<void> {
  console.log("\n📝 TypeScript Example Function:")
  console.log("async function demonstrateTypedGetters(): Promise<void> {")
  console.log("  // This function would use properly typed getters")
  console.log("  // const client: VeChainClient = createClient(config)")
  console.log("  // const balance: string = await getAccountBalance(client, address)")
  console.log("}")
}

// Call the demo function
demonstrateTypedGetters()

console.log("🚀 Ready to showcase VeChain getters functionality!")
