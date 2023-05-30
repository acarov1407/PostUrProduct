export function formatDate(dateLong) {
    const date = new Date(dateLong);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formatedDate = date.toLocaleDateString('es-ES', options);
    return formatedDate;
}