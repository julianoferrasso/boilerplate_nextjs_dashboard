import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { CardDashboard } from "./components/CardDashboard";


async function fetchData() {
    // Simulação de fetch de dados
    // const data = { message: 'Hello from server-side!' };

    // Fazendo um console.log no lado do servidor
    // console.log('Executando fetchData no servidor...');

    //return data;
}

export default async function Page() {
    //const data = await fetchData();

    return (
        <div className="flex h-60 w-full items-center justify-center bg-bg-tertiary">

            {/* <CardDashboard />
            <CardDashboard />
            <CardDashboard />
            <CardDashboard />
            <CardDashboard />
            <CardDashboard /> */}
        </div>
    )

}




