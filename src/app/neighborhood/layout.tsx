import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pentagrama | Bairros',
}

export default function NeighborhoodLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
