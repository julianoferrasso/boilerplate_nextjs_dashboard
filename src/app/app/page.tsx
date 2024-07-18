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
        // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center sm:justify-start">
            <CardDashboard />
            <CardDashboard />
            <CardDashboard />
            <CardDashboard />
            <CardDashboard />
            <CardDashboard />
        </div>
    )
}




