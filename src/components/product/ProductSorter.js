

function ProductSorter({ sortBy, handleChange }) {


    return (
        <div className="flex items-center gap-4 p-5 border-b border-gray-200">
            <label
                htmlFor="product-sorter"
                className="font-medium">Ordenar Por:</label>
            <select
                id="product-sorter"
                value={sortBy}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-700 ">
                <option value="created">Más Recientes</option>
                <option value="likes">Más gustados</option>
                <option value="commentsCount">Más comentados</option>
            </select>
        </div>
    )
}

export default ProductSorter