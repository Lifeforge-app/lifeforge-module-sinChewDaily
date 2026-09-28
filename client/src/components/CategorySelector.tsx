import { useModuleTranslation } from '@lifeforge/localization'
import { Box, Flex, ListboxInput, ListboxOption } from '@lifeforge/ui'

import { RANGES, useCategories } from '@/providers/CategoryProvider'

function CategorySelector() {
  const { t } = useModuleTranslation()

  const {
    mainCategory,
    setMainCategory,
    subCategory,
    setSubCategory,
    subSubCategory,
    setSubSubCategory,
    categoryStructure,
    availableSubCategories,
    availableSubSubCategories,
    fullCategory,
    range,
    setRange
  } = useCategories()

  return (
    <Flex align="center" gap="sm" width="100%" wrap="wrap">
      <Box flex="1">
        <ListboxInput
          icon="tabler:category"
          label="category"
          renderContent={() => <span>{t(`categories.${mainCategory}`)}</span>}
          value={mainCategory}
          onChange={setMainCategory}
        >
          {Object.keys(categoryStructure).map(cat => (
            <ListboxOption
              key={cat}
              label={t(`categories.${cat}`)}
              value={cat}
            />
          ))}
        </ListboxInput>
      </Box>
      {availableSubCategories.length > 0 && (
        <Box flex="1">
          <ListboxInput
            icon="tabler:folder"
            label="subcategory"
            renderContent={() => (
              <span>
                {t(`categories.${subCategory}`) ||
                  t('inputs.subcategory.placeholder')}
              </span>
            )}
            value={subCategory}
            onChange={setSubCategory}
          >
            {availableSubCategories.map(subCat => (
              <ListboxOption
                key={subCat}
                label={t(`categories.${subCat}`)}
                value={subCat}
              />
            ))}
          </ListboxInput>
        </Box>
      )}

      {availableSubSubCategories.length > 0 && (
        <Box flex="1">
          <ListboxInput
            icon="tabler:folders"
            label="subSubcategory"
            renderContent={() => (
              <span>
                {t(`categories.${subSubCategory}`) ||
                  t('inputs.sub-subcategory.placeholder')}
              </span>
            )}
            value={subSubCategory}
            onChange={setSubSubCategory}
          >
            {availableSubSubCategories.map(subSubCat => (
              <ListboxOption
                key={subSubCat}
                label={t(`categories.${subSubCat}`)}
                value={subSubCat}
              />
            ))}
          </ListboxInput>
        </Box>
      )}

      {fullCategory === 'hot' && (
        <Box flex="1">
          <ListboxInput
            icon="tabler:clock"
            label="range"
            renderContent={() => <span>{range}</span>}
            value={range}
            onChange={setRange}
          >
            {RANGES.map(rng => (
              <ListboxOption key={rng} label={rng} value={rng} />
            ))}
          </ListboxInput>
        </Box>
      )}
    </Flex>
  )
}

export default CategorySelector
