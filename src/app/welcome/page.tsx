
import { cookies } from 'next/headers'
import { WelcomePage } from "./components/WelcomePage";

async function getData() {
    const cookieStore = cookies()
    const user_email = cookieStore.get('user_email')
    const email = user_email?.value
    return { email }
}


export default async function Welcome() {

    const { email } = await getData();

    console.log(email)

    if (!email) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            }
        }
    }

    return (
        // <WelcomePage />
        <div>Welcome page - : {JSON.stringify(email)}</div>
    )
}