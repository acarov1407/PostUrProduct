import Layout from "@/components/layout/Layout";
import ProductSorter from "@/components/product/ProductSorter";
import { getAllProducts } from "@/data/products";
import ProductsContent from "@/components/product/ProductsContent";
import { useEffect, useState, useRef } from "react";
import useScroll from "@/hooks/useScroll";
import MyError from "@/components/auxiliary/MyError";


export async function getServerSideProps() {

    try {
        const products = await getAllProducts();
        return {
            props: {
                initialProducts: products
            }
        }
    } catch (error) {
        return {
            props: {
                initialError: error.message
            }
        }
    }


}

//CLEAN CODE

function Home({ initialProducts, initialError }) {

    const [products, setProducts] = useState(initialProducts);
    const [sortBy, setSortBy] = useState('created');
    const [loadMoreProducts, setLoadMoreProducts] = useState(true);
    const [loadings, setLoadings] = useState({
        isLoadingProducts: false,
        isLoadingMoreProducts: false
    })
    const [error, setError] = useState(initialError);

    const firstLoad = useRef(true);

    const isEndOfPage = useScroll();

    useEffect(() => {
        const getInitialSortedProducts = async () => {
            setLoadMoreProducts(true);
            setLoadings({ ...loadings, isLoadingProducts: true });
            try {
                const updatedProducts = await getAllProducts(null, sortBy);
                setProducts(updatedProducts);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoadings({ ...loadings, isLoadingProducts: false });
            }
        }

        if (firstLoad.current) {
            firstLoad.current = false;
            return;
        }
        getInitialSortedProducts();

    }, [sortBy]);

    useEffect(() => {
        const getMoreProducts = async () => {
            if (!loadMoreProducts) return;
            console.log('obteniendo productos')
            setLoadings({ ...loadings, isLoadingMoreProducts: true });
            const lastProductId = products[products.length - 1].id;
            try {
                const nextProducts = await getAllProducts(lastProductId, sortBy);
                if (nextProducts.length === 0) {
                    setLoadMoreProducts(false);
                }
                const updatedProducts = [...products, ...nextProducts];
                setProducts(updatedProducts);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoadings({ ...loadings, isLoadingMoreProducts: false });
            }
        }

        if (isEndOfPage) {
            getMoreProducts();
        }

    }, [isEndOfPage]);


    return (
        <Layout>
            {
                !error
                    ?
                    <>
                        <ProductSorter sortBy={sortBy} handleChange={(e) => setSortBy(e.target.value)} />
                        <ProductsContent products={products} loadings={loadings} loadMore={true} />
                    </>
                    :
                    <MyError msg={error} />
            }

        </Layout>
    )
}

export default Home;