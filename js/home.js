includehtml();


async function loadPosts_3() {
    const posts = await getPosts()
    const me = await getName()
    const best_post = document.getElementById("best_post")

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
        postLike.classList.add("heart", "fa-solid", "fa-heart", "like_heart")
        // postLike.setAttribute("onclick", "likePost(this.id)")
        // if (post.likes.includes(me)) {
        //     postLike.classList.add("heart", "fa-solid", "fa-heart", "like_heart")
        // } else {
        //     postLike.classList.add("heart", "fa-solid", "fa-heart")
        // }

        const likeCount = document.createElement("p")
        likeCount.setAttribute("id", "like_count")
        likeCount.classList.add("likeCount")
        likeCount.innerText = post.likes_count


        best_post.append(newPost)
        newPost.append(postImage)
        newPost.append(postContent)
        newPost.append(postUser)
        newPost.append(line)
        newPost.append(postLike)
        newPost.append(likeCount)
    })
}


loadPosts_3()