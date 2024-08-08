// Todos os componentes no Next.js são por padrão server components
"use client"

import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"

export default function Home() {
  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Samuel!</h2>
        <p>Quinta-feira, 08 de agosto.</p>
        <div className="mt-6 flex items-center gap-2">
          <Input type="text" placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende nos melhores dom FSW Barber"
            src="/banner-01.png"
            fill
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  )
}
