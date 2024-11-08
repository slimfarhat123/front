'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getChambres, deleteChambre } from '@/lib/api'
import { useRouter } from 'next/navigation'

export default function ChambresList() {
  const [chambres, setChambres] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchChambres = async () => {
      const data = await getChambres()
      setChambres(data)
    }
    fetchChambres()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await deleteChambre(id)
      setChambres(chambres.filter((chambre) => chambre.idChambre !== id))
    } catch (error) {
      console.error('Failed to delete chambre:', error)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Chambres</h1>
        <Button asChild>
          <Link href="/chambres/add">Add Chambre</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Room Number</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chambres.map((chambre) => (
            <TableRow key={chambre.idChambre}>
              <TableCell>{chambre.idChambre}</TableCell>
              <TableCell>{chambre.numeroChambre}</TableCell>
              <TableCell>{chambre.typeC}</TableCell>
              <TableCell>
                <Button asChild variant="outline" size="sm" className="mr-2">
                  <Link href={`/chambres/${chambre.idChambre}`}>Edit</Link>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(chambre.idChambre)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}