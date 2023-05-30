import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import useApp from "@/context/app/useApp"
import { useRef } from "react";

function ProductSearcher() {
    const { handleModalSearchProduct } = useApp();
    const inputRef = useRef(null);

    const removeFocus = () => {
        if (inputRef.current) {
            inputRef.current.blur();
        }
    };

    return (
        <div className="relative flex-1 lg:max-w-[200px] xl:max-w-xs" onClick={handleModalSearchProduct}>
            <input
                type="search"
                className="border border-gray-400 py-2 pl-9 pr-2 focus:outline-none w-full"
                placeholder="Buscar Producto..."
                autoComplete="off"
                onFocus={removeFocus}
                ref={inputRef}
            />
            <span className="absolute top-1/2 left-0 text-gray-500 -translate-y-1/2 p-2">
                <MagnifyingGlassIcon className="w-5 h-5" />
            </span>

        </div>
    )
}

export default ProductSearcher