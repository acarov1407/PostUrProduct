import React from 'react'

function SubmitButton({ children, isLoading }) {
    return (
        <button
            type="submit"
            className={`${isLoading ? 'bg-indigo-300' : 'bg-indigo-500 hover:bg-indigo-600'} text-white font-medium p-3 rounded mt-4 w-full transition-colors`}
        >
            {children}
        </button>
    )
}

export default SubmitButton