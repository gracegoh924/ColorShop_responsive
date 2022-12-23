includehtml();

const profileUrlParams = new URLSearchParams(window.location.search)
const profile_user_id = profileUrlParams.get('id')

async function loadProfile(profile_user_id){
    const profile = await getProfile(profile_user_id)

    const profileImage = document.getElementById("profile_image")
    profileImage.setAttribute("src", `${backend_base_url}${profile.profile_img}`)

    const nickname = document.getElementById("nickname")
    nickname.innerText = profile.username

    const bio = document.getElementById("bio")
    bio.innerText = profile.bio

    var payload = localStorage.getItem("payload")
    var parsed_payload = await JSON.parse(payload)

    if(parsed_payload == null || parsed_payload.user_id != profile.id){
        const postImageListButton = document.getElementById("post_image_list_button")
        postImageListButton.style.display = "none"
    }
}

async function postImageListButton(){
    const profile = await getProfile(profile_user_id)
    const images = await getImages()

    const postImageList = document.getElementById("post_image_list")
    const postList = document.getElementById("post_list")
    const postLikeList = document.getElementById("post_like_list")

    postImageList.innerHTML = ''
    postList.innerHTML = ''
    postLikeList.innerHTML = ''

    const result = images.filter(function (image) {return image.user == profile.username})

    for(let i = 0; i < result.length; i++){
        const postCol = document.createElement("div")
        postCol.classList.add("col")

        const postCard = document.createElement("div")
        postCard.classList.add("card")
        postCard.classList.add("h-100")

        const postImage = document.createElement("img")
        postImage.setAttribute("src", `${backend_base_url}${result[i].after_image}`)
        postImage.setAttribute("id", result[i].id)
        postImage.setAttribute("onclick", "window.open(this.src)")
        postImage.classList.add("post_image")

        const postCardTop = document.createElement("div")
        postCardTop.classList.add("card-footer")
        postCardTop.style.display = 'flex'
        postCardTop.style.justifyContent = 'flex-end'
        
        const deleteImage = document.createElement("span")
        deleteImage.setAttribute("id", `${result[i].id}`)
        deleteImage.setAttribute("onclick", "removeImage(this.id)")
        deleteImage.classList.add("material-symbols-outlined", "btn-outline-danger", "btn-sm")
        deleteImage.innerHTML = `delete`
        deleteImage.style.cursor = 'pointer'

        postCardTop.appendChild(deleteImage)
        postCard.appendChild(postCardTop)
        postCard.appendChild(postImage)
        postCol.appendChild(postCard)
        postImageList.appendChild(postCol)
    }
}

async function postListButton(){
    const profile = await getProfile(profile_user_id)
    const posts = await getBestPosts()
    
    const postImageList = document.getElementById("post_image_list")
    const postList = document.getElementById("post_list")
    const postLikeList = document.getElementById("post_like_list")

    postImageList.innerHTML = ''
    postList.innerHTML = ''
    postLikeList.innerHTML = ''

    const result = posts.filter(function (post) {return post.user == profile.username})

    for(let i = 0; i < result.length; i++){
        const postCol = document.createElement("div")
        postCol.classList.add("col")

        const postCard = document.createElement("div")
        postCard.classList.add("card")
        postCard.classList.add("h-100")

        const postImage = document.createElement("img")
        postImage.setAttribute("src", `${backend_base_url}${result[i].image.after_image}`)
        postImage.setAttribute("id", result[i].id)
        postImage.setAttribute("onclick", "postDetail(this.id)")
        postImage.classList.add("post_image")
        postImage.classList.add("card-img-top")

        const postCardFooter = document.createElement("div")
        postCardFooter.classList.add("card-footer")
        
        const postUsername = document.createElement("small")
        postUsername.classList.add("card-text")
        postUsername.innerText = result[i].user

        const postLikes = document.createElement("small")
        postLikes.classList.add("card-text")
        postLikes.innerText = '좋아요 (' + result[i].likes_count + ')'

        postCardFooter.appendChild(postUsername)
        postCardFooter.appendChild(postLikes)
        postCard.appendChild(postImage)
        postCard.appendChild(postCardFooter)
        postCol.appendChild(postCard)
        postList.appendChild(postCol)
    }
}

async function postLikeListButton(){
    const profile = await getProfile(profile_user_id)
    const posts = await getPosts()
    
    const postImageList = document.getElementById("post_image_list")
    const postList = document.getElementById("post_list")
    const postLikeList = document.getElementById("post_like_list")

    postImageList.innerHTML = ''
    postList.innerHTML = ''
    postLikeList.innerHTML = ''

    const result = posts.filter(function (post) { return post.likes.includes(profile.username) == true})

    for(let i = 0; i < result.length; i++){
        const postCol = document.createElement("div")
        postCol.classList.add("col")

        const postCard = document.createElement("div")
        postCard.classList.add("card")
        postCard.classList.add("h-100")

        const postImage = document.createElement("img")

        postImage.setAttribute("src", `${backend_base_url}${result[i].image.after_image}`)
        postImage.setAttribute("id", result[i].id)
        postImage.setAttribute("onclick", "postDetail(this.id)")
        postImage.classList.add("post_image")

        postImage.classList.add("card-img-top")

        const postCardFooter = document.createElement("div")
        postCardFooter.classList.add("card-footer")
        
        const postUsername = document.createElement("small")
        postUsername.classList.add("card-text")
        postUsername.innerText = result[i].user

        const postLikes = document.createElement("small")
        postLikes.classList.add("card-text")
        postLikes.innerText = '좋아요 (' + result[i].likes_count + ')'

        postCardFooter.appendChild(postUsername)
        postCardFooter.appendChild(postLikes)
        postCard.appendChild(postImage)
        postCard.appendChild(postCardFooter)
        postCol.appendChild(postCard)
        postLikeList.appendChild(postCol)
    }
}

async function removeImage(image_id){
    const posts = await getPosts()
    const result = posts.filter(function (post) { return post.image.id == image_id})

    if(result == ''){  
        if (confirm(`현재 이미지만 삭제됩니다.\n삭제하시겠습니까?`) == true){
            deleteImage(image_id)
        }else{
            return;
        }
    }else{
        for(let i = 0; i < result.length; i++){
            if (confirm(`제목: ${result[i].title}\n이 게시글도 같이 삭제됩니다.\n정말 삭제하시겠습니까??`) == true){
                deleteImage(image_id)
            }else{
                return;
            }
        }
    }

}

loadProfile(profile_user_id);
