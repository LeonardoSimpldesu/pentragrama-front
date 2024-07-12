import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pentagrama | Ruas',
}

export default function StreetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
