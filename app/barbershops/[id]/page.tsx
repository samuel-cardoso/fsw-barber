import { Button } from "@/app/_components/ui/button"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

export default async function BarbershopPage({ params }: BarbershopPageProps) {
  //  O uso de async na função BarbershopPage é necessário porque a função está executando uma operação assíncrona ao consultar o banco de dados com db.barbershop.findUnique. A operação de consulta ao banco de dados pode levar algum tempo para ser concluída, e o uso de await é necessário para esperar que essa operação termine antes de continuar a execução da função.

  // Aqui está o porquê de cada parte:

  // Assincronismo com async: A palavra-chave async indica que a função retorna uma Promise e permite o uso de await dentro dela.

  // Operação assíncrona com await: O await é usado para pausar a execução da função até que a operação assíncrona (neste caso, db.barbershop.findUnique) seja concluída. Isso garante que o código abaixo de await (neste caso, o retorno do JSX com o nome da barbearia) só seja executado após a consulta ao banco de dados ter retornado o resultado.

  // Sem o async e await, o código tentaria retornar o valor de barbershop antes que a consulta ao banco de dados fosse concluída, resultando em comportamentos inesperados, como undefined sendo retornado.

  // Então, o async é necessário para garantir que a consulta ao banco de dados seja tratada corretamente antes de continuar com a renderização da página.

  // chamar o banco de dados - uma query(consulta) no banco
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
  })

  // O notFound que estou usando na função vem do módulo next/navigation do Next.js. Ele serve para redirecionar o usuário para uma página de erro 404 (página não encontrada) quando algum recurso solicitado não existe ou não pode ser encontrado.

  // No contexto do código, o notFound é chamado quando o sistema tenta buscar uma barbearia no banco de dados com o db.barbershop.findUnique({ where: { id: params.id } }), mas não encontra um registro correspondente (ou seja, barbershop é null ou undefined).

  // Quando isso acontece, a função notFound() interrompe a execução da página atual e redireciona o usuário para a página de erro padrão do Next.js ou para uma página 404 personalizada, caso ela exista.

  // Resumo do fluxo:
  // A função tenta buscar a barbearia com o id fornecido nos parâmetros.
  // Se não for encontrada (if (!barbershop)), a função notFound() é chamada.
  // Isso sinaliza ao Next.js que a página solicitada não existe, e ele renderiza uma página de erro 404.

  if (!barbershop) {
    return notFound()
  }

  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Image
          alt={barbershop.name}
          src={barbershop?.imageUrl}
          fill
          className="object-cover"
        />

        <Button
          asChild
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Button
          size="icon"
          variant="secondary"
          className="absolute right-4 top-4"
        >
          <MenuIcon />
        </Button>
      </div>

      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barbershop?.name}</h1>

        <div className="mb-2 flex items-center gap-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop?.address}</p>
        </div>

        <div className="flex items-center gap-2">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">5,0 (789 avaliações)</p>
        </div>
      </div>

      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>
        <p className="text-justify text-sm">{barbershop?.description}</p>
      </div>
    </div>
  )
}
