import Alert from "@/components/auxiliary/Alert"
import useValidation from "@/hooks/useValidation"
import { validateProduct } from "@/helpers/validations.js"
import useApp from "@/context/app/useApp"
import MyForm from "@/components/form/MyForm"
import MyField from "@/components/form/MyField"
import MyInput from "@/components/form/MyInput"
import SubmitButton from "@/components/form/SubmitButton"

function NewProductForm({ isOnEditionMode }) {

    const { editProduct, createProduct, alert, loadings: { isCreatingProduct, isUpdatingProduct }, currentProduct  } = useApp();

    const setInitialValues = () => {
        if (isOnEditionMode) {
            const { name, company, URL, description } = currentProduct;
            return {
                name,
                company,
                URL,
                description,
                image: 'ignore'
            }
        }

        return {
            name: '',
            company: '',
            image: '',
            URL: '',
            description: ''
        }
    }

    const handleFormSubmit = (formData) => {

        if(isOnEditionMode) {
            editProduct(formData);
            return;
        }

        createProduct(formData);
    }


    const {
        formData,
        errors,
        handleSubmit,
        handleChange
    } = useValidation(setInitialValues(), validateProduct, handleFormSubmit);

    return (
        <MyForm onSubmit={handleSubmit} border={!isOnEditionMode}>
            {alert !== "" && <Alert msg={alert} />}
            <fieldset>
                <legend className="border-b border-gray-300 pb-1 w-full mb-4 font-medium text-gray-700 text-center">Información General</legend>
                <MyField id="name" label="Nombre" margin={true} error={errors.name}>
                    <MyInput
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nombre del producto"
                    />
                </MyField>

                <MyField id="company" label="Empresa" margin={true} error={errors.company}>
                    <MyInput
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Nombre de tu empresa"
                    />
                </MyField>

                {
                    !isOnEditionMode &&
                    <MyField id="image" label="Imagen de tu producto" margin={true} error={errors.image}>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            className="border-gray-300 border rounded-sm focus:outline-none p-2 w-full"
                            onChange={(e) => handleChange(e, true)}
                        />
                    </MyField>

                }

                <MyField id="URL" label="URL" margin={true} error={errors.URL}>
                    <MyInput
                        type="text"
                        id="URL"
                        name="URL"
                        value={formData.URL}
                        onChange={handleChange}
                        placeholder="ej: https://www.myweb.com"
                    />
                </MyField>
            </fieldset>

            <fieldset className="mt-2">
                <legend className="border-b border-gray-300 pb-1 w-full mb-4 font-medium text-gray-700 text-center">Sobre tu producto</legend>
                <MyField id="description" label="Descripción" margin={false} error={errors.description}>
                    <textarea
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Describe tu producto"
                        className="border-gray-300 border rounded-sm focus:outline-none p-2 w-full resize-none"
                        rows={8}
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </MyField>
            </fieldset>

            <SubmitButton isLoading={isCreatingProduct || isUpdatingProduct}>
                {isOnEditionMode ? 'Guardar Cambios' : 'Crear Producto'}
            </SubmitButton>
        </MyForm>
    )
}

export default NewProductForm