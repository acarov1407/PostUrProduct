import { useEffect, useRef } from "react"


function MyTextArea({ id, name, onChange, value }) {

    const inputRef = useRef(null);

    const adjustInputHeight = () => {
        const { current } = inputRef;
        current.style.height = 'auto';
        current.style.height = `${current.scrollHeight}px`;
    }

    useEffect(() => {
        adjustInputHeight();
    }, [])

    const handleChange = (e) => {
        adjustInputHeight();
        onChange(e);
    }


    return (
        <textarea
            ref={inputRef}
            id={id}
            name={name}
            className="border-gray-300 border rounded-sm focus:outline-none p-2 resize-none w-full block overflow-hidden focus:border-gray-400"
            rows={4}
            value={value}
            onChange={handleChange}
        />
    )
}

export default MyTextArea