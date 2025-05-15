import { PropsWithChildren } from 'react'

import { Container } from '@/components/atoms/layout/container/container'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <Container narrow="sm" padding={false}>
      {children}
    </Container>
  )
}
