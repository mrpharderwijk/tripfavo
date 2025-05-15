'use client'

import { useTranslation } from 'react-i18next'

import { Container } from '@/components/atoms/layout/container/container'
import { Branding } from '@/components/molecules/branding/branding'

export const Header = () => {
  const { t } = useTranslation()

  return (
    <header className="w-full border-b border-gray-light h-20 flex items-center">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Branding />
          </div>
          {/* <MainNav /> */}
          <div className="flex items-center gap-4">
            {/* <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button> */}
          </div>
        </div>
      </Container>
    </header>

    // <header className="py-5">
    //   <nav>
    //     <Container className="flex items-center justify-between">
    //       <Link href="/" title={t('common.homepage')}>
    //         <BlogLogo />
    //       </Link>
    //       <LanguageSelector />
    //     </Container>
    //   </nav>
    // </header>
  )
}
