includehtml();

// 이미지 업로드
const dropArea = document.querySelector(".drag-area"),
  dragText = dropArea.querySelector("header"),
  button = dropArea.querySelector("button"),
  input = dropArea.querySelector("input");
let file;

button.onclick = () => {
  input.click();
};

input.addEventListener("change", function () {
  file = this.files[0];
  dropArea.classList.add("active");
  showFile();
});

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  file = event.dataTransfer.files[0];
  showFile();
});

function showFile() {
  let fileType = file.type;
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
  if (validExtensions.includes(fileType)) {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let fileURL = fileReader.result;
      let imgTag = `<img src="${fileURL}" alt="">`;
      dropArea.innerHTML = imgTag;
    };
    fileReader.readAsDataURL(file);
  } else {
    alert("이미지 파일이 아닙니다.");
    dropArea.classList.remove("active");
    dragText.textContent = "드래그 하여 이미지 업로드";
  }
}

// 화풍 설정
async function selectImageStyle(imagemodel_id) {
  const response = await fetch(
    `http://127.0.0.1:8000/posts/choosemodel/${imagemodel_id}`,
    {
      method: "GET",
    }
  );

  response_json = await response.json();
  return response_json;
}

// 이미지 DB 업로드
async function uploadImage() {
  const imageData = new FormData();
  imageData.append("before_image", file);
  imageData.append("model", response_json.model);

  const response = await fetch("http://127.0.0.1:8000/posts/upload/", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    body: imageData,
  });

  if (response.status == 201) {
    // 홈페이지에서 after_image 띄우기
    const getimages = await getImages();
    const after_image = document.getElementById("after_image");
    console.log(getimages);
    after_image.setAttribute(
      "src",
      `${backend_base_url}${getimages.after_image}`
    );
    return response;
  } else {
    if (file == null) {
      alert("파일을 올려주세요");
    } else if (response_json.model == null) {
      alert("화풍을 선택해주세요");
    } else {
      alert("로그인 해주세요");
    }
  }
}

// 이미지 파일 변환
async function transferImage() {
  const beforeimg = document.getElementById("beforeimage").value;
  const response = await fetch("http://127.0.0.1:8000/posts/upload/", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    method: "PUT",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (response.status == 200) {
    return response;
  } else {
    alert(response.status);
  }
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

// 포스팅 모달창 띄우기
const modal = document.getElementById("post_modal");
const buttonAddFeed = document.getElementById("img_post_btn");
buttonAddFeed.addEventListener("click", (e) => {
  modal.style.top = window.pageYOffset + "px";
  modal.style.display = "flex";
  document.body.style.overflowY = "hidden";
});

// 포스팅 모달창 이미지 띄우기
async function deepImages() {
  const getimages = await getImages();
  const deepimg = document.getElementById("deepimage");
  deepimg.setAttribute("src", `${backend_base_url}${getimages.after_image}`);
}

// 포스팅 등록
function postCreate() {
  const content = document.getElementById("input_content").value;
  postPost(content);
}

// 포스팅 모달창 닫기
const buttonCloseModal = document.getElementById("close_modal");
buttonCloseModal.addEventListener("click", (e) => {
  modal.style.display = "none";
  document.body.style.overflowY = "visible";
});

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
loadPosts();
