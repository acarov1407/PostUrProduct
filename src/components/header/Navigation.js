import Link from "next/link"
import useAuth from "@/context/auth/useAuth"

function Navigation() {

    const { authUser } = useAuth();

    return (
        <nav
            className="flex flex-col lg:flex-row gap-5 text-gray-700 mt-5 lg:mt-0 flex-1"
        >
            <Link
                href="/"
                className="hover:text-indigo-600"
            >Inicio</Link>
            <Link
                href="/popular"
                className="hover:text-indigo-600"
            >Populares</Link>
            {
                authUser?.emailVerified &&
                <Link
                    href="/new-product"
                    className="hover:text-indigo-600"
                >Nuevo Producto</Link>
            }

        </nav>
    )
}

export default Navigation