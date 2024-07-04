import { ChevronDown, LogOut, User } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { twJoin } from 'tailwind-merge'
import Link from 'next/link'
import { Button } from '../ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/user')
        setEmail(response.data.email)
        setName(response.data.name)
      } catch (error) {}
    }
    fetchData()
  }, [])

  async function handleLogOut() {
    await api.post('/logout')
    router.push('/')
  }

  return (
    <div className="border-b w-full">
      <div className="flex h-16 items-center gap-6 px-6">
        <nav className="flex items-center ml-20 space-x-4 lg:space-x-6">
          <Link
            href="/city"
            className={twJoin(
              'flex items-center gap-1.5 text-lg font-medium hover:text-foreground',
              pathname === '/city'
                ? 'text-foreground'
                : 'text-muted-foreground',
            )}
          >
            Cidades
          </Link>
          <Link
            href="/neighborhood"
            className={twJoin(
              'flex items-center gap-1.5 text-lg font-medium hover:text-foreground',
              pathname === '/neighborhood'
                ? 'text-foreground'
                : 'text-muted-foreground',
            )}
          >
            Bairros
          </Link>
          <Link
            href="/street"
            className={twJoin(
              'flex items-center gap-1.5 text-lg font-medium hover:text-foreground',
              pathname === '/street'
                ? 'text-foreground'
                : 'text-muted-foreground',
            )}
          >
            Ruas
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex select-none items-center gap-2"
              >
                <User />
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex flex-col">
                <span>{name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {email}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-rose-500 dark:text-rose-400"
                onClick={handleLogOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
