import Image from "next/image";
import useAuth from "@/context/auth/useAuth";
import useApp from "@/context/app/useApp";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import useComponentVisible from "@/hooks/useComponentVisible";
import CommentForm from "../form/CommentForm";

function Comment({ comment }) {


    const [commentHover, setCommentHover] = useState(false);
    const [isOnEditionMode, setIsOnEditionMode] = useState(false);


    const { id, author, msg } = comment;

    const { authUser } = useAuth();
    const { currentProduct, deleteComment } = useApp();

    const { openerRef, ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);


    const isCommentOwner = () => {
        return authUser?.uid === author.id;
    }

    const isProductOwner = () => {
        return author.id === currentProduct.owner.id;
    }

    const handleClickMenu = () => {
        setIsComponentVisible(!isComponentVisible);
    }

    const handleDelete = () => {
        setIsComponentVisible(false);
        deleteComment(id);
    }

    const handleEdit = () => {
        setIsComponentVisible(false);
        setIsOnEditionMode(!isOnEditionMode);
    }


    return (
        <div
            className="p-3 flex items-start gap-4 border-b border-gray-200 rounded-lg relative"
            onMouseEnter={() => setCommentHover(true)}
            onMouseLeave={() => setCommentHover(false)}
        >
            <Image
                src="/assets/img/user.jpg"
                alt="User icon"
                height={60}
                width={60}
                className="rounded"
            />
            <div className="flex-1">
                <p className="leading-none text-gray-700 font-medium flex items-center gap-2">
                    {`${author.name} ${isCommentOwner() ? '(Tú)' : ''}`}
                    {
                        isProductOwner() && <span className="p-1 bg-blue-500 text-white text-xs rounded">Creador</span>
                    }
                </p>

                {
                    isOnEditionMode ? 
                    <>
                    <button className="text-blue-600 p-1 text-xs mt-2 hover:text-blue-700" onClick={handleEdit}>Cancelar</button>
                    <CommentForm comment={comment} isOnEditionMode={true} onEdit={() => setIsOnEditionMode(false)}/> 
                    </>
                    : <p className="mt-1 text-gray-800">{msg}</p>
                }

            </div>
            <button
                ref={openerRef}
                type="button"
                className={`absolute top-0 right-0 ${commentHover && isCommentOwner() ? 'block' : 'hidden'} p-1 hover:bg-gray-200 rounded transition-colors`}
                onClick={handleClickMenu}
            ><EllipsisHorizontalIcon className="h-6 w-6" /></button>
            <div className={`shadow-xl p-3 absolute top-8 right-0 bg-gray-50 rounded-sm flex gap-3 ${isComponentVisible ? 'block' : 'hidden'}`} ref={ref}>
                <button
                    type="button"
                    className="p-2 hover:bg-gray-200 transition-colors rounded-sm font-medium text-sm"
                    onClick={handleEdit}
                >Editar</button>
                <button
                    type="button"
                    className="p-2 hover:bg-gray-200 transition-colors rounded-sm font-medium text-sm"
                    onClick={handleDelete}
                >Eliminar</button>
            </div>
        </div>
    )
}

export default Comment