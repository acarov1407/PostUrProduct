import { validateEditProductImageForm } from "@/helpers/validations"
import MyField from "./MyField"
import MyForm from "./MyForm"
import SubmitButton from "./SubmitButton"
import useValidation from "@/hooks/useValidation"
import useApp from "@/context/app/useApp"


function EditProductImageForm() {

    const initialValues = { image: '' }

    const { updateProductImage, loadings: { isUpdatingProduct } } = useApp();
    const {
        errors,
        handleSubmit,
        handleChange } = useValidation(initialValues, validateEditProductImageForm, updateProductImage);

    return (
        <form
            className="p-6"
            onSubmit={handleSubmit}>
            <MyField id="image" label="Nueva imagen de tu producto" margin={false} error={errors.image}>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    className="border-gray-300 border rounded-sm focus:outline-none p-2 w-full"
                    onChange={(e) => handleChange(e, true)}
                />
            </MyField>
            <SubmitButton isLoading={isUpdatingProduct}>Actualizar Imagen</SubmitButton>
        </form>
    )
}

export default EditProductImageForm