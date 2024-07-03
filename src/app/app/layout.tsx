import Header from "./components/Header"
import Sidebar from "./components/Sidebar"

export default function SideBarLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex items-start justify-start min-h-screen">
            <Sidebar />
            <main className="flex flex-col w-full h-full overflow-hidden">
                <Header />
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