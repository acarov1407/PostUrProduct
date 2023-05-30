import Modal from "react-modal"
import MyError from "../auxiliary/MyError"
import useApp from "@/context/app/useApp"

function ModalError() {

    const { modals: { modalError }, handleModalError } = useApp();
    return (
        <Modal
            isOpen={modalError}
            onRequestClose={handleModalError}
            style={{
                overlay: {
                    display: 'flex',
                    alignItems: 'center',
                    zIndex: '400',
                },
                content: {
                    maxWidth: '400px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    position: 'unset'
                }
            }}
        >
            <div className="p-10">
                <MyError msg="Ha ocurrido un error inesperado" />
            </div>

        </Modal>
    )
}

export default ModalError