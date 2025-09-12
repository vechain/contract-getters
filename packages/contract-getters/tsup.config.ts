import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: false,
    clean: true,
    minify: true,
    external: [
        '@vechain/sdk-network',
        '@vechain/vebetterdao-contracts',
        'ethers',
    ],
    metafile: true,
});
