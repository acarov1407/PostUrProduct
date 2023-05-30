import Modal from 'react-modal';
import useApp from "@/context/app/useApp";

function ModalAlert({ title }) {
    const { modals: { modalAlert }, handleModalAlert, modalAlertRef } = useApp();

    const handleConfirm = () => {
        if (modalAlertRef.current) {
            modalAlertRef.current.resolve({ isConfirmed: true });
            handleModalAlert();
        }
    }

    const handleCancel = () => {
        if (modalAlertRef.current) {
            modalAlertRef.current.resolve({ isConfirmed: false });
            handleModalAlert();
        }
    }


    return (
        <Modal
            isOpen={modalAlert}
            onRequestClose={handleModalAlert}
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
            <div className="p-5">
                <h1 className="font-medium text-center text-lg">{title}</h1>
                <p className="mt-2 text-center">Esta acción no se puede deshacer</p>
                <div className="mt-5 flex items-center gap-5 justify-center">
                    <button
                        type="button"
                        className="p-2 w-full bg-blue-500 rounded text-white font-medium text-sm hover:bg-blue-600 transition-colors"
                        onClick={handleConfirm}
                    >Si</button>
                    <button
                        type="button"
                        className="p-2 w-full text-blue-500 font-medium hover:bg-gray-200 transition-colors rounded"
                        onClick={handleCancel}
                    >No</button>
                </div>
            </div>
        </Modal>
    )
}

export default ModalAlert