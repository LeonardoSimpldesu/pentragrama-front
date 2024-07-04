'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { api } from '@/lib/api'

export type City = {
  id: string
  name: string
  uf: string
  foundedIn: Date
}

async function handleDelete(id: string) {
  try {
    await api.delete(`/city/${id}`)
  } catch (error) {
    console.log(error)
  }
}

export const columns: ColumnDef<City>[] = [
  {
    accessorKey: 'id',
    header: () => <div className="text-left w-10">Identificador</div>,
    cell: ({ row }) => {
      return <div className="text-left w-10">{row.original.id}</div>
    },
  },
  {
    accessorKey: 'name',
    header: 'Cidade',
  },
  {
    accessorKey: 'uf',
    header: 'Estado',
  },
  {
    accessorKey: 'foundedIn',
    header: () => <div className="text-left">Fundado em:</div>,
    cell: ({ row }) => {
      const data: Date = new Date(row.getValue('foundedIn'))
      return (
        <div className="text-left font-medium">
          {data.toLocaleDateString('pt-BR')}
        </div>
      )
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Ações</div>,
    cell: ({ row }) => {
      const cityId = row.original.id
      return (
        <div className="w-full flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="">
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Ver bairros</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Editar</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(cityId)}>
                Apagar registro
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
