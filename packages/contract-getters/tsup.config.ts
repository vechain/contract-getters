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
    // Disable DTS generation due to external dependency resolution issues
    dts: false,
    metafile: true,
});
