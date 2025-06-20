import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'contracts/index': 'src/contracts/index.ts',
  },
  outDir: 'dist',
  format: ['cjs', 'esm'],
  minify: false,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'wagmi',
    '@privy-io/react-auth',
    '@solana/web3.js',
    '@tanstack/react-query',
    '@vechain/dapp-kit-react',
    'react-dom'
  ],
  splitting: true,
  treeshake: true,
  target: 'node18',
  skipNodeModulesBundle: true,
  metafile: true,
  dts: true,
});