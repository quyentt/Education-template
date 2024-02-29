$(document).ready(function () {
  var swiper = new Swiper(".label-slider", {
    spaceBetween: 0,
    slidesPerView: "auto",
    freeMode: false,
    watchSlidesProgress: false,
    // simulateTouch: false
  });
  var swiper2 = new Swiper(".content-slider", {
    autoHeight: true,
    spaceBetween: 0,
    navigation: false,
    thumbs: {
      swiper: swiper,
    },
  });
  $(".menu-toggle").click(function () {
    $(".main-menu ul").toggleClass("show");
  });
  $(".head-search-toggle").click(function () {
    $(".head-search-form").toggleClass("show");
  });

  $(document).on("click", function (event) {
    if (
      !$(event.target).closest(".head-search-form").length &&
      !$(event.target).closest(".main-menu").length
    ) {
      $(".head-search-form").removeClass("show");
    }
    if (
      !$(event.target).closest(".main-menu").length &&
      !$(event.target).closest(".main-menu").length
    ) {
      $(".main-menu ul").removeClass("show");
    }
  });

  // upload image vs video
  const imgVideoUpload = document.querySelectorAll(".image-selector");
  let videoSrc;
  imgVideoUpload.forEach((item) => {
    const fileUpload = item.querySelector(".file-input");
    const fileView = item.querySelector(".file-prev");

    fileUpload.addEventListener("change", function (e) {
      const inputTarget = e.target;
      const file = inputTarget.files[0];

      if (file) {
        const reader = new FileReader();

        reader.addEventListener("load", function (e) {
          const readerTarget = e.target;
          const fileType = file.type.split("/")[0];

          if (fileType === "image") {
            console.log(fileType);
            const img = document.createElement("img");
            img.src = readerTarget.result;
            fileView.innerHTML = "";
            fileView.appendChild(img);
          } else if (fileType === "video") {
            const video = document.createElement("video");
            video.src = readerTarget.result;
            fileView.innerHTML = "";
            fileView.appendChild(video);
            video.classList.add("file-upload");
            video.controls = false;
            video.muted = true;
            const videoViewLink = item.querySelector(".video-view-link");
            videoViewLink.setAttribute("data-src", readerTarget.result);
            videoViewLink.classList.add("has-link");
            // get link video
            videoViewLink.addEventListener("click", () => {
              videoSrc = videoViewLink.dataset.src;
            });
          } else {
            return;
          }
        });

        reader.readAsDataURL(file);
      } else {
        fileView.innerHTML = "";
      }
    });
  });

  // play video modal
  $("#video_view").on("shown.bs.modal", function (e) {
    $(".video__view").attr("src", videoSrc);
  });

  //   color picker
  const colourPickerFields = document.querySelectorAll(".colour-picker-field");

  colourPickerFields.forEach((item) => {
    const text = item.querySelector(".colour-picker-field__item--text");
    const picker = item.querySelector(".colour-picker-field__item--picker");

    function handleSetColours(item1 = text, item2 = picker) {
      let colour = item1.value;
      item2.value = colour;
      text.style.border = `1px solid ${colour}`;
    }

    if (text.value) {
      handleSetColours();
    }
    text.addEventListener("change", (e) => {
      handleSetColours();
    });
    picker.addEventListener("input", (e) => {
      handleSetColours(picker, text);
    });
  });

  // end
});
