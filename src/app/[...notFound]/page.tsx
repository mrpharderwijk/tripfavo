import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

export default function NotFoundCatchAll(): ReactElement {
  notFound()
}
