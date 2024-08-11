import { Card, CardContent } from "./ui/card"

export default function Footer() {
  return (
    <Card className="py-5 pb-0">
      <CardContent>
        <p className="text-sm text-gray-400">
          © 2023 Copyright <span className="font-bold"> FSW Barber</span>
        </p>
      </CardContent>
    </Card>
  )
}
