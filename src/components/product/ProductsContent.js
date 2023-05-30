import Spinner from "../auxiliary/Spinner"
import SmallSpinner from "../auxiliary/SmallSpinner"
import Product from "./Product"

function ProductsContent({ products, loadings, loadMore = false }) {
    return (
        <div className="mt-5 relative">
            <div className={`grid gap-4 ${loadings.isLoadingProducts ? 'opacity-30' : ''}`}>
                {
                    products.map(product => (
                        <Product product={product} key={product.id} />
                    ))
                }
            </div>

            {
                loadMore &&
                <div>
                    {loadings.isLoadingMoreProducts && <SmallSpinner />}
                </div>
            }

            {
                loadings.isLoadingProducts &&
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4">
                    <Spinner />
                </div>
            }
        </div>
    )
}

export default ProductsContent