'use client'

import {
  ColumnDef,
  getPaginationRowModel,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageOf: 'city' | 'neighborhood' | 'street'
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageOf,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  })

  return (
    <div className=" w-full">
      {pageOf === 'city' ? (
        <div className="flex items-center py-4 gap-2">
          <Input
            placeholder="Filtre por cidade..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Input
            placeholder="Filtre por estado..."
            value={(table.getColumn('uf')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('uf')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
      ) : pageOf === 'neighborhood' ? (
        <div className="flex items-center py-4 gap-2">
          <Input
            placeholder="Filtre por bairro..."
            value={
              (table.getColumn('neighborhood')?.getFilterValue() as string) ??
              ''
            }
            onChange={(event) =>
              table
                .getColumn('neighborhood')
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Input
            placeholder="Filtre por cidade..."
            value={(table.getColumn('city')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('city')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
      ) : pageOf === 'street' ? (
        <div className="flex items-center py-4 gap-2">
          <Input
            placeholder="Filtre por rua..."
            value={
              (table.getColumn('street')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('street')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Input
            placeholder="Filtre por bairro..."
            value={
              (table.getColumn('neighborhood')?.getFilterValue() as string) ??
              ''
            }
            onChange={(event) =>
              table
                .getColumn('neighborhood')
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
      ) : (
        ''
      )}

      <div className="rounded-md border w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
