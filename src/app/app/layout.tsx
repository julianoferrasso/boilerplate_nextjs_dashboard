import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import HeaderMobile from "./components/HeaderMobile"

export default function SideBarLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col sm:flex-row items-start justify-start bg-bg-primary">

            {/* Sidebar para Tablet e Desktop */}
            <div className="min-h-screen hidden sm:block">
                <Sidebar />
            </div>
            {/* Header para Mobile */}
            <div className="sm:hidden w-full">
                <HeaderMobile />
            </div>
            <main className="flex flex-col w-full h-full overflow-hidden">

                {/* Header para Tablet e Desktop */}
                <div className="hidden sm:block ">
                    <Header />
                </div>

                {/* Conteudo principal */}
                <main className="flex items-start justify-start w-full h-[calc(100vh-64px)] overflow-hidden bg-bg-primary">

                    <div className="overflow-y-auto overflow-x-hidden w-full h-full pl-0 sm:pl-1 pt-1 box-border break-words">
                        <div className="w-full h-full flex items-start flex-wrap">
                            {children}
                        </div>
                    </div>

                </main>
            </main>
        </div>
    )
}