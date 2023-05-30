import Alert from "../auxiliary/Alert"

function MyField({ children, id, label, margin, error }) {
    return (
        <div className={`${margin ? 'mb-5' : ''}`}>
            <label htmlFor={id} className="block mb-1 text-gray-900 font-medium">{label}</label>
            {children}
            {error && <Alert msg={error} />}
        </div>
    )
}

export default MyField