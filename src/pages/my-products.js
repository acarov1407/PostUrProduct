import Layout from "@/components/layout/Layout"
import ProtectedLayout from "@/components/layout/ProtectedLayout"
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react"
import useAuth from "@/context/auth/useAuth";
import Link from "next/link";
import ProductSorter from "@/components/product/ProductSorter";
import ProductsContent from "@/components/product/ProductsContent";
import { getUserProductsFromDB } from "@/data/products";
import MyError from "@/components/auxiliary/MyError";

function MyProducts() {

    const [userProducts, setUserProducts] = useState([]);
    const [sortBy, setSortBy] = useState('created');
    const [isLoadingUserProducts, setIsLoadingUserProducts] = useState(true);
    const [error, setError] = useState(null);

    const firstLoad = useRef(true);
    const { isLoadingAuth, authUser } = useAuth();


    useEffect(() => {

        if (!isLoadingAuth) {
            if (authUser?.emailVerified) {
                getUserProducts();
            } else {
                setIsLoadingUserProducts(false);
            }
        }

    }, [isLoadingAuth]);


        useEffect(() => {
            if (firstLoad.current) {
                firstLoad.current = false;
                return;
            }
            getUserProducts();
        }, [sortBy]);

    const getUserProducts = async () => {
        setIsLoadingUserProducts(true);
        setError(null);
        try {
            const products = await getUserProductsFromDB(sortBy, authUser.uid);
            setUserProducts(products);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoadingUserProducts(false);
        }

    }


    return (
        <Layout loading={isLoadingUserProducts}>
            <ProtectedLayout>
                {
                    error
                        ?
                        <MyError msg={error} />
                        :
                        <>
                            <h1 className="text-3xl text-center font-bold border-b border-gray-200 pb-2">Mis Productos</h1>
                            <div className="max-w-2xl mx-auto mt-5">
                                <ProductSorter sortBy={sortBy} handleChange={(e) => setSortBy(e.target.value)} />
                                {
                                    userProducts.length > 0
                                        ?
                                        <ProductsContent products={userProducts} loadings={{ isLoadingProducts: isLoadingUserProducts }} />

                                        :
                                        <div className="mt-5">
                                            <ArchiveBoxIcon className="h-16 w-16 text-gray-600 mx-auto" />
                                            <p className="text-center text-xl mt-2">Aún no tienes productos</p>
                                            <p className="text-center mt-2 text-lg">
                                                Puedes crear un producto
                                                <Link
                                                    href="/new-product"
                                                    className="text-indigo-500 font-medium hover:text-indigo-600 transition-colors"
                                                >
                                                    {' Aquí'}
                                                </Link>
                                            </p>
                                        </div>
                                }
                            </div>
                        </>
                }
            </ProtectedLayout>
        </Layout>
    )
}

export default MyProducts