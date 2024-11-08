'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addChambre } from '@/lib/api'

export default function AddChambre() {
  const [numeroChambre, setNumeroChambre] = useState('')
  const [typeC, setTypeC] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const chambreData = {
        numeroChambre: parseInt(numeroChambre),
        typeC
      }
  
      await addChambre(chambreData)
      router.push('/chambres')
    } catch (error) {
      console.error('Failed to add chambre:', error)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add Chambre</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="numeroChambre">Room Number</Label>
          <Input
            id="numeroChambre"
            type="number"
            value={numeroChambre}
            onChange={(e) => setNumeroChambre(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="typeC">Room Type</Label>
          <Select onValueChange={setTypeC} required>
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
        <Button type="submit">Add Chambre</Button>
      </form>
    </div>
  )
}