includehtml();

async function loadBestPosts() {
    const posts = await getBestPosts()
    console.log(posts)

    const best_post = document.getElementById("best_post")
    best_post.innerHTML = ''

    posts.forEach(post => {        
        async function getPost() {
            const newPost = document.createElement("div")
            newPost.classList.add("new_post")

            const postImage = document.createElement("img")
            postImage.setAttribute("src", `${backend_base_url}${post.image}`)
            postImage.setAttribute("id", post.id)
            postImage.setAttribute("onclick", "postDetail(this.id)")
            postImage.classList.add("post_image")
    
            const postContent = document.createElement("p")
            postContent.classList.add("content")
            postContent.innerText = post.content

            const postCardFooter = document.createElement("div")
            postCardFooter.classList.add("post_card_footer")
                
            const postUser = await getProfile(post.user_id)
            console.log(postUser)

            const postUserCard = document.createElement("div")
            postUserCard.setAttribute("id", postUser.id)
            postUserCard.setAttribute("onclick", "userDetail(this.id)")
            postUserCard.classList.add("post_user_card")
            
            const postUserImage = document.createElement("img")
            postUserImage.setAttribute("src", `${backend_base_url}${postUser.profile_img}`)
            postUserImage.classList.add("post_user_image")

            const postUsername = document.createElement("p")
            postUsername.classList.add("user")
            postUsername.innerText = post.user
           
            const postLikeCard = document.createElement("div")
            postLikeCard.classList.add("post_like_card")

            const postLike = document.createElement("i")
            postLike.setAttribute("id", "like" + post.id)
            postLike.classList.add("heart", "fa-solid", "fa-heart", "like_heart")
    
            const likeCount = document.createElement("p")
            likeCount.setAttribute("id", "like_count")
            likeCount.classList.add("likeCount")
            likeCount.innerText = post.likes_count
    
            postUserCard.append(postUserImage)
            postUserCard.append(postUsername)
            postLikeCard.append(postLike)
            postLikeCard.append(likeCount)
            postCardFooter.append(postUserCard)
            postCardFooter.append(postLikeCard)
            newPost.append(postImage)
            newPost.append(postContent)
            newPost.append(postCardFooter)
            best_post.append(newPost)
        }
        getPost()
    })
}

function userDetail(user_id){
    const url = `${frontend_base_url}profile.html?id=${user_id}`
    location.href=url
}

loadBestPosts()