import { XMarkIcon } from "@heroicons/react/24/outline"

function CloseButton({ onClick }) {
    return (
        <button
            className="text-gray-700 hover:text-black"
            onClick={onClick}
        ><XMarkIcon className="h-6 w-6" /></button>
    )
}

export default CloseButton