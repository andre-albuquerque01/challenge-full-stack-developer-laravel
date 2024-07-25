import { Card } from '@/components/card/card'
import { Header } from '@/components/header/nav'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="">
      <Header />
      <Card>{children}</Card>
    </div>
  )
}
