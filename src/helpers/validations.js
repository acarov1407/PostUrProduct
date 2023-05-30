import { emailRegex, URLRegex } from "./regex.js";
import { getImageDimensions } from "./image/imageUtils.js";


const validateName = (name) => {
    const isValidName = name.length > 2;
    return {
        isValid: isValidName,
        msg: isValidName ? null : 'El nombre es obligatorio'
    }
}

const validateEmail = (email) => {
    const isValidEmail = emailRegex.test(email);
    return {
        isValid: isValidEmail,
        msg: isValidEmail ? null : 'Email no válido'
    }
}

const validatePassword = (password) => {
    const isValidPassword = password.length >= 8;
    return {
        isValid: isValidPassword,
        msg: isValidPassword ? null : 'La contraseña debe tener por lo menos 8 caracteres'
    }
}

const validateCompany = (company) => {
    const isValidCompany = company.length >= 3;
    return {
        isValid: isValidCompany,
        msg: isValidCompany ? null : 'El nombre de la compañía debe tener por lo menos 3 caracteres'
    }
}

const validateURL = (URL) => {
    const isValidURL = URLRegex.test(URL);
    return {
        isValid: isValidURL,
        msg: isValidURL ? null : 'Debes introducir una URL válida'
    }
}

const validateDescription = (description) => {
    const MIN_LENGTH = 15;
    const MAX_LENGTH = 400;

    if (description.length < MIN_LENGTH) {
        return {
            isValid: false,
            msg: `La descripción debe tener por lo menos ${MIN_LENGTH} caracteres`
        }
    }

    if (description.length > MAX_LENGTH) {
        return {
            isValid: false,
            msg: `La descripción NO puede superar los ${MAX_LENGTH} caracteres`
        }
    }
    return {
        isValid: true,
    }
}

const validateImage = async (imageFile) => {

    //On edition Mode image is ignored
    if (imageFile === 'ignore') {
        return {
            isValid: true,
            msg: null
        }
    }

    if (!imageFile) {
        return {
            isValid: false,
            msg: 'Debes subir una imagen'
        }
    }



    //Dimensions Check
    const imageDimensions = await getImageDimensions(imageFile);

    const areValidDimensions = imageDimensions.height === imageDimensions.width;

    if (!areValidDimensions) {
        return {
            isValid: false,
            msg: 'La imagen debe tener el mismo ancho y alto'
        }
    }



    //Size and Type check
    const MAX_SIZE = 1048576; //1MB

    const isValidType = imageFile.type.startsWith('image');
    const isValidSize = imageFile.size < MAX_SIZE;

    if (!isValidType) {
        return {
            isValid: false,
            msg: 'Solo se admiten archivos de tipo Imagen'
        }
    }


    if (!isValidSize) {
        return {
            isValid: false,
            msg: 'Las imágenes deben ser máximo de 1MB'
        }
    }


    return {
        isValid: true,
        msg: null
    }
}

const validateLogin = (loginData) => {
    const { email, password } = loginData;

    const errors = {}

    const isValidEmail = validateEmail(email);
    if (!isValidEmail.isValid) {
        errors.email = isValidEmail.msg;
    }

    const isValidPassword = validatePassword(password);
    if (!isValidPassword.isValid) {
        errors.password = isValidPassword.msg;
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}

const validateRegister = (registerData) => {
    const { name, email, password } = registerData;
    const errors = {}

    const isValidName = validateName(name);
    if (!isValidName.isValid) {
        errors.name = isValidName.msg;
    }

    const isValidEmail = validateEmail(email);
    if (!isValidEmail.isValid) {
        errors.email = isValidEmail.msg
    }

    const isValidPassword = validatePassword(password);
    if (!isValidPassword.isValid) {
        errors.password = isValidPassword.msg;
    }


    if (registerData.password !== registerData['repeat-password']) {
        errors.password = 'Las contraseñas no coinciden'
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }

}

const validateProduct = async (productData) => {
    const { name, company, image, URL, description } = productData;

    const errors = {}

    const isValidName = validateName(name);
    if (!isValidName.isValid) {
        errors.name = isValidName.msg;
    }

    const isValidImage = await validateImage(image);
    if (!isValidImage.isValid) {
        errors.image = isValidImage.msg;
    }

    const isValidCompany = validateCompany(company);
    if (!isValidCompany.isValid) {
        errors.company = isValidCompany.msg;
    }

    const isValidURL = validateURL(URL);
    if (!isValidURL.isValid) {
        errors.URL = isValidURL.msg;
    }

    const isValidDescription = validateDescription(description);
    if (!isValidDescription.isValid) {
        errors.description = isValidDescription.msg;
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }

}

const validateComment = (commentData) => {

    const { msg } = commentData;
    const errors = {}
    const MAX_COMMENT_LENGTH = 250;

    if (msg === '') {
        errors.msg = 'Tu comentario no puede estar vacío';
        return {
            isValid: false,
            errors
        }
    }

    if (msg.length > MAX_COMMENT_LENGTH) {
        errors.msg = `Tu comentario no puede exceder los ${MAX_COMMENT_LENGTH} caracteres`;
        return {
            isValid: false,
            errors
        }
    }

    return {
        isValid: true,
        errors
    }
}

const validateEditProductImageForm = async (imageData) => {

    const { image } = imageData;
    const errors = {}

    const isValidImage = await validateImage(image);
    if (!isValidImage.isValid) {
        errors.image = isValidImage.msg;
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}

export {
    validateLogin,
    validateRegister,
    validateProduct,
    validateComment,
    validateEditProductImageForm
}