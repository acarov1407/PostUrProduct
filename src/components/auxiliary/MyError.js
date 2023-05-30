import { FaceFrownIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

function MyError({ msg }) {
    return (
        <div>
            <FaceFrownIcon className="h-20 w-20 mx-auto text-gray-600" />
            <div className="text-center">
                <p className="text-3xl mt-5">Ha ocurrido un error</p>
                <p className="text-lg mt-5">{msg ?? 'Esta página puede no estar disponible'}</p>
                <Link
                    href="/"
                    className="block mt-5 font-medium group p-2 hover:underline text-gray-700 hover:text-black transition-colors"
                >Volver a Inicio</Link>
            </div>
        </div>
    )
}

export default MyError