"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");
const formElement = document.querySelector(".form");

const MAX_IMAGES = 5;

let play = true;
let noCount = 0;

yesButton.addEventListener("click", handleYesClick);

noButton.addEventListener("click", function () {
  if (play) {
    noCount++;
    const imageIndex = Math.min(noCount, MAX_IMAGES);
    changeImage(imageIndex);
    resizeYesButton();
    updateNoButtonText();
    if (noCount === MAX_IMAGES) {
      play = false;
    }
  }
});

function handleYesClick() {
  // Ẩn tiêu đề và các nút
  titleElement.classList.add("hidden");
  buttonsContainer.classList.add("hidden");

  // Hiển thị biểu mẫu
  formElement.classList.remove("hidden");

  // Thay đổi hình ảnh thành cat-0.jpg khi biểu mẫu hiển thị
  catImg.src = "img/cat-0.jpg";
}

formElement.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(formElement);

  fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(formData).toString(),
  })
    .then(function () {
      // Hiển thị thông điệp cuối cùng
      titleElement.innerHTML = "Yayyy!! Hẹn gặp em vào tối nay ^^";
      titleElement.classList.remove("hidden");

      // Ẩn biểu mẫu
      formElement.classList.add("hidden");

      // Thay đổi hình ảnh khi nhấn "Yes" để gửi thông điệp cuối cùng
      changeImage("yes");
    })
    .catch(function (error) {
      console.error("Form submission error:", error);
    });
}

function resizeYesButton() {
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(
    computedStyle.getPropertyValue("font-size")
  );
  const newFontSize = fontSize * 1.6;

  yesButton.style.fontSize = `${newFontSize}px`;
}

function generateMessage(noCount) {
  const messages = [
    "No",
    "Are you sure?",
    "Pleaseeee",
    "Don't do this to me :(",
    "You're breaking my heart",
    "I'm gonna cry...",
  ];

  const messageIndex = Math.min(noCount, messages.length - 1);
  return messages[messageIndex];
}

function changeImage(image) {
  catImg.src = `img/cat-${image}.jpg`;
}

function updateNoButtonText() {
  noButton.innerHTML = generateMessage(noCount);
}
