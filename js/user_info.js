const profileUrl = '?id=1'
const urlParams = new URLSearchParams(profileUrl)
const user_id = urlParams.get('id')

async function loadUserinfo(user_id){
    const profile = await getProfile(user_id)

    const profileImage = document.getElementById("profile_image")
    profileImage.setAttribute("src", `${backend_base_url}${profile.profile_img}`)

    const nickname = document.getElementById("nickname")
    nickname.innerText = profile.username

    const bio = document.getElementById("bio")
    bio.innerText = profile.bio
}