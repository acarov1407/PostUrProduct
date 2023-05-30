import Navigation from "./Navigation"
import ProductSearcher from "../product/ProductSearcher"

function ResponsiveMenu() {
    return (
        <div className="fixed bg-white top-[90px] left-0 w-full h-full p-5">
            <ProductSearcher />
            <Navigation />
        </div>
    )
}

export default ResponsiveMenu