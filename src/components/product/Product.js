import Image from "next/image"
import { ChatBubbleLeftIcon, ArrowUpCircleIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { ArrowUpCircleIcon as ArrowUpCircleIconSolid } from "@heroicons/react/24/solid";
import Link from "next/link";
import { formatDate } from "@/helpers/date.js";
import { useRouter } from "next/router";
import useAuth from "@/context/auth/useAuth";

function Product({ product }) {

    const { id, name, image, description, likes, comments, created, owner, votedBy } = product;

    const { authUser } = useAuth();

    const router = useRouter();


    const showAdminPanel = () => {
        return router.pathname === '/my-products' && authUser.uid === owner.id;
    }

    const userHasVoted = () => {
        return votedBy?.some(user => user.id === authUser?.uid);
    }

    return (
        <div className="bg-white border-b-2 rounded-lg border-gray-400 flex flex-col md:flex-row gap-5 items-start p-4">

            <Image
                src={image.URL}
                alt={`${name} image`}
                height={150}
                width={150}
                className="w-full max-w-[300px] md:max-w-[200px] rounded block"
                loading="lazy"
            />

            <div className="flex-1 grid h-full auto-rows-min gap-2">
                <div className="flex items-start justify-between">
                    <Link
                        href={`/products/${id}`}
                        className="font-bold text-gray-700 text-lg block leading-none"
                    >
                        {name}
                    </Link>
                    <div className="flex items-center gap-1">
                        <span className="font-medium">{likes}</span>
                        {
                            userHasVoted() ? <ArrowUpCircleIconSolid className="h-6 w-6" /> : <ArrowUpCircleIcon className="h-6 w-6 text-gray-700" />
                        }

                    </div>
                </div>
                <div className="w-4/5">
                    <p className="text-gray-600 line-clamp-4">{description}</p>
                </div>
                <div className="mt-2">
                    <Link
                        href={`/products/${id}`}
                        className="inline-flex items-center gap-3 py-1 px-2 border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                        <ChatBubbleLeftIcon className="h-5 w-5" />
                        <span className="font-medium">{`${comments.length} comentarios`}</span>
                    </Link>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-sm">{`Publicado el ${formatDate(created)}`}</p>
                    {
                        showAdminPanel() &&
                        <Link
                            href={`/products/${id}`}
                            className="flex items-center gap-2 text-sm font-medium group p-2 hover:underline text-gray-700 hover:text-black transition-colors"
                        >
                            Ver producto
                            <ArrowRightIcon className="h-4 w-4 group-hover:-rotate-45 transition-all" />
                        </Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default Product