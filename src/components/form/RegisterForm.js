import MyForm from "./MyForm"
import Alert from "../auxiliary/Alert"
import MyField from "./MyField"
import MyInput from "./MyInput"
import SubmitButton from "./SubmitButton"
import { validateRegister } from "@/helpers/validations"
import useValidation from "@/hooks/useValidation"
import useAuth from "@/context/auth/useAuth"

function RegisterForm() {

    const { signUp, alert, isLoadingAuthForm } = useAuth();

    const initialValues = {
        name: '',
        email: '',
        password: '',
        ['repeat-password']: ''
    }

    const {
        formData,
        errors,
        handleSubmit,
        handleChange } = useValidation(initialValues, validateRegister, signUp);
    return (
        <MyForm onSubmit={handleSubmit}>
            {alert !== "" && <Alert msg={alert} />}
            <MyField id="name" label="Nombre" margin={true} error={errors.name}>
                <MyInput
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu Nombre"
                />
            </MyField>
            <MyField id="email" label="Email" margin={true} error={errors.email}>
                <MyInput
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ej: correo@correo.com"
                />
            </MyField>
            <MyField id="password" label="Contraseña" margin={true} error={errors.password}>
                <MyInput
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Escribe una contraseña"
                />
            </MyField>
            <MyField id="repeat-password" label="Repetir Contraseña" margin={false} error={errors.password}>
                <MyInput
                    type="password"
                    id="repeat-password"
                    name="repeat-password"
                    value={formData['repeat-password']}
                    onChange={handleChange}
                    placeholder="Repite la contraseña"
                />
            </MyField>
            <SubmitButton isLoading={isLoadingAuthForm}>
                Registrarse
            </SubmitButton>
        </MyForm>
    )
}

export default RegisterForm