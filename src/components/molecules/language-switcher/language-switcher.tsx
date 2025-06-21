'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { GridItem } from '@/components/atoms/layout/grid/components/grid-item/grid-item'
import { Grid } from '@/components/atoms/layout/grid/grid'
import { Button } from '@/components/molecules/buttons/button'
import { DropDownMenu } from '@/components/organisms/drop-down-menu/drop-down-menu'
import { useDropDownContext } from '@/features/nav-bar/providers/drop-down-context-provider'
import { useLocalizedNavigation } from '@/hooks/use-localized-navigation'
import { languages, Locale } from '@/i18n/config'
import { setUserLocale } from '@/i18n/server/locale'

type LanguageSwitcherProps = {
  currentLocale: Locale
}

export function LanguageSwitcher({
  currentLocale,
}: LanguageSwitcherProps): ReactElement {
  const router = useRouter()
  const { translateCurrentPath } = useLocalizedNavigation()
  const tCommon = useTranslations('common')
  const { openDropDown, closeDropDown, currentOpenDropDown } =
    useDropDownContext()

  const handleLanguageChange = async (newLocale: Locale): Promise<void> => {
    if (newLocale === currentLocale) {
      return
    }

    // Translate the current pathname to the new locale
    const translatedPath = translateCurrentPath(newLocale)

    // Set the new locale in cookies
    await setUserLocale(newLocale)

    // Navigate to the translated path
    router.push(translatedPath)
  }

  return (
    <DropDownMenu
      trigger={
        <Button
          variant="outline"
          size="sm"
          onClick={() => openDropDown('language-switcher')}
        >
          {languages.find((lang) => lang.code === currentLocale)?.name ||
            'Language'}
        </Button>
      }
      isOpen={currentOpenDropDown === 'language-switcher'}
      id="language-switcher"
    >
      {currentOpenDropDown === 'language-switcher' &&
        languages.map((language) => (
          <Grid columns-xs={1} columns-sm={2} columns-md={3} gap={4}>
            {languages.map(({ code, name, countryName }, idx) => (
              <GridItem col-span={1} key={code}>
                {code} {name} {countryName}
              </GridItem>
            ))}
          </Grid>
        ))}
    </DropDownMenu>
  )
}
