import {
  coverageConfigDefaults,
  defineConfig,
  mergeConfig
} from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      reporters: ['html'],
      setupFiles: './vitest.setup.ts',
      coverage: {
        enabled: true,
        exclude: [
          '**/enums/**',
          '**/interfaces/**',
          '**/constants/**',
          '**/main.ts',
          'html/assets',
          ...coverageConfigDefaults.exclude
        ],
        provider: 'istanbul'
      }
    }
  })
)
