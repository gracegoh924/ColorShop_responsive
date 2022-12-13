includehtml();

var list_filter = "new"

const st = {};

st.flap = document.querySelector("#flap");
st.toggle = document.querySelector(".toggle");

st.choice1 = document.querySelector("#choice1");
st.choice2 = document.querySelector("#choice2");

st.flap.addEventListener("transitionend", () => {
  if (st.choice1.checked) {
    st.toggle.style.transform = "rotateY(-15deg)";
    list_filter = "like"
    loadPosts_3()
    setTimeout(() => (st.toggle.style.transform = ""), 400);
  } 
  else {
    list_filter = "new"
    loadPosts_3()
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

async function loadPosts() {
    const posts = await getPosts()
    const post_list = document.getElementById("post_list")
    const postUI = async () => {
        for(let post of posts){
          const newPost = document.createElement("div")
          newPost.classList.add("post_list")
          newPost.setAttribute("id", post.id)
          newPost.setAttribute("onclick", "postDetail(this.id)")

          const postImage = document.createElement("img")
          const images = await getImageDetail(post.image_id)
          postImage.setAttribute("src", `${backend_base_url}${images.after_image}`)

          const postContent = document.createElement("span")
          postContent.classList.add("content")
          postContent.innerText = post.content

          post_list.append(newPost)
          newPost.append(postImage)
          newPost.append(postContent)
        }
    }
    postUI()
}

async function loadPosts_2() {
    const posts = await getPosts()
    const post_list = document.getElementById("post_list_2")
    posts.reverse()
    const postUI = async () => {
      for(let post of posts){
        const newPost = document.createElement("div")
        newPost.classList.add("post_list")
        newPost.setAttribute("id", post.id)
        newPost.setAttribute("onclick", "postDetail(this.id)")

        const postImage = document.createElement("img")
        const images = await getImageDetail(post.image_id)
        postImage.setAttribute("src", `${backend_base_url}${images.after_image}`)

        const postContent = document.createElement("span")
        postContent.classList.add("content")
        postContent.innerText = post.content

        post_list.append(newPost)
        newPost.append(postImage)
        newPost.append(postContent)
      }
    }
    postUI()
}

async function loadPosts_3() {
    const posts = await getPosts()
    const post_list = document.getElementById("post_list_3")
    const gallery = document.getElementById('post_list_3')
    gallery.innerHTML=""
    if(list_filter === "new"){
      posts.reverse()
    }else{
      posts.sort(function(a, b)  {
        if(a.likes_count > b.likes_count) return 1;
        if(a.likes_count === b.likes_count) return 0;
        if(a.likes_count < b.likes_count) return -1;
      });
      posts.reverse()
    }
   
    const postUI = async () => {
      for(let post of posts){
        const newPost = document.createElement("div")
        newPost.classList.add("post_card")

        const postImage = document.createElement("img")
        const images = await getImageDetail(post.image_id)
        postImage.setAttribute("src", `${backend_base_url}${images.after_image}`)
        postImage.setAttribute("id", post.id)
        postImage.setAttribute("onclick", "postDetail(this.id)")

        const postContent = document.createElement("p")
        postContent.classList.add("content_3")
        postContent.innerText = post.title

        const postUser = document.createElement("p")
        postUser.classList.add("user_3")
        postUser.innerText = post.user

        const line = document.createElement("hr")
        line.classList.add("line")

        const postLike = document.createElement("i")
        postLike.setAttribute("id", "like" + post.id)
        postLike.classList.add("heart", "fa-solid", "fa-heart", "like_heart")

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
      }
    }
    postUI()
}

loadPosts_3()
