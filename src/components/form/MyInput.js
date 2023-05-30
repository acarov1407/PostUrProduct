

function MyInput({ id, name, type, value, onChange, placeholder }) {
    return (
        <input
            type={type}
            id={id}
            name={name}
            className="border-gray-300 border rounded-sm focus:outline-none p-2 w-full focus:border-gray-500"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    )
}

export default MyInput