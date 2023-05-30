import { LinkIcon, HandThumbUpIcon, Cog6ToothIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon as HandThumbUpIconSolid } from "@heroicons/react/24/solid";
import Layout from "@/components/layout/Layout";
import MyError from "@/components/auxiliary/MyError";
import Image from "next/image";
import { formatDate } from "@/helpers/date.js";
import useAuth from "@/context/auth/useAuth";
import { useEffect, useState } from "react";
import useApp from "@/context/app/useApp";
import { useRouter } from "next/router";
import { limitComments } from "@/helpers/limitData.js";
import ModalComments from "@/components/modals/ModalComments";
import CommentsContainer from "@/components/comment/CommentsContainer";
import { sortComments } from "@/helpers/sorter/sortComments.js";
import CommentForm from "@/components/form/CommentForm";
import ProductAdminPanel from "@/components/product/ProductAdminPanel";

function Product() {

    const router = useRouter();
    useEffect(() => {
        if (!router.query.id) return;
        getProduct(router.query.id)
    }, [router.query.id])

    const { authUser } = useAuth();

    const {
        currentProduct,
        loadings: { isLikingProduct, isLoadingProduct },
        handleLikeProduct,
        getProduct,
        handleModalComments } = useApp();

    const { name, company, likes, comments, image, created, description, URL, owner, votedBy } = currentProduct || {};

    const [displayComments, setDisplayComments] = useState([]);

    useEffect(() => {

        if (!currentProduct?.name) return;
        const sortedComments = sortComments({
            comments: [...comments],
            authorId: authUser?.uid,
            ownerId: owner.id
        });
        setDisplayComments(sortedComments);
    }, [currentProduct, authUser]);


    const showAdminPanel = () => {
        if (!authUser) return false;
        return authUser.uid === owner.id;
    }

    const userHasVoted = votedBy?.some(user => user.id === authUser?.uid);

    return (
        <Layout loading={isLoadingProduct}>
            {
                currentProduct
                    ?
                    <div className="bg-white">
                        <h1 className="text-center text-4xl font-bold border-b border-gray-300 pb-4">{name}</h1>
                        <div className="lg:grid grid-cols-[2fr_1fr] gap-x-8 mt-8">
                            <div className="lg:w-4/5">
                                <Image
                                    height={300}
                                    width={300}
                                    src={image.URL}
                                    alt={`${name} image`}
                                    className="max-w-md w-full block h-auto rounded"
                                    priority={true}
                                />
                                <div className="mt-5">
                                    <p className="text-gray-800 font-medium">Fecha de publicación: <span className="text-gray-600">{formatDate(created)}</span></p>
                                    <p className="text-gray-800 font-medium mt-1">
                                        Autor:
                                        <span className="text-gray-600">{` ${owner?.name}`}</span>
                                        <span className="text-sm text-gray-500">{`, ${company}`}</span>
                                    </p>
                                    <p className="mt-4 leading-loose">{description}</p>
                                </div>
                                {
                                    authUser?.emailVerified &&
                                    <div className="mt-4">
                                        <h2 className="text-lg font-medium">Escribe un comentario</h2>
                                        <CommentForm />
                                    </div>
                                }

                            </div>
                            <aside className="mt-10 lg:m-0">

                                {showAdminPanel() && <ProductAdminPanel product={currentProduct} />}

                                <a
                                    className="p-4 border border-gray-300 flex items-center justify-between font-medium hover:bg-gray-50 transition-colors mt-10"
                                    href={URL}
                                    target="_blank"
                                >
                                    Visitar página del creador
                                    <LinkIcon className="h-6 w-6" />
                                </a>
                                <div className="mt-10">
                                    <p className="text-center">
                                        <span className="font-medium block">{likes}</span>
                                        personas les ha gustado este producto
                                    </p>
                                    {
                                        authUser?.emailVerified &&
                                        <button
                                            type="button"
                                            className="p-3 border border-gray-300 font-medium mt-4 w-full lg:w-1/2 mx-auto hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                            onClick={handleLikeProduct}
                                            disabled={isLikingProduct}
                                        >
                                            <span className={`${userHasVoted ? 'text-indigo-600' : ''}`}>Me gusta</span>
                                            {userHasVoted ? <HandThumbUpIconSolid className="h-5 w-5 text-indigo-600" /> : <HandThumbUpIcon className="h-5 w-5" />}
                                        </button>
                                    }

                                </div>

                                <div className="mt-10 py-4 border-gray-300 border-t">
                                    <h3 className="text-xl font-medium">Comentarios Sobre este producto</h3>
                                    <div className="mt-2 flex flex-col gap-3">
                                        <CommentsContainer comments={limitComments(displayComments, 4)} showViewMore={comments.length > 4} onViewMore={handleModalComments} />
                                    </div>

                                </div>

                            </aside>
                        </div>

                    </div>
                    :
                    <MyError msg="El producto que intentas buscar no existe" />
            }
            <ModalComments comments={displayComments} />
        </Layout>
    )
}

export default Product