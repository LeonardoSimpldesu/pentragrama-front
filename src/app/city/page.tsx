'use client'
import { DataTable } from '@/components/ui/dataTable'
import { columns } from './columns'
import { Header } from '@/components/features/header'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/features/navigation'

export default function City() {
  const [data, setData] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/city')
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
        <Header buttonTitle="Nova Cidade" title="Cidades Cadastrada" />
        <DataTable pageOf="city" columns={columns} data={data} />
      </main>
    </>
  )
}
