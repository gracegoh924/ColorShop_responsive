includehtml();

const st = {};

st.flap = document.querySelector("#flap");
st.toggle = document.querySelector(".toggle");

st.choice1 = document.querySelector("#choice1");
st.choice2 = document.querySelector("#choice2");

st.flap.addEventListener("transitionend", () => {
    if (st.choice1.checked) {
        st.toggle.style.transform = "rotateY(-15deg)";
        setTimeout(() => (st.toggle.style.transform = ""), 400);
    } else {
        st.toggle.style.transform = "rotateY(15deg)";
        setTimeout(() => (st.toggle.style.transform = ""), 400);
    }
});

st.clickHandler = (e) => {
    if (e.target.tagName === "LABEL") {
        setTimeout(() => {
            st.flap.children[0].textContent = e.target.textContent;
        }, 250);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    st.flap.children[0].textContent = st.choice2.nextElementSibling.textContent;
});

document.addEventListener("click", (e) => st.clickHandler(e));

async function loadPosts_3() {
    const posts = await getPosts()
    const post_list = document.getElementById("post_list_3")
    console.log(posts)

    const postUI = async () => {
        for (let post of posts) {
            const newPost = document.createElement("div")
            newPost.setAttribute("id", post.id)
            newPost.setAttribute("onclick", "postDetail(this.id)")
            newPost.classList.add("post_card")

            const postImage = document.createElement("img")
            const images = await getImageDetail(post.image_id)
            postImage.setAttribute("src", `${backend_base_url}${images.after_image}`)
            
            const posttitle = document.createElement("p")
            posttitle.classList.add("title_3")
            posttitle.innerText = post.title

            const postContent = document.createElement("p")
            postContent.classList.add("content_3")
            postContent.innerText = post.content

            const postUser = document.createElement("p")
            postUser.classList.add("user_3")
            postUser.innerText = post.user

            // const line = document.createElement("hr")
            // line.classList.add("line")

            const postLike = document.createElement("i")
            postLike.setAttribute("id", "like" + post.id)
            postLike.classList.add("heart", "fa-solid", "fa-heart", "like_heart")

            const likeCount = document.createElement("p")
            likeCount.setAttribute("id", "like_count")
            likeCount.classList.add("likeCount")
            likeCount.innerText = post.likes_count


            post_list.append(newPost)
            newPost.append(postImage)
            newPost.append(posttitle)
            newPost.append(postContent)
            newPost.append(postUser)
            // newPost.append(line)
            newPost.append(postLike)
            newPost.append(likeCount)
        }
    }
    postUI()
}

loadPosts_3()
