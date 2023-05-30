import Alert from "../auxiliary/Alert"
import SubmitButton from "./SubmitButton"
import useValidation from "@/hooks/useValidation"
import { validateComment } from "@/helpers/validations"
import useApp from "@/context/app/useApp"
import MyTextArea from "./MyTextArea"


function CommentForm({ comment, isOnEditionMode, onEdit }) {

    const { createComment, editComment, loadings: { isSubmittingComment } } = useApp();

    const initialValues = {
        msg: isOnEditionMode ? comment.msg : ''
    }

    const {
        formData,
        errors,
        handleSubmit,
        handleChange } = useValidation(initialValues, validateComment, handleComment);

    function handleComment(formData) {

        const { msg } = formData;

        if (isOnEditionMode) {
            editComment({ ...comment, msg });
            onEdit();
        } else {
            createComment(msg);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mt-2 w-full">
            {errors.msg && <Alert msg={errors.msg} />}
            <MyTextArea id="msg" name="msg" value={formData.msg} onChange={handleChange} />
            <SubmitButton isLoading={isSubmittingComment}>{isOnEditionMode ? 'Guardar Cambios' : 'Agregar Comentario'}</SubmitButton>
        </form>
    )
}

export default CommentForm