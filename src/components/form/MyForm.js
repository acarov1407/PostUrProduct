

function MyForm({ children, onSubmit, border = true }) {
    return (
        <form className={`shadow bg-white rounded p-6 border-gray-100 ${border ? 'border' : ''}`} onSubmit={onSubmit}>
            {children}
        </form>
    )
}

export default MyForm