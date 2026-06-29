/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local manually for the CLI
config({ path: resolve(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export default defineCliConfig({
  api: { projectId, dataset },
  typegen: { generates: 'src/sanity/sanity.types.ts' },
  vite: (viteConfig) => {
    return {
      ...viteConfig,
      define: {
        ...viteConfig.define,
        'process.env.NEXT_PUBLIC_SANITY_PROJECT_ID': JSON.stringify(projectId),
        'process.env.NEXT_PUBLIC_SANITY_DATASET': JSON.stringify(dataset),
        'process.env.NEXT_PUBLIC_SANITY_API_VERSION': JSON.stringify(process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-06-12'),
      }
    }
  }
})
