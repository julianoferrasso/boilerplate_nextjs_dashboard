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
                <div className="flex flex-col items-start justify-start w-full h-[calc(100vh-64px)] overflow-hidden bg-green-500">
                    <div className="overflow-y-auto overflow-x-hidden w-full h-full p-2 box-border break-words  bg-blue-800">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}