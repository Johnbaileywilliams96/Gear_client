export function CommentsCard({comment}){

    return (
        <>
        <div>
            <p>{comment.content}</p>
            {/* <p>{comment.user.username}</p> */}
        </div>
        </>
    )
}