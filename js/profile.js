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
}

async function postListButton(){
    const profile = await getProfile(profile_user_id)
    const posts = await getBestPosts()
    
    const postList = document.getElementById("post_list")
    const postLikeList = document.getElementById("post_like_list")

    postList.innerHTML = ''
    postLikeList.innerHTML = ''

    const result = posts.filter(function (post) { return post.user == profile.username})

    for(let i = 0; i < result.length; i++){
        const postCol = document.createElement("div")
        postCol.classList.add("col")

        const postCard = document.createElement("div")
        postCard.classList.add("card")
        postCard.classList.add("h-100")

        const postImage = document.createElement("img")
        postImage.setAttribute("src", `${backend_base_url}${result[i].image}`)
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
    const posts = await getBestPosts()
    const postList = document.getElementById("post_list")
    const postLikeList = document.getElementById("post_like_list")

    postList.innerHTML = ''
    postLikeList.innerHTML = ''

    const result = posts.filter(function (post) { return post.likes == profile.username})

    for(let i = 0; i < result.length; i++){
        console.log(result)
        console.log(result[i].likes)
        console.log(result[i].user)
        const postCol = document.createElement("div")
        postCol.classList.add("col")

        const postCard = document.createElement("div")
        postCard.classList.add("card")
        postCard.classList.add("h-100")

        const postImage = document.createElement("img")
        postImage.setAttribute("src", `${backend_base_url}${result[i].image}`)
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

loadProfile(profile_user_id);
