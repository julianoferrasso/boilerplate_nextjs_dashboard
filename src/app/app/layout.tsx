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
            <div className="min-h-screen hidden sm:block">
                <Sidebar />
            </div>
            <div className="sm:hidden w-full">
                <HeaderMobile />
            </div>
            <main className="flex flex-col w-full h-full overflow-hidden">
                <div className="hidden sm:block ">
                    <Header />
                </div>
                <div className="flex flex-col pt-2 items-start justify-start w-full h-[calc(100vh-64px)] overflow-hidden bg-bg-primary">
                    <div className="overflow-y-auto overflow-x-hidden w-full h-full px-4 box-border break-words">
                        <div className="w-full h-full flex items-start flex-wrap">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}