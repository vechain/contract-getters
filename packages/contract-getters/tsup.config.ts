import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    treeshake: true,
    sourcemap: true,
    clean: true,
    minify: true,
    external: [
        '@vechain/sdk-network',
        '@vechain/vebetterdao-contracts',
        'ethers',
    ],
    // Enable DTS generation for TypeScript declarations
    dts: true,
    metafile: true,
});
