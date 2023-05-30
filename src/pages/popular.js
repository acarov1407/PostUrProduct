import Layout from "@/components/layout/Layout"
import { getPopularProducts } from "@/data/products";
import ProductsContent from "@/components/product/ProductsContent";
import useScroll from "@/hooks/useScroll";
import { useEffect, useState } from "react";
import MyError from "@/components/auxiliary/MyError";

export async function getServerSideProps() {
  try {
    const products = await getPopularProducts();
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

function Popular({ initialProducts, initialError }) {

  const [popularProducts, setPopularProducts] = useState(initialProducts);
  const [isLoadingMoreProducts, setIsLoadingMoreProducts] = useState(false);
  const [loadMoreProducts, setLoadMoreProducts] = useState(true);
  const [error, setError] = useState(initialError);
  const isEndOfPage = useScroll();

  useEffect(() => {
    const getMorePopularProducts = async () => {
      if (!loadMoreProducts) return;
      setIsLoadingMoreProducts(true);
      const lastProductId = popularProducts[popularProducts.length - 1].id;
      try {
        const nextProducts = await getPopularProducts(lastProductId);
        if (nextProducts.length === 0) {
          setLoadMoreProducts(false);
        }
        const updatedProducts = [...popularProducts, ...nextProducts];
        setPopularProducts(updatedProducts);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoadingMoreProducts(false);
      }
    }

    if (isEndOfPage) {
      getMorePopularProducts();
    }

  }, [isEndOfPage]);

  return (
    <Layout>
      {
        error
          ?
          <MyError msg={error} />
          :
          <>
            <h1 className="text-3xl text-center font-bold border-b border-gray-200 pb-2">Lo más popular</h1>
            <ProductsContent products={popularProducts} loadings={{ isLoadingProducts: false, isLoadingMoreProducts }} loadMore={true} />
          </>
      }

    </Layout>
  )
}

export default Popular