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
      environment: 'happy-dom',
      setupFiles: './vitest.setup.ts',
      coverage: {
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
