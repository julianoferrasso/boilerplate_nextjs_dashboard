import { CardDashboard } from "../components/CardDashboard";

export default function Sales() {
    return (
        <div className="bg-bg-secondary w-full h-full">
            Vendas

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center  items-center pt-1 pl-0 sm:pl-1">
                <CardDashboard />
                <CardDashboard />
                <CardDashboard />
                <CardDashboard />
                <CardDashboard />
                <CardDashboard />
            </div>
        </div>
    )
}