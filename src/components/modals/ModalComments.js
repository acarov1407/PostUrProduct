import MyModal from "./MyModal";
import { limitComments } from "@/helpers/limitData.js";
import useApp from "@/context/app/useApp";
import { useState } from "react";
import CommentsContainer from "../comment/CommentsContainer";

function ModalComments({ comments }) {

    const [page, setPage] = useState(1);
    const COMMENTS_PER_PAGE = 5;
    const TO_SHOW_COMMENTS = page * COMMENTS_PER_PAGE;

    const { modals: { modalComments }, handleModalComments } = useApp();

    const handleViewMore = () => {
        setPage(page + 1);
    }


    return (
        <MyModal isOpen={modalComments} onRequestClose={handleModalComments} title="Comentarios">
            <CommentsContainer
                comments={limitComments(comments, TO_SHOW_COMMENTS)}
                showViewMore={comments.length > TO_SHOW_COMMENTS}
                onViewMore={handleViewMore}
            />
        </MyModal>
    )
}

export default ModalComments