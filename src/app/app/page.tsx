import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { CardDashboard } from "./components/CardDashboard";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";


async function fetchData() {
    // Simulação de fetch de dados
    // const data = { message: 'Hello from server-side!' };

    // Fazendo um console.log no lado do servidor
    // console.log('Executando fetchData no servidor...');

    //return data;
}

export default async function Dashboard() {
    //const data = await fetchData();

    return (
        <div className="flex items-center justify-center ">

            <CardDashboard />
            <CardDashboard />
            <CardDashboard />
            <CardDashboard />
            <CardDashboard />
            <CardDashboard />
        </div>
    )

}




