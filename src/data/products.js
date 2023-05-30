import {
    collection,
    query,
    orderBy,
    getDocs,
    limit,
    startAfter,
    doc,
    getDoc,
    where,
    FieldPath
} from "firebase/firestore";

import { getStorage, ref, deleteObject, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import firebase from "../../firebase/firebase";
import { convertImageName } from "@/helpers/image/imageUtils";

const LIMIT_PER_PAGE = 4;
const COLLECTION_NAME = "products";
const COLLECTION_REF = collection(firebase.db, COLLECTION_NAME);
const DEFAULT_SORT = 'created';


async function getConstraints(lastProductId, orderType, extraConstraints) {
    const constraints = [
        orderBy(orderType || DEFAULT_SORT, 'desc'),
        limit(LIMIT_PER_PAGE)
    ]

    if (lastProductId) {
        const lastProduct = await getDoc(doc(firebase.db, COLLECTION_NAME, lastProductId));
        constraints.push(
            startAfter(lastProduct)
        );
    }

    if (extraConstraints) {
        return [...constraints, ...extraConstraints];
    }

    return constraints;

}
export async function getAllProducts(lastProductId, orderType) {

    try {
        const constraints = await getConstraints(lastProductId, orderType);
        const productsRef = query(COLLECTION_REF, ...constraints);
        const productsSnapshot = await getDocs(productsRef);
        const products = productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        return products;

    } catch (error) {
        console.log(error)
        throw new Error('Ha ocurrido un error al intentar obtener los productos');
    }
}

export async function getUserProductsFromDB(orderType, userId) {
    try {
        const ownerIdRef = new FieldPath('owner', 'id');
        const productsRef = query(COLLECTION_REF, where(ownerIdRef, '==', userId), orderBy(orderType, 'desc'));
        const productsSnapshot = await getDocs(productsRef);
        const products = productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        return products;
    } catch (error) {
        console.log(error)
        throw new Error('Ha ocurrido un error al intentar obtener los productos');
    }
}

export async function getPopularProducts(lastProductId) {
    try {

        const constraints = await getConstraints(lastProductId, 'likes', [where('likes', '>=', 2)]);
        const productsRef = query(COLLECTION_REF, ...constraints);
        const productsSnapshot = await getDocs(productsRef);
        const products = productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        return products;

    } catch (error) {
        console.log(error)
        throw new Error('Ha ocurrido un error al intentar obtener los productos');
    }
}

export async function getProductsByName(name) {
    try {
        const productsRef = query(COLLECTION_REF, orderBy('lowerName'), where('lowerName', '>=', name.toLowerCase()), where('lowerName', '<=', name.toLowerCase() + "\uf8ff"));
        const productsSnapshot = await getDocs(productsRef);
        const products = productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        return products;
    } catch (error) {
        console.log(error)
        throw new Error('Ha ocurrido un error al intentar obtener los productos');
    }
}

export async function deleteProductImage(imageName) {
    try {

        //Delete image stored
        const storage = getStorage();
        const imageRef = ref(storage, 'products/' + imageName);
        await deleteObject(imageRef);

    } catch (error) {
        throw new Error('Ha ocurrido un error al intentar eliminar la imágen del producto');
    }
}

export async function uploadProductImage(file) {
    return new Promise(function (resolve, reject) {
        
        if (!file) return;

        const imageName = convertImageName(file.name);
        const storage = getStorage();
        const storageRef = ref(storage, 'products/' + imageName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {

                switch (error.code) {
                    case 'storage/unauthorized':
                        reject({ msg: 'No tienes permiso para hacer esto' });
                        break;

                    case 'storage/canceled':
                        reject({ msg: 'Se ha cancelado la subida' });
                        break;

                    case 'storage/unknown':
                        reject({ msg: 'Error desconocido' });
                        break;
                    default:
                        reject({ msg: 'Error desconocido' })
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve({ name: imageName, URL: downloadURL });
                });
            }
        );
    })
}