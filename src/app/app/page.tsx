import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";


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
        <div className="flex">
            <Button >
                <Loader2 className="4-6 w-6 animate-spin" />
                Click me
            </Button>
        </div>
    )

}




