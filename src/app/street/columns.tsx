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

export type TStreet = {
  id: string
  name: string
  neighborhood: string
}

async function handleDelete(id: string) {
  try {
    await api.delete(`/street/${id}`)
  } catch (error) {
    console.log(error)
  }
}

export const columns: ColumnDef<TStreet>[] = [
  {
    accessorKey: 'id',
    header: () => <div className="text-left w-10">Identificador</div>,
    cell: ({ row }) => {
      return <div className="text-left w-10">{row.original.id}</div>
    },
  },
  {
    accessorKey: 'name',
    header: 'Rua',
  },
  {
    accessorKey: 'neighborhood',
    header: 'Bairro',
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Ações</div>,
    cell: ({ row }) => {
      const streetId = row.original.id
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
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDelete(streetId)}>
                Apagar registro
              </DropdownMenuItem>
              <DropdownMenuItem>Editar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
