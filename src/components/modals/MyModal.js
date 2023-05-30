import Modal from "react-modal"
import CloseButton from "../auxiliary/CloseButton"

Modal.setAppElement('#__next');

function MyModal({ children, isOpen, onRequestClose, title }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                overlay: {
                    display: 'flex',
                    alignItems: 'center',
                    zIndex: '300',
                },
                content: {
                    width: '600px',
                    maxWidth: '600px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    paddingTop: '0',
                    position: 'relative',
                    inset: '0',
                    maxHeight: 'calc(100% - 80px)'
                }
            }}
        >
            <div className="flex items-center justify-between border-b border-gray-300 py-5 sticky top-0 bg-white z-10">
                <div className="w-6 h-6"></div>
                <h2 className="text-xl font-medium">{title}</h2>
                <CloseButton onClick={onRequestClose} />
            </div>

            <div className="">
                {children}
            </div>


        </Modal>
    )
}

export default MyModal