import { Cog6ToothIcon, PencilSquareIcon, TrashIcon, PhotoIcon } from "@heroicons/react/24/outline"
import useComponentVisible from "@/hooks/useComponentVisible";
import ModalEditProduct from "../modals/ModalEditProduct";
import useApp from "@/context/app/useApp";
import ModalAlert from "../modals/ModalAlert";
import { useState } from "react";

function ProductAdminPanel({ product }) {

    const { handleModalEditProduct, handleModalAlert, deleteProduct } = useApp();
    const { openerRef, ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    const [editingImage, setEditingImage] = useState(false);

    const handleClickMenu = () => {
        setIsComponentVisible(!isComponentVisible)
    }

    const handleClickEdit = (isOnImageEdit) => {
        setEditingImage(isOnImageEdit);
        handleModalEditProduct();
        setIsComponentVisible(false);
    }

    const handleClickDelete = async () => {
        const result = await handleModalAlert();
        if (!result.isConfirmed) return;
        deleteProduct(product);
    }

    return (
        <div className="p-4 border border-gray-300 flex items-center justify-between font-medium hover:bg-gray-50 transition-colors relative">
            <h3>Administrar</h3>
            <button
                type="button"
                className="hover:rotate-45 transition-all"
                onClick={handleClickMenu}
                ref={openerRef}
            >
                <Cog6ToothIcon className="h-6 w-6" />
            </button>
            <div
                className={`bg-gray-50 shadow-xl absolute p-3 flex flex-col gap-2 right-0 top-12 rounded-sm w-[200px] ${isComponentVisible ? 'block' : 'hidden'}`}
                ref={ref}
            >
                <button
                    type="button"
                    className="text-sm flex items-center gap-5 hover:bg-gray-200 transition-colors p-3 rounded-sm"
                    onClick={() => handleClickEdit(true)}
                >
                    <PhotoIcon className="h-5 w-5" />
                    <span>Cambiar Imagen</span>
                </button>
                <button
                    type="button"
                    className="text-sm flex items-center gap-5 hover:bg-gray-200 transition-colors p-3 rounded-sm"
                    onClick={() => handleClickEdit(false)}
                >
                    <PencilSquareIcon className="h-5 w-5" />
                    <span>Editar</span>
                </button>
                <button
                    type="button"
                    className="text-sm flex items-center gap-5 hover:bg-gray-200 transition-colors p-3 rounded-sm"
                    onClick={handleClickDelete}
                >
                    <TrashIcon className="h-5 w-5" />
                    <span>Eliminar</span>
                </button>
            </div>
            <ModalEditProduct editingImage={editingImage}/>
            <ModalAlert title="¿Estas seguro que quieres eliminar este producto?" />
        </div>
    )
}

export default ProductAdminPanel