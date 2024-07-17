/**
 * v0 by Vercel.
 * @see https://v0.dev/t/LSMaGkLIpXl
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-bg-primary px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link href="#" className="flex items-center" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Uma</span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden lg:flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
              Serviços
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
              Sobre
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
              Clientes
            </Link>
            <Link href="/auth" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
              Login
            </Link>
          </nav>
          <Link
            href="/signUp"
            className="inline-flex h-9 items-center justify-center rounded-md bg-green-700 px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Crie sua conta
          </Link>
          <Link
            href="//auth"
            className="inline-flex h-9 items-center justify-center rounded-md bg-green-800 px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-green-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Login
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Soluções digitais inovadoras para o seu negócio
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Transforme sua empresa com nossa equipe de especialistas em tecnologia. Desenvolvemos soluções
                    personalizadas para impulsionar o seu sucesso.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Saiba Mais
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Contate-nos
                  </Link>
                </div>
              </div>
              <img
                src="/placeholder.svg"
                width="550"
                height="310"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Recursos-Chave</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Tudo o que você precisa para o seu negócio
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nossos serviços abrangem desde o desenvolvimento web até a análise de dados, tudo para impulsionar o
                  crescimento da sua empresa.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <img
                src="/placeholder.svg"
                width="550"
                height="310"
                alt="Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Desenvolvimento Web</h3>
                      <p className="text-muted-foreground">
                        Criamos sites e aplicativos web modernos e responsivos para a sua empresa.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Análise de Dados</h3>
                      <p className="text-muted-foreground">
                        Transformamos seus dados em insights valiosos para impulsionar a tomada de decisões.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Estratégia Digital</h3>
                      <p className="text-muted-foreground">
                        Desenvolvemos estratégias digitais personalizadas para alcançar seus objetivos de negócios.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                O que nossos clientes dizem
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Conheça os depoimentos de empresas que confiam em nossos serviços.
              </p>
            </div>
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch justify-center gap-6">
              <Card className="p-6 bg-background shadow-sm transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold">John Doe</h4>
                      <p className="text-sm text-muted-foreground">CEO, Acme Inc.</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-muted-foreground">
                    &quot;A equipe da Uma entregou um projeto incrível que\n transformou nosso negócio. Eles são
                    verdadeiros\n profissionais!&quot;
                  </blockquote>
                </CardContent>
              </Card>
              <Card className="p-6 bg-background shadow-sm transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold">Jane Doe</h4>
                      <p className="text-sm text-muted-foreground">CMO, Globex Inc.</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-muted-foreground">
                    &quot;Trabalhar com a Uma foi uma experiência incrível. Eles\n entenderam nossas necessidades e criaram
                    uma solução\n perfeita.&quot;
                  </blockquote>
                </CardContent>
              </Card>
              <Card className="p-6 bg-background shadow-sm transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold">Bob Smith</h4>
                      <p className="text-sm text-muted-foreground">CTO, Stark Industries</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-muted-foreground">
                    &quot;A equipe da Uma é excepcional. Eles entregaram o projeto\n no prazo e superaram nossas
                    expectativas.&quot;
                  </blockquote>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Pronto para transformar seu negócio?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Entre em contato com nossa equipe e vamos discutir como podemos ajudar a impulsionar o crescimento da
                  sua empresa.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" type="text" placeholder="Digite seu nome" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Digite seu email" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea id="message" rows={4} placeholder="Digite sua mensagem" />
                  </div>
                  <Button type="submit" className="w-full">
                    Enviar
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">Empresa</h3>
            <Link href="#" prefetch={false}>
              Sobre Nós
            </Link>
            <Link href="#" prefetch={false}>
              Equipe
            </Link>
            <Link href="#" prefetch={false}>
              Carreiras
            </Link>
            <Link href="#" prefetch={false}>
              Notícias
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Serviços</h3>
            <Link href="#" prefetch={false}>
              Desenvolvimento Web
            </Link>
            <Link href="#" prefetch={false}>
              Análise de Dados
            </Link>
            <Link href="#" prefetch={false}>
              Estratégia Digital
            </Link>
            <Link href="#" prefetch={false}>
              Consultoria
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Recursos</h3>
            <Link href="#" prefetch={false}>
              Blog
            </Link>
            <Link href="#" prefetch={false}>
              Comunidade
            </Link>
            <Link href="#" prefetch={false}>
              Suporte
            </Link>
            <Link href="#" prefetch={false}>
              FAQ
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <Link href="#" prefetch={false}>
              Política de Privacidade
            </Link>
            <Link href="#" prefetch={false}>
              Termos de Serviço
            </Link>
            <Link href="#" prefetch={false}>
              Política de Cookies
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Contato</h3>
            <Link href="#" prefetch={false}>
              Suporte
            </Link>
            <Link href="#" prefetch={false}>
              Vendas
            </Link>
            <Link href="#" prefetch={false}>
              Imprensa
            </Link>
            <Link href="#" prefetch={false}>
              Parcerias
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}


function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}