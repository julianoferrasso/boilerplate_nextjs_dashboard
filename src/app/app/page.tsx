import Dashboard from "./components/dashboard";

async function fetchData() {
    // Simulação de fetch de dados
    const data = { message: 'Hello from server-side!' };

    // Fazendo um console.log no lado do servidor
    console.log('Executando fetchData no servidor...');

    return data;
}


export default async function Page() {

    const data = await fetchData();

    return (
        <Dashboard />
    )
}




