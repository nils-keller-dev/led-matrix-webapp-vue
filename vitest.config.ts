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
      setupFiles: './vitest.setup.ts',
      coverage: {
        provider: 'istanbul',
        exclude: [
          '**/enums/**',
          '**/interfaces/**',
          '**/constants/**',
          '**/main.ts',
          ...coverageConfigDefaults.exclude
        ]
      }
    }
  })
)
