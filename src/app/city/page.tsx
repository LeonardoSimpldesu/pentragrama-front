'use client'
import { DataTable } from '@/components/ui/dataTable'
import { columns } from './columns'
import { Header } from '@/components/features/header'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/features/navigation'
import { cityDTO, TCityDTO } from '@/lib/cityDTO'

export default function City() {
  const [data, setData] = useState<TCityDTO[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/city')
        if (response.status === 401) {
          router.push('/')
        }
        const cities = cityDTO(response.data.reverse())
        setData(cities)
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
        <Header buttonTitle="Nova Cidade" title="Cidades Cadastrada" />
        <DataTable pageOf="city" columns={columns} data={data} />
      </main>
    </>
  )
}
