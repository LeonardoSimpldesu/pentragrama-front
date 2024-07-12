import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pentagrama | Cidades',
}

export default function CityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
