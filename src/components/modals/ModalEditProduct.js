import MyModal from "./MyModal";
import NewProductForm from "../form/NewProductForm";
import useApp from "@/context/app/useApp";
import EditProductImageForm from "../form/EditProductImageForm";


function ModalEditProduct({ editingImage }) {

    const { modals: { modalEditProduct }, handleModalEditProduct } = useApp();
    return (
        <MyModal isOpen={modalEditProduct} onRequestClose={handleModalEditProduct} title="Editar Producto">
            {
                editingImage ? <EditProductImageForm /> : <NewProductForm isOnEditionMode={true} />
            }

        </MyModal>

    )
}

export default ModalEditProduct