import MyForm from "./MyForm"
import MyField from "./MyField"
import MyInput from "./MyInput"
import SubmitButton from "./SubmitButton"
import Alert from "../auxiliary/Alert"
import useAuth from "@/context/auth/useAuth"
import useValidation from "@/hooks/useValidation"
import { validateLogin } from "@/helpers/validations.js"

function LoginForm() {
    const { login, alert, isLoadingAuthForm } = useAuth();

    const initialValues = {
        email: '',
        password: ''
    }

    const {
        formData,
        errors,
        handleSubmit,
        handleChange } = useValidation(initialValues, validateLogin, login)

    return (
        <MyForm onSubmit={handleSubmit}>
            {alert !== "" && <Alert msg={alert} />}
            <MyField id="email" label="Email" margin={true} error={errors.email}>
                <MyInput type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="ej: correo@correo.com" />
            </MyField>
            <MyField id="password" label="Contraseña" margin={false} error={errors.password}>
                <MyInput type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Escribe tu contraseña" />
            </MyField>
            <SubmitButton isLoading={isLoadingAuthForm}>
                Iniciar Sesión
            </SubmitButton>
        </MyForm>
    )
}

export default LoginForm