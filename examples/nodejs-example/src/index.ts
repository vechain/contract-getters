/* eslint-disable no-console */
import { ping } from '@vechain/getters-core';

console.log('🔗 VeChain Getters - Node.js Example');
console.log('====================================\n');

// Test the basic ping function
console.log('Testing ping function:');
const result: string = ping();
console.log('ping() =>', result);
console.log('✅ Basic function call successful!\n');
