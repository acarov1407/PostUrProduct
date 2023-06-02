import Header from "../header/Header"
import Head from "next/head"
import LoadingView from "../auxiliary/LoadingView";
import useAuth from "@/context/auth/useAuth";
import ModalSearchProduct from "../modals/ModalSearchProduct";
import ModalError from "../modals/ModalError";


function Layout({ children, loading }) {

    const { isLoadingAuth } = useAuth();

    if (isLoadingAuth || loading) return <LoadingView />
    return (
        <>
            <Head>
                <title>PostUrProduct</title>
            </Head>
            <Header />
            <main className="bg-white mt-[90px] default-height mb-8">
                <div className="container mx-auto py-8">
                    {children}
                </div>

            </main>
            <footer className="h-8 flex items-center justify-center bg-white border-t border-gray-300 fixed bottom-0 left-0 w-full">
                <p className="text-center text-gray-500 text-sm">Hecho por Andrés Caro Velandia © 2023</p>
            </footer>
            <ModalSearchProduct />
            <ModalError />
        </>
    )
}

export default Layout