includehtml();


async function loadBestposts() {
    const posts = await getBestPosts()
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
        postContent.classList.add("content")
        postContent.innerText = post.content

        const postUser = document.createElement("p")
        postUser.classList.add("user")
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


        best_post.append(newPost)
        newPost.append(postImage)
        newPost.append(postContent)
        newPost.append(postUser)
        newPost.append(line)
        newPost.append(postLike)
        newPost.append(likeCount)
    })
}

// 로그인 확인
async function checkLogin() {
    const name = await getName();

    const loginoutButton = document.getElementById("loginout");
    if (name) {
        loginoutButton.innerText = "로그아웃";
        loginoutButton.setAttribute("onclick", "logout()");
    } else {
        loginoutButton.innerText = "로그인";
        loginoutButton.setAttribute("onclick", "location.href='/login.html'");

        const update_post = document.getElementById("update_post");
        const delete_post = document.getElementById("delete_post");

        update_post.style.visibility = "hidden";
        delete_post.style.visibility = "hidden";
    }
}

// 게시글 보기
async function loadPosts() {
    const posts = await getPosts();
    const post_list = document.getElementById("post_list");

    posts.forEach((post) => {
        // 게시글
        const newPost = document.createElement("div");
        newPost.classList.add("col");
        newPost.setAttribute("id", post.id);
        newPost.setAttribute("onclick", "postDetail(this.id)");

        // 게시글 이미지 + footer
        const newCard = document.createElement("div");
        newCard.classList.add("card");
        newCard.classList.add("border-light");
        newCard.classList.add("bg-secondary");
        newCard.setAttribute("style", "max-width:30rem;");

        // 게시글 이미지
        const postImage = document.createElement("img");
        postImage.classList.add("card-img-top");
        postImage.setAttribute(
            "src",
            `${backend_base_url}${post.image.after_image}`
        );

        // 게시글 footer(작성자 + 작성 날짜)
        const newCardFooter = document.createElement("div");
        newCardFooter.classList.add("card-footer");

        // 게시글 작성자
        const postUser = document.createElement("p");
        postUser.classList.add("text-white");
        postUser.innerText = post.user;

        // 게시글 작성 날짜
        const postTime = document.createElement("small");
        postTime.classList.add("text-white-50");
        postTime.innerText = post.update_at;

        // 게시글 붙이기
        newCardFooter.append(postUser);
        newCardFooter.append(postTime);
        newCard.append(postImage);
        newCard.append(newCardFooter);
        newPost.append(newCard);
        post_list.append(newPost);
    });
}

checkLogin();
loadBestposts()
