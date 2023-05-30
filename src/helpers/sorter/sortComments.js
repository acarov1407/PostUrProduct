function sortById(id) {
    return function (a, b) {
        if (a.author.id === id && b.author.id !== id) {
            return -1;
        }
        if (a.author.id !== id && b.author.id === id) {
            return 1; 
        }
        return 0;
    };
}

function sortByCreated(a, b) {
    return b.created - a.created;
}
export function sortComments(commentsData) {


    const { comments, authorId, ownerId } = commentsData;

    //Sort By Date
    comments.sort(sortByCreated);

    //Save product creator comments 
    const productOwnerComments = comments.filter(comment => comment.author.id === ownerId);

    //Save all comments except product creator comments
    const nonCreatorComments = comments.filter(comment => comment.author.id !== ownerId);

    //Sort nonCreatorComments by comment author
    const sortAuthorComments = nonCreatorComments.sort(sortById(authorId));


    const sortedComments = [...productOwnerComments, ...sortAuthorComments];
    return sortedComments;
}