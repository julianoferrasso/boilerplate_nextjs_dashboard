import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div>
      <h1>Landing Page</h1>

      <Button className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-blue-800" name="signUp" type="submit">
        <Link href="/signUp">
          Crie sua conta
        </Link>
      </Button>
      <Button className="w-full py-2 mt-4 text-white bg-green-600 rounded-md hover:bg-blue-800" name="signUp" type="submit">
        <Link href="/auth">
          Login
        </Link>
      </Button>
    </div>
  );
}
