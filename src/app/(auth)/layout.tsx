import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pentagrama | Cidades',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="grid min-h-screen grid-cols-2 justify-center items-center">
      <div className="hidden lg:flex h-full flex-col justify-between border-r border-foreground/5 bg-primary p-10 text-white"></div>
      <div className="col-span-2 flex flex-col items-center justify-center lg:col-span-1">
        <div className="p-8 ">{children}</div>
      </div>
    </main>
  )
}
