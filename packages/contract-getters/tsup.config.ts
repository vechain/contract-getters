import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    outDir: 'dist',
    format: ['cjs', 'esm'],
    minify: false,
    sourcemap: true,
    clean: true,
    splitting: true, // Enable code splitting
    treeshake: true, // Enable tree shaking
    target: 'node18',
    skipNodeModulesBundle: true,
    metafile: true, // Generate meta file for better build analysis
    // Simplified DTS generation to avoid rollup conflicts
    dts: {
        resolve: false, // Avoid resolving external types that cause conflicts
        compilerOptions: {
            skipLibCheck: true,
        },
    },
    external: [
        '@vechain/sdk-network',
        '@vechain/vebetterdao-contracts',
        'ethers',
    ],
    // Performance optimizations
    define: {
        'process.env.NODE_ENV': '"production"',
    },
    // Faster builds with less overhead
    shims: false,
});
