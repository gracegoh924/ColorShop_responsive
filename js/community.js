includehtml();

async function loadPosts() {
    const posts = await getPosts()
    const post_list = document.getElementById("post_list")

    posts.forEach(post => {
        const newPost = document.createElement("div")
        newPost.classList.add("post_list")
        newPost.setAttribute("id", post.id)
        newPost.setAttribute("onclick", "postDetail(this.id)")

        const postImage = document.createElement("img")
        postImage.setAttribute("src", `${backend_base_url}${post.image}`)

        const postContent = document.createElement("span")
        postContent.classList.add("content")
        postContent.innerText = post.content

        post_list.append(newPost)
        newPost.append(postImage)
        newPost.append(postContent)
    })
}

async function loadPosts_2() {
    const posts = await getPosts()
    const post_list = document.getElementById("post_list_2")

    posts.forEach(post => {
        const newPost = document.createElement("div")
        newPost.classList.add("post_list")
        newPost.setAttribute("id", post.id)
        newPost.setAttribute("onclick", "postDetail(this.id)")

        const postImage = document.createElement("img")
        postImage.setAttribute("src", `${backend_base_url}${post.image}`)

        const postContent = document.createElement("span")
        postContent.classList.add("content")
        postContent.innerText = post.content

        post_list.append(newPost)
        newPost.append(postImage)
        newPost.append(postContent)
    })
}

async function loadPosts_3() {
    const posts = await getPosts()
    const me = await getName()
    const post_list = document.getElementById("post_list_3")

    posts.forEach(post => {
        const newPost = document.createElement("div")
        newPost.classList.add("post_card")

        const postImage = document.createElement("img")
        postImage.setAttribute("src", `${backend_base_url}${post.image}`)
        postImage.setAttribute("id", post.id)
        postImage.setAttribute("onclick", "postDetail(this.id)")

        const postContent = document.createElement("p")
        postContent.classList.add("content_3")
        postContent.innerText = post.content

        const postUser = document.createElement("p")
        postUser.classList.add("user_3")
        postUser.innerText = post.user

        const line = document.createElement("hr")
        line.classList.add("line")

        const postLike = document.createElement("i")
        postLike.setAttribute("id", "like" + post.id)
        postLike.setAttribute("onclick", "likePost(this.id)")
        if (post.likes.includes(me)) {
            postLike.classList.add("heart", "fa-solid", "fa-heart", "like_heart")
        } else {
            postLike.classList.add("heart", "fa-solid", "fa-heart")
        }

        const likeCount = document.createElement("p")
        likeCount.setAttribute("id", "like_count")
        likeCount.classList.add("likeCount")
        likeCount.innerText = post.likes_count


        post_list.append(newPost)
        newPost.append(postImage)
        newPost.append(postContent)
        newPost.append(postUser)
        newPost.append(line)
        newPost.append(postLike)
        newPost.append(likeCount)
    })
}



// async function likePost(likeId) {
//     const posts = await getPosts()
//     console.log(posts)
//     const like_button = document.getElementById(`${likeId}`)
//     console.log(like_button)
//     console.log(like_button.classList)

//     if(like_button.classList == 'heart fa-solid fa-heart') {
//         const response = await postLike(post_id)
//         like_button.classList.add('like_heart')
//         // like_count.innerText = "좋아요 " + (count + num1) + "개"
//     }else{
//         const response = await postLike()
//         like_button.classList.remove('like_heart')
//         // like_count.innerText = "좋아요 " + (count - num1) + "개"
//     }
// }


loadPosts()
loadPosts_2()
loadPosts_3()

