import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from 'react'
import ResponsiveMenu from './ResponsiveMenu'
import ProductSearcher from "../product/ProductSearcher"
import Navigation from './Navigation'
import useAuth from "@/context/auth/useAuth"

function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { authUser, logout } = useAuth();


    //Close responsive menu if user resize page
    useEffect(() => {
        const checkScreenWidth = () => {
            const windowWidth = window.innerWidth;

            if (windowWidth >= 1024) {
                setIsMenuOpen(false);
            }

        }

        window.addEventListener('resize', checkScreenWidth);

        return () => {
            window.removeEventListener('resize', checkScreenWidth);
        };

    }, [])

    return (
        <header className="fixed top-0 left-0 w-full bg-white h-[90px] border-b border-gray-300 z-30">
            <div className="flex items-center p-5 justify-between sm:gap-5 container mx-auto">

                <button
                    type="button"
                    className="text-gray-700 mr-4 lg:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}

                </button>

                <Link
                    className="flex items-center cursor-pointer"
                    href="/"
                >
                    <Image width={35} height={35} src="/assets/img/app_logo.png" alt="posturproduct logo" className="rounded-full block mr-4 w-[40px] h-auto" />
                    <h1 className="text-2xl text-gray-900 font-bold hidden sm:block">Post<span className="text-gray-600">Ur</span>Product</h1>
                </Link>

                <div className="hidden lg:flex items-center flex-1 gap-8">
                    <ProductSearcher />
                    <Navigation />
                </div>

                {
                    authUser?.emailVerified
                        ?
                        <div className="relative cursor-pointer">
                            <p className="border border-gray-300 py-2 px-5 rounded-sm text-sm text-center font-medium peer w-48">
                                {authUser.displayName}
                            </p>
                            <div className="absolute right-0 w-48 hidden peer-hover:block hover:block">
                                <div className="rounded-sm bg-gray-600 h-1 mt-2"></div>
                                <ul className="border border-gray-300 bg-white p-5 flex flex-col gap-5 text-sm text-center">
                                    <li>
                                        <Link href="/my-products" className="p-2 block hover:text-indigo-600 border-b border-gray-400">Mis Productos</Link>
                                    </li>
                                    <li>
                                        <button
                                            type="button"
                                            className="bg-indigo-500 hover:bg-indigo-600 transition-colors px-2 py-1 w-full rounded-sm text-white"
                                            onClick={logout}
                                        >
                                            Cerrar Sesión
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        :
                        <div>
                            <Link
                                href="/auth/login"
                                className="p-3 text-gray-900 mr-4 hover:text-indigo-600 transition-colors font-medium text-sm sm:text-base"
                            >Iniciar Sesión</Link>
                            <Link
                                href="/auth/register"
                                className="bg-indigo-500 p-3 rounded text-white font-medium hover:bg-indigo-600 transition-colors text-sm sm:text-base"
                            >Regístrate</Link>
                        </div>

                }

                {
                    isMenuOpen && <ResponsiveMenu />
                }


            </div>


        </header>
    )
}

export default Header