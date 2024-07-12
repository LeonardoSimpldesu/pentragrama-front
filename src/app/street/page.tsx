'use client'

import { DataTable } from '@/components/ui/dataTable'
import { columns } from './columns'
import { Header } from '@/components/features/header'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import Navigation from '@/components/features/navigation'
import { streetDTO, TStreetDTO } from '../../lib/streetDTO'

export default function Neighborhood() {
  const [data, setData] = useState<TStreetDTO[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/street')
        if (response.status === 401) {
          router.push('/')
        }
        const streets = streetDTO(response.data.reverse())
        setData(streets)
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
        <Header buttonTitle="Nova Rua" title="Ruas Cadastradas" />
        <DataTable pageOf="street" columns={columns} data={data} />
      </main>
    </>
  )
}
