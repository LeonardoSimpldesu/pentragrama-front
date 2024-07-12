'use client'

import { DataTable } from '@/components/ui/dataTable'
import { columns } from './columns'
import { Header } from '@/components/features/header'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import Navigation from '@/components/features/navigation'
import { neighborhoodDTO, TNeighborhoodDTO } from '../../lib/neighborhoodDTO'
import { useRouter } from 'next/navigation'

export default function Neighborhood() {
  const [data, setData] = useState<TNeighborhoodDTO[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/neighborhood')
        if (response.status === 401) {
          router.push('/')
        }
        const neighborhoods = neighborhoodDTO(response.data.reverse())
        setData(neighborhoods)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Navigation />
      <main className="flex min-h-screen flex-col items-center px-24 pt-10">
        <Header buttonTitle="Novo Bairro" title="Bairros Cadastrados" />
        <DataTable pageOf="neighborhood" columns={columns} data={data} />
      </main>
    </>
  )
}
