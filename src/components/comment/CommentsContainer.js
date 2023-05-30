import Comment from "./Comment"
import ModalAlert from "../modals/ModalAlert"

function CommentsContainer({ comments, showViewMore, onViewMore }) {
  return (
    <div className="mt-3 flex flex-col gap-4">
      {
        comments.length !== 0
          ?
          <>
            {
              comments.map((comment, idx) => (
                <Comment comment={comment} key={idx} />
              ))
            }
            {
              showViewMore &&
              <button
                className="text-gray-500 font-medium text-sm mt-2 hover:text-gray-600 transition-colors hover:bg-gray-100 p-1 rounded-sm"
                onClick={onViewMore}
              >Ver más comentarios</button>
            }
            <ModalAlert title="¿Estas seguro que quieres eliminar este comentario?"/>
          </>
          :
          <p>Aun no hay comentarios sobre este producto</p>
      }
    </div>
  )
}

export default CommentsContainer