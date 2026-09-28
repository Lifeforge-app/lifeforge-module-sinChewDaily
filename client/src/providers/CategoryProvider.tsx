import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import { contract } from '../../contract'

const CATEGORIES = contract.list.input.query.properties.type.enum

export const RANGES = ['6H', '24H', '1W'] as const

export type Category = (typeof CATEGORIES)[number]

export interface CategoryStructure {
  [key: string]: {
    subcategories?: {
      [key: string]: {
        subsubcategories?: string[]
      }
    }
  }
}

interface CategoryContextValue {
  mainCategory: string
  setMainCategory: (category: string) => void
  subCategory: string
  setSubCategory: (category: string) => void
  subSubCategory: string
  setSubSubCategory: (category: string) => void
  range: (typeof RANGES)[number]
  setRange: (range: (typeof RANGES)[number]) => void
  categoryStructure: CategoryStructure
  availableSubCategories: string[]
  availableSubSubCategories: string[]
  fullCategory: string
  shouldShowEmptyState: boolean
}

const CategoryContext = createContext<CategoryContextValue | null>(null)

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [mainCategory, setMainCategory] = useState<string>('latest')
  const [subCategory, setSubCategory] = useState<string>('')
  const [subSubCategory, setSubSubCategory] = useState<string>('')
  const [range, setRange] = useState<(typeof RANGES)[number]>(RANGES[0])

  const categoryStructure = useMemo<CategoryStructure>(() => {
    const structure: CategoryStructure = {}

    CATEGORIES.forEach(cat => {
      const parts = cat.split(':')

      const main = parts[0]

      const sub = parts[1]

      const subsub = parts[2]

      if (!structure[main]) {
        structure[main] = {}
      }

      if (sub) {
        if (!structure[main].subcategories) {
          structure[main].subcategories = {}
        }

        if (!structure[main].subcategories![sub]) {
          structure[main].subcategories![sub] = {}
        }

        if (subsub) {
          if (!structure[main].subcategories![sub].subsubcategories) {
            structure[main].subcategories![sub].subsubcategories = []
          }

          if (
            !structure[main].subcategories![sub].subsubcategories!.includes(
              subsub
            )
          ) {
            structure[main].subcategories![sub].subsubcategories!.push(subsub)
          }
        }
      }
    })

    return structure
  }, [])

  const availableSubCategories = useMemo(() => {
    return categoryStructure[mainCategory]?.subcategories
      ? Object.keys(categoryStructure[mainCategory].subcategories!)
      : []
  }, [categoryStructure, mainCategory])

  const availableSubSubCategories = useMemo(() => {
    return (
      categoryStructure[mainCategory]?.subcategories?.[subCategory]
        ?.subsubcategories || []
    )
  }, [categoryStructure, mainCategory, subCategory])

  const fullCategory = useMemo(() => {
    let result = mainCategory

    if (subCategory) {
      result += `:${subCategory}`

      if (subSubCategory) {
        result += `:${subSubCategory}`
      }
    }

    return result
  }, [mainCategory, subCategory, subSubCategory])

  const shouldShowEmptyState = useMemo(() => {
    if (availableSubCategories.length > 0 && !subCategory) {
      return true
    }

    if (availableSubSubCategories.length > 0 && !subSubCategory) {
      return true
    }

    return false
  }, [
    availableSubCategories.length,
    subCategory,
    availableSubSubCategories.length,
    subSubCategory
  ])

  useEffect(() => {
    setSubCategory('')
    setSubSubCategory('')
  }, [mainCategory])

  useEffect(() => {
    setSubSubCategory('')
  }, [subCategory])

  return (
    <CategoryContext
      value={{
        mainCategory,
        setMainCategory,
        subCategory,
        setSubCategory,
        subSubCategory,
        setSubSubCategory,
        range,
        setRange,
        categoryStructure,
        availableSubCategories,
        availableSubSubCategories,
        fullCategory,
        shouldShowEmptyState
      }}
    >
      {children}
    </CategoryContext>
  )
}

export function useCategories() {
  const context = useContext(CategoryContext)

  if (!context) {
    throw new Error('useCategories must be used within a CategoryProvider')
  }

  return context
}
