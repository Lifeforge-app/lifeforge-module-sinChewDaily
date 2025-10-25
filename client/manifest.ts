import { lazy } from 'react'
import type { ModuleConfig } from 'shared'

export default {
  name: 'Sin Chew Daily',
  icon: 'tabler:news',
  routes: {
    'sin-chew-daily': lazy(() => import('@'))
  },
  category: 'Information'
} satisfies ModuleConfig
