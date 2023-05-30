import { createContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router";
import useAuth from "../auth/useAuth";
import { nanoid } from "nanoid";
import firebase from "../../../firebase/firebase";

import {
    addDoc,
    collection,
    doc,
    updateDoc,
    getDoc,
    onSnapshot,
    deleteDoc
} from "firebase/firestore";

import { deleteProductImage, uploadProductImage } from "@/data/products";


const AppContext = createContext();

function AppProvider({ children }) {

    const [alert, setAlert] = useState('');
    const [modals, setModals] = useState({
        modalAlert: false,
        modalComments: false,
        modalEditProduct: false,
        modalSearchProduct: false,
        modalError: false
    });

    const modalAlertRef = useRef(null);
    const [loadings, setLoadings] = useState({
        isCreatingProduct: false,
        isLoadingProduct: true,
        isLikingProduct: false,
        isSubmittingComment: false,
        isUpdatingProduct: false
    });


    const [currentProduct, setCurrentProduct] = useState(null);

    const { authUser } = useAuth();

    const router = useRouter();

    //Check for changes in product and update to all users
    useEffect(() => {

        if (!currentProduct?.id) return;

        const unsub = onSnapshot(doc(firebase.db, "products", currentProduct.id), (doc) => {
            if (doc.exists()) {
                const updatedProduct = { id: doc.id, ...doc.data() }
                setCurrentProduct(updatedProduct);
            }
        });

        return () => {
            unsub();
        }

    }, [currentProduct?.id]);



    //Close Modals when route changes
    useEffect(() => {
        setModals({
            modalAlert: false,
            modalComments: false,
            modalEditProduct: false,
            modalSearchProduct: false
        });
    }, [router.pathname])

    const handleAlert = (alert) => {
        setAlert(alert);
        setTimeout(() => {
            setAlert('');
        }, 7000);
    }

    const handleBodyOverflow = (modal) => {
        const overflow = modal ? 'unset' : 'hidden';
        document.body.style.overflow = overflow;
    }


    // ########################### Modals ###########################

    const handleModalEditProduct = () => {
        handleBodyOverflow(modals.modalEditProduct);
        setModals({ ...modals, modalEditProduct: !modals.modalEditProduct });
    }
    const handleModalComments = () => {
        handleBodyOverflow(modals.modalComments);
        setModals({ ...modals, modalComments: !modals.modalComments });
    }

    const handleModalSearchProduct = () => {
        handleBodyOverflow(modals.modalSearchProduct);
        setModals({ ...modals, modalSearchProduct: !modals.modalSearchProduct });
    }

    const handleModalError = () => {
        handleBodyOverflow(modals.modalError);
        setModals({ ...modals, modalError: !modals.modalError });
    }


    const handleModalAlert = () => {
        handleBodyOverflow(modals.modalAlert);
        if (modals.modalAlert) {
            setModals({ ...modals, modalAlert: false });
            modalAlertRef.current = null;
        } else {
            setModals({ ...modals, modalAlert: true });
            return new Promise((resolve, reject) => {
                modalAlertRef.current = { resolve, reject }
            })
        }
    }

    // ########################### Product ###########################

    const getProduct = async (id) => {
        setLoadings({ ...loadings, isLoadingProduct: true });
        try {
            const productRef = doc(firebase.db, "products", id)
            const productSnapshot = await getDoc(productRef);

            if (productSnapshot.exists()) {
                const product = { id, ...productSnapshot.data() };
                setCurrentProduct(product);
            }

        } catch (error) {
            handleModalError();
        } finally {
            setLoadings({ ...loadings, isLoadingProduct: false });
        }
    }

    const createProduct = async (productData) => {

        if (!authUser?.emailVerified) {
            return router.push('/');
        }

        setLoadings({ ...loadings, isCreatingProduct: true });

        const { name, company, URL, image, description } = productData;

        try {
            const imageData = await uploadProductImage(image);

            const product = {
                name,
                lowerName: name.toLowerCase(),
                company,
                URL,
                image: imageData,
                description,
                likes: 0,
                comments: [],
                commentsCount: 0,
                created: Date.now(),
                owner: {
                    id: authUser.uid,
                    name: authUser.displayName
                },
                votedBy: [],

            }

            await addDoc(collection(firebase.db, 'products'), product);
            await router.push('/');

        } catch (error) {
            handleAlert(error?.msg || 'Ha ocurrido un error al intentar crear el producto');
        } finally {
            setLoadings({ ...loadings, isCreatingProduct: false });
        }
    }

    const editProduct = async (productData) => {
        if (!authUser?.emailVerified) return;
        if (authUser.uid !== currentProduct.owner.id) return;

        setLoadings({ ...loadings, isUpdatingProduct: true });

        try {
            const productRef = doc(firebase.db, "products", currentProduct.id);
            await updateDoc(productRef, productData);
            handleModalEditProduct();
            router.push(`/products/${currentProduct.id}`)
        } catch (error) {
            handleAlert('Ha ocurrido un error al intentar actualizar este producto');
        } finally {
            setLoadings({ ...loadings, isUpdatingProduct: false });
        }
    }

    const updateProductImage = async (imageData) => {
        if (!authUser?.emailVerified) return;
        if (authUser.uid !== currentProduct.owner.id) return;
        setLoadings({ ...loadings, isUpdatingProduct: true });

        const { image } = imageData;

        try {

            //Upload New Image
            const imageData = await uploadProductImage(image);

            //Update reference
            const productRef = doc(firebase.db, "products", currentProduct.id);
            await updateDoc(productRef, { image: imageData });

            //Delete Old Image
            await deleteProductImage(currentProduct.image.name);

            handleModalEditProduct();

        } catch (error) {
            handleAlert(error?.message || 'Ha ocurrido un error al intentar actualizar la imagen');
        } finally {
            setLoadings({ ...loadings, isUpdatingProduct: false });
        }

    }

    const deleteProduct = async (product) => {
        if (!authUser?.emailVerified) return;
        if (authUser.uid !== product.owner.id) return;

        try {
            //Delete doc
            const productRef = doc(firebase.db, "products", product.id);
            await deleteDoc(productRef);

            //Delete image stored
            await deleteProductImage(product.image.name);

            //Update state
            const updatedUserProducts = userProducts.filter(_product => _product.id !== product.id);
            setUserProducts(updatedUserProducts);
            router.push('/my-products');
        } catch (error) {
            handleModalError();
        }
    }


    const handleLikeProduct = async () => {
        if (!authUser?.emailVerified) {
            return router.push('/');
        }

        setLoadings({ ...loadings, isLikingProduct: true });

        let updatedVotedBy = null;
        let updatedLikes = null;

        const userHasVoted = currentProduct.votedBy.some(user => user.id === authUser.uid);
        if (currentProduct.votedBy.length !== 0 && userHasVoted) {
            updatedVotedBy = currentProduct.votedBy.filter(user => user.id !== authUser.uid);
            updatedLikes = currentProduct.likes - 1;
        } else {
            updatedVotedBy = [...currentProduct.votedBy, { id: authUser.uid, name: authUser.displayName }];
            updatedLikes = currentProduct.likes + 1;
        }

        setCurrentProduct({ ...currentProduct, likes: updatedLikes, votedBy: updatedVotedBy });

        try {
            const productRef = doc(firebase.db, "products", currentProduct.id);
            await updateDoc(productRef, { likes: updatedLikes, votedBy: updatedVotedBy });
        } catch (error) {
            handleModalError();
        } finally {
            setLoadings({ ...loadings, isLikingProduct: false });
        }
    }

    // ########################### Comments ###########################

    const updateCommentInDB = async (updatedComments) => {
        if (!authUser?.emailVerified) {
            return router.push('/');
        }

        try {
            const productRef = doc(firebase.db, "products", currentProduct.id);
            await updateDoc(productRef, { comments: updatedComments });
            setCurrentProduct({ ...currentProduct, comments: updatedComments });
        } catch (error) {
            handleModalError();
        }
    }

    const createComment = async (msg) => {

        setLoadings({ ...loadings, isSubmittingComment: true });
        const commentObj = {
            id: nanoid(),
            author: {
                id: authUser.uid,
                name: authUser.displayName
            },
            msg,
            created: Date.now()
        }

        const updatedComments = [...currentProduct.comments, commentObj];

        await updateCommentInDB(updatedComments);
        setLoadings({ ...loadings, isSubmittingComment: false });

    }

    const deleteComment = async (id) => {

        const result = await handleModalAlert();
        if (!result.isConfirmed) return;

        const updatedComments = currentProduct.comments.filter(comment => comment.id !== id);
        updateCommentInDB(updatedComments);
    }

    const editComment = (comment) => {
        const updatedComments = currentProduct.comments.map(_comment => _comment.id === comment.id ? comment : _comment);
        updateCommentInDB(updatedComments);

    }



    return (
        <AppContext.Provider
            value={{
                alert,
                modals,
                loadings,
                currentProduct,
                handleModalError,
                handleModalSearchProduct,
                handleModalEditProduct,
                handleModalAlert,
                handleModalComments,
                handleAlert,
                createProduct,
                editProduct,
                updateProductImage,
                getProduct,
                deleteProduct,
                handleLikeProduct,
                createComment,
                deleteComment,
                editComment
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;

export {
    AppProvider
}