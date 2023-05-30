import { FaceFrownIcon } from "@heroicons/react/24/outline";
import useAuth from "@/context/auth/useAuth";
import Link from "next/link";

function ProtectedLayout({ children }) {

    const { authUser } = useAuth();

    return (
        authUser?.emailVerified
            ?
            <>
                {children}
            </>
            :
            <div className="text-center">
                <FaceFrownIcon className="h-20 w-20 mx-auto text-gray-600" />
                <p className="text-3xl mt-5">Lo sentimos</p>
                <p className="text-lg mt-5">Esta página no está disponible</p>
                <Link
                    href="/"
                    className="block mt-5 font-medium group p-2 hover:underline text-gray-700 hover:text-black transition-colors"
                >Volver a Inicio</Link>
            </div>

    )
}

export default ProtectedLayout