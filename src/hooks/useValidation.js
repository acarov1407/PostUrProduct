import { useState, useEffect } from "react"

function useValidation(initialState, validate, successFunction) {

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
        handleValidation();
    }, [errors]);

    async function handleValidation() {
        if (submitForm) {
            const existErrors = Object.keys(errors).length > 0;
            if (!existErrors) {
                await successFunction(formData);
                setFormData(initialState);
                
            }

            setSubmitForm(false);
        }
    }

    const handleChange = (e, isFile) => {
        setFormData({
            ...formData,
            [e.target.name]: isFile ? e.target.files[0] : e.target.value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValidForm = await validate(formData);
        setErrors(isValidForm.errors);
        setSubmitForm(true);
    }
    return {
        formData,
        errors,
        submitForm,
        handleSubmit,
        handleChange
    }
}

export default useValidation