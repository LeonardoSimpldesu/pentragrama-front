'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

type Header = {
  buttonTitle: string
  title: string
}

export function Header({ buttonTitle, title }: Header) {
  const pathname = usePathname()

  return (
    <div className="w-full">
      <div className="w-full flex gap-4 items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Link href={`${pathname}/create`}>
          <Button className="gap-2">
            <Plus size={18} /> {buttonTitle}
          </Button>
        </Link>
      </div>
    </div>
  )
}
