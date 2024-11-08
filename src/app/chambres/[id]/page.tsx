'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getChambre, updateChambre } from '@/lib/api'

export default function EditChambre({ params }: { params: Promise<{ id: string }> }) {
  const [chambre, setChambre] = useState<any>(null)
  const [resolvedId, setResolvedId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const resolveParams = async () => {
      const result = await params
      setResolvedId(result.id)
    }
    resolveParams()
  }, [params])

  useEffect(() => {
    const fetchChambre = async () => {
      if (resolvedId) {
        try {
          const data = await getChambre(resolvedId)
          setChambre(data)
        } catch (error) {
          console.error('Failed to fetch chambre:', error)
        }
      }
    }
    fetchChambre()
  }, [resolvedId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateChambre(chambre)
      router.push('/chambres')
    } catch (error) {
      console.error('Failed to update chambre:', error)
    }
  }

  if (!chambre) return <div>Loading...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Chambre</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="numeroChambre">Room Number</Label>
          <Input
            id="numeroChambre"
            type="number"
            value={chambre.numeroChambre || ''}
            onChange={(e) => setChambre({ ...chambre, numeroChambre: parseInt(e.target.value) })}
            required
          />
        </div>
        <div>
          <Label htmlFor="typeC">Room Type</Label>
          <Select 
            value={chambre.typeC} 
            onValueChange={(value) => setChambre({ ...chambre, typeC: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select room type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SIMPLE">Simple</SelectItem>
              <SelectItem value="DOUBLE">Double</SelectItem>
              <SelectItem value="TRIPLE">Triple</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Update Chambre</Button>
      </form>
    </div>
  )
}