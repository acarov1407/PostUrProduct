import Link from "next/link"
import useAuth from "@/context/auth/useAuth"
import { useRouter } from "next/router";

function Navigation() {

    const { authUser } = useAuth();
    const router = useRouter();

    const routes = {
        index: '/',
        popular: '/popular',
        newProduct: '/new-product'
    }

    return (
        <nav
            className="flex flex-col lg:flex-row gap-5 text-gray-700 mt-5 lg:mt-0 flex-1"
        >
            <Link
                href={routes.index}
                className={`hover:text-indigo-600 ${router.pathname === routes.index ? 'text-indigo-600 font-medium': ''}`}
            >Inicio</Link>
            <Link
                href={routes.popular}
                className={`hover:text-indigo-600 ${router.pathname === routes.popular ? 'text-indigo-600 font-medium': ''}`}
            >Populares</Link>
            {
                authUser?.emailVerified &&
                <Link
                    href={routes.newProduct}
                    className={`hover:text-indigo-600 ${router.pathname === routes.newProduct ? 'text-indigo-600 font-medium': ''}`}
                >Nuevo Producto</Link>
            }

        </nav>
    )
}

export default Navigation