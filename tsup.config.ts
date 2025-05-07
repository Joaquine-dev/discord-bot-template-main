import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  dts: true,
  clean: true,
  minify: false,
  sourcemap: true,
  external: ['reflect-metadata', 'pg', 'pg-connection-string', 'typeorm'],
  esbuildOptions(options) {
    options.alias = {
      '@': './src',
      '@client': './src/client',
      '@commands': './src/commands',
      '@events': './src/events',
      '@components': './src/components',
      '@config': './src/config',
      '@entity': './src/entity',
      '@utils': './src/utils',
      '@structure': './src/structure',
      '@job': './src/job',
      '@interfaces': './src/Interfaces',
      '@migrations': './src/migrations',
      '@services': './src/services'
    };
    options.keepNames = true;
    options.treeShaking = false;
  }
}); 