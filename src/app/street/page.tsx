'use client'

import { DataTable } from '@/components/ui/dataTable'
import { columns } from './columns'
import { Header } from '@/components/features/header'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import Navigation from '@/components/features/navigation'

export default function Neighborhood() {
  const [data, setData] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/street')
        setData(response.data)
      } catch (error) {
        router.push('/')
      }
    }
    fetchData()
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
