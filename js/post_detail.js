includehtml();

const urlParams = new URLSearchParams(window.location.search)
const post_id = urlParams.get('id')

async function loadPostDetail(post_id){
    const post = await getPostDetail(post_id)
    const image = await getImageDetail(post.image_id)

    const postImage = document.getElementById("image")
    const postUser = document.getElementById("post_user")
    const postTitle = document.getElementById("post_title")
    const postContent = document.getElementById("post_content")

    postImage.setAttribute("src", `${backend_base_url}${image.after_image}`)
    postUser.innerText = post.user
    postTitle.innerText = post.title
    postContent.innerText = post.content

    // 상세 페이지 댓글 보기
    const comments = await getComments(post_id)
    const comment_list = document.getElementById("comment_list")
    comment_list.innerHTML = ''
    
    // 댓글 생성
    for(let i = 0; i < comments.length; i++){        
        const newComment = document.createElement("div")
        newComment.setAttribute("id", `comment_content_${comments[i].id}`)

        // 댓글 작성자
        const newCommentUser = document.createElement("small")
        newCommentUser.innerText = comments[i].user
        newCommentUser.setAttribute("id", `comment_user_${comments[i].id}`)

        // 댓글 내용
        const newCommentContent = document.createElement("p")
        newCommentContent.innerText = comments[i].content
        newCommentContent.setAttribute("id", `new_comment_content_${comments[i].id}`)

        // 댓글 작성 날짜
        const newCommentTime = document.createElement("small")
        newCommentTime.innerText = comments[i].update_at
        newCommentTime.setAttribute("id", `comment_time_${comments[[i].id]}`)

        // 댓글 버튼들
        const commentButtons = document.createElement("div")
        commentButtons.setAttribute("id", `comment_buttons_${comments[i].id}`)
        commentButtons.style.display = "flex"

        // 댓글 업데이트 버튼들
        const updateCommentButtons = document.createElement("div")
        updateCommentButtons.setAttribute("id", `update_comment_buttons_${comments[i].id}`)
        updateCommentButtons.style.display = "flex"

        // 댓글 수정 버튼    
        const updateCommentButton = document.createElement("button")
        updateCommentButton.innerText = '수정'
        updateCommentButton.setAttribute("type", "button")
        updateCommentButton.setAttribute("id", `${comments[i].id}`)
        updateCommentButton.setAttribute("onclick", "updateCommentMode(this.id)")

        // 댓글 삭제 버튼
        const deleteCommentButton = document.createElement("button")
        deleteCommentButton.innerText = '삭제'
        deleteCommentButton.setAttribute("type", "button")
        deleteCommentButton.setAttribute("id", `${comments[i].id}`)
        deleteCommentButton.setAttribute("onclick", "deleteCommenteMode(this.id)")
       
        // 댓글 붙이기
        updateCommentButtons.appendChild(updateCommentButton)
        commentButtons.appendChild(updateCommentButtons)
        commentButtons.appendChild(deleteCommentButton)
        newComment.appendChild(newCommentUser)
        newComment.appendChild(newCommentContent)
        newComment.appendChild(commentButtons)
        comment_list.appendChild(newComment)
        
        const commentUser = document.getElementById(`comment_user_${comments[i].id}`)
        var payload = localStorage.getItem("payload")
        var parsed_payload = await JSON.parse(payload)
    
        if(parsed_payload == null || parsed_payload.username != commentUser.innerText){
            updateCommentButtons.style.display = "none"
            deleteCommentButton.style.display = "none"
        }else{
            updateCommentButtons.style.display = "flex"
            deleteCommentButton.style.display = "flex"
        }
    }
    const updatePostButtons = document.getElementById("update_post")
    const deletePostButtons = document.getElementById("delete_post")

    var payload = localStorage.getItem("payload")
    var parsed_payload = await JSON.parse(payload)

    if(parsed_payload == null || parsed_payload.username != postUser.innerText){
        updatePostButtons.style.display = "none"
        deletePostButtons.style.display = "none"
    }else{
        updatePostButtons.style.display = "flex"
        deletePostButtons.style.display = "flex"
    }
}

//게시글 수정 화면
async function updatePostMode(){
    // 게시글 작성자 확인
    const postUser = document.getElementById("post_user")
    var payload = localStorage.getItem("payload")
    var parsed_payload = await JSON.parse(payload)

    if(parsed_payload == null || parsed_payload.username != postUser.innerText){
        alert('수정 권한이 없습니다')
    }else{
        const postContent = document.getElementById("post_content")
        postContent.style.visibility = "hidden"

        // 게시글 내용 입력란
        const inputPostContent = document.createElement("textarea")
        inputPostContent.setAttribute("id", "input_post_content")
        inputPostContent.classList.add("form-control")
        inputPostContent.innerText = postContent.innerHTML
        inputPostContent.rows = 3
        inputPostContent.cols = 30

        // 게시글 입력란 붙이기
        const newPostContent = document.getElementById("new_post_content")
        newPostContent.insertBefore(inputPostContent, postContent)

        // 게시글 수정 완료 버튼(수정 -> 수정 완료)
        const updatePostButton = document.getElementById("update_post")
        updatePostButton.setAttribute("onclick", "updatePost()")
        updatePostButton.innerHTML = `<span class="material-symbols-outlined">edit</span>수정 완료`
        
        // 게시글 수정 취소 버튼
        const updatePostCancelButton = document.createElement("p")
        updatePostCancelButton.setAttribute("id", `update_post_cancel_button`)
        updatePostCancelButton.setAttribute("onclick", "updatePostCancelButton()")
        updatePostCancelButton.innerHTML = `<span class="material-symbols-outlined">edit</span>수정 취소`
        
        // 수정 취소 버튼 붙이기
        const updatePostButtons = document.getElementById("update_post_buttons")
        updatePostButtons.appendChild(updatePostCancelButton)
    }
}

// 게시글 수정
async function updatePost(){
    const post = await getPostDetail(post_id)
    var inputPostContent = document.getElementById("input_post_content")
    await putPost(post_id, post.image_id, post.title, inputPostContent.value)

    inputPostContent.remove() // 게시글 수정란 삭제
    
    // 게시글 보이기
    const postContent = document.getElementById("post_content")
    postContent.style.visibility = "visible"

    // 게시글 수정 버튼(수정 완료 -> 수정)
    const updatePostButton = document.getElementById("update_post")
    updatePostButton.setAttribute("onclick", "updatePostMode()")
    updatePostButton.innerHTML = `<span class="material-symbols-outlined">edit</span>수정`

    // 게시글 수정 취소 버튼 삭제
    const updatePostCancelButton = document.getElementById("update_post_cancel_button")
    updatePostCancelButton.remove()
    
    loadPostDetail(post_id)
}

// 게시글 수정 취소
function updatePostCancelButton(){
    // 게시글 입력란 삭제
    var inputPostContent = document.getElementById("input_post_content")
    inputPostContent.remove()
    
    // 게시글 보이기
    const postContent = document.getElementById("post_content")
    postContent.style.visibility = "visible"

    // 게시글 수정 버튼(수정 완료 -> 수정)
    const updatePostButton = document.getElementById("update_post")
    updatePostButton.setAttribute("onclick", "updatePostMode()")
    updatePostButton.innerHTML = `<span class="material-symbols-outlined">edit</span>수정`

    // 게시글 수정 취소 버튼 삭제
    const updatePostCancelButton = document.getElementById("update_post_cancel_button")
    updatePostCancelButton.remove()

    loadPostDetail(post_id)
}

// 게시글 삭제
async function deletePostMode() {
    await deletePost(post_id)
}

//댓글 수정 화면
async function updateCommentMode(comment_id){
    // 댓글 작성자 확인
    const commentUser = document.getElementById(`comment_user_${comment_id}`)
    var payload = localStorage.getItem("payload")
    var parsed_payload = await JSON.parse(payload)

    if(parsed_payload == null || parsed_payload.username != commentUser.innerText){
        alert('수정 권한이 없습니다')
    }else{
        // 댓글 숨기기
        const newCommentContent = document.getElementById(`new_comment_content_${comment_id}`)
        newCommentContent.style.visibility = "hidden"

        // 댓글 입력란
        const inputCommentContent = document.createElement("textarea")
        inputCommentContent.setAttribute("id", `input_comment_content_${comment_id}`)
        inputCommentContent.classList.add("form-control")
        inputCommentContent.innerText = newCommentContent.innerHTML
        inputCommentContent.rows = 1
        inputCommentContent.cols = 20

        // 댓글 입력란 붙이기
        const updateCommentContent = document.getElementById(`comment_content_${comment_id}`)
        updateCommentContent.insertBefore(inputCommentContent, newCommentContent)

        // 댓글 수정 완료 버튼(수정 -> 수정 완료)
        const updateCommentButton = document.getElementById(`${comment_id}`)
        updateCommentButton.setAttribute("onclick", "updateComment(this.id)")
        updateCommentButton.innerText = '수정 완료'

        // 댓글 수정 취소 버튼
        const updateCommentCancelButton = document.createElement("button")
        updateCommentCancelButton.setAttribute("id", `${comment_id}`)
        updateCommentCancelButton.setAttribute("onclick", "updateCommentCancelButton(this.id)")
        updateCommentCancelButton.innerText = '수정 취소'

        // 댓글 수정 취소 버튼 붙이기
        const updateCommentButtons = document.getElementById(`update_comment_buttons_${comment_id}`)
        updateCommentButtons.appendChild(updateCommentCancelButton)
    }
}

// 댓글 수정
async function updateComment(comment_id){
    var inputCommentContent = document.getElementById(`input_comment_content_${comment_id}`)
    await putComment(post_id, comment_id, inputCommentContent.value)

    inputCommentContent.remove() // 댓글 입력란 삭제
    
    // 댓글 보이기
    const newCommentContent = document.getElementById(`new_comment_content_${comment_id}`)
    newCommentContent.style.visibility = "visible"

    // 댓글 수정 버튼(수정 완료 -> 수정)
    const updateCommentButton = document.getElementById(`${comment_id}`)
    updateCommentButton.setAttribute("onclick", "updateCommentMode(this.id)")
    updateCommentButton.innerText = '수정'

    loadPostDetail(post_id)
}

// 댓글 수정 취소
function updateCommentCancelButton(comment_id){
    // 댓글 입력란 삭제
    var inputCommentContent = document.getElementById(`input_comment_content_${comment_id}`)
    inputCommentContent.remove()
    
    // 댓글 보이기
    const commentContent = document.getElementById(`comment_content_${comment_id}`)
    commentContent.style.visibility = "visible"

    // 댓글 수정 버튼(수정 완료, -> 수정)
    const updateCommentButton = document.getElementById(`${comment_id}`)
    updateCommentButton.setAttribute("onclick", "updateCommentMode(this.id)")
    updateCommentButton.innerText = '수정'

    loadPostDetail(post_id)
}

// 댓글 삭제
async function deleteCommenteMode(comment_id){
    await deleteComment(post_id, comment_id)
}

// 댓글 작성
async function addComment() {
    const createComment = document.getElementById("user_comment")

    if (createComment.value == ''){
        alert('댓글을 입력해주세요')
    }else{
        await postComment(post_id, createComment.value)
    }
    
    loadPostDetail(post_id)
    createComment.value = '' // 댓글 입력란 글자 삭제
}

// 좋아요 정보 확인
async function viewLike() {
    // 좋아요 여부
    const liked = await getLike()
    const me = await getUsername()

    const like_button = document.getElementById("like_button")
    if(liked.likes.includes(me)) {
        like_button.classList.add('like_heart')
    }else{
        like_button.classList.remove('like_heart')
    }
    // 좋아요 카운트
    const like_count = document.getElementById("like_count")
    like_count.innerText = "좋아요 " + liked.likes.length + "개"
}

// 좋아요 기능
async function likePost() {
    const liked = await getLike()
    const like_button = document.getElementById("like_button")
    const like_count = document.getElementById("like_count")
    var count = parseInt(liked.likes.length)
    num1 = parseInt(1)
    if(like_button.classList == 'heart fa-solid fa-heart') {
        const response = await postLike()
        like_button.classList.add('like_heart')
        like_count.innerText = "좋아요 " + (count + num1) + "개"
    }else{
        const response = await postLike()
        like_button.classList.remove('like_heart')
        like_count.innerText = "좋아요 " + (count - num1) + "개"
    }
}

loadPostDetail(post_id)
viewLike()
