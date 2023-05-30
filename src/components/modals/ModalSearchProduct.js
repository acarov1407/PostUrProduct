import MyModal from "./MyModal";
import useApp from "@/context/app/useApp";
import { MagnifyingGlassIcon, ArrowRightCircleIcon, ArchiveBoxIcon } from "@heroicons/react/24/outline";
import ProductsContent from "../product/ProductsContent";
import { useState } from "react";
import { getProductsByName } from "@/data/products";
import MyError from "../auxiliary/MyError";
import SmallSpinner from "../auxiliary/SmallSpinner";

function ModalSearchProduct() {

    const [searchedProducts, setSearchedProducts] = useState([]);
    const [existResults, setExistResults] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { modals: { modalSearchProduct }, handleModalSearchProduct } = useApp();

    const searchProduct = async () => {
        setExistResults(true);
        if (searchTerm === '') {
            return;
        }
        setIsLoading(true);
        try {
            const products = await getProductsByName(searchTerm);
            if (products.length === 0) {
                setExistResults(false);
            }
            setSearchedProducts(products);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    const handleClose = () => {
        setSearchTerm('');
        setSearchedProducts([]);
        handleModalSearchProduct();
    }

    return (
        <MyModal isOpen={modalSearchProduct} onRequestClose={handleClose} title="Busca un producto">
            <div className="mt-5 flex items-center border-b border-gray-300 p-2 gap-2">
                <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
                <input
                    id="query"
                    name="query"
                    type="text"
                    className="focus:outline-none w-full"
                    placeholder="Buscar Producto..."
                    autoFocus={true}
                    autoComplete="off"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    type="button"
                    onClick={searchProduct}
                    className="py-2 px-4 flex items-center gap-2 text-sm font-medium bg-gray-200 rounded-sm hover:bg-gray-300 transition-colors"
                >
                    <span>Buscar</span>
                    <ArrowRightCircleIcon className="w-6 h-6 text-gray-700" />
                </button>

            </div>
            {
                error
                    ?
                    <MyError msg={error} />
                    :
                    <>
                        {
                            isLoading
                                ?
                                <div className="">
                                    <SmallSpinner />
                                </div>
                                :
                                existResults ?
                                    <ProductsContent products={searchedProducts} loadMore={false} loadings={{ isLoadingProducts: false }} /> :
                                    <div className="flex flex-col items-center mt-8 h-full">
                                        <p className="text-gray-600 mt-5 text-lg font-medium">Tu búsqueda no ha arrojado resultados</p>
                                        <span className="text-gray-600 mt-4">
                                            <ArchiveBoxIcon className="h-24 w-24" />
                                        </span>
                                    </div>
                        }

                    </>

            }

        </MyModal>
    )
}

export default ModalSearchProduct