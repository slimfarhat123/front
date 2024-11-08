import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Chambres</CardTitle>
          <CardDescription>Manage room information</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/chambres">View Rooms</Link>
          </Button>
        </CardContent>
      </Card>
      {/* You can add more cards for other entities here */}
    </div>
  )
}