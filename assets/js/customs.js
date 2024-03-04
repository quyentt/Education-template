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
  // ------------select custom ----------
  var x, i, j, l, ll, selElmnt, a, b, c;
  /*Tìm class "custom-select":*/
  x = document.getElementsByClassName("custom-select");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /*Tạo DIV đóng vai trò là mục chọn:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* Tạo DIV chứa danh sách option*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
      /*Tạo DIV chứa 1 option*/
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function (e) {
        /*Cập nhật  "selected" khi click*/
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
      /*Đóng mở danh sách option*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }

  function closeAllSelect(elmnt) {
    /*Đóng mục chọn khi selected:*/
    var x,
      y,
      i,
      xl,
      yl,
      arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i);
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }
  /*Đóng mục chọn khi click ra ngoài:*/
  document.addEventListener("click", closeAllSelect);
  // auto
  const featureEle = document.querySelectorAll(" .feature-box");

  for (let i = 0; i < featureEle.length; i++) {
    let randomNum = Math.floor(Math.random() * 10 + 1);

    featureEle[i].setAttribute("data-bg", randomNum);
  }

  // show quantity modul on page responsive!
  const modulList = document.querySelector(".modul-v2 .modul-list");
  const modulItem = document.querySelectorAll(".modul-v2 .modul-item");

  console.log(modulItem[0].offsetWidth);
  /*Lấy chiều rộng list modul*/
  const modulListW = modulList.offsetWidth;
  /*Số lượng modul có thể hiển thị trên 1 dòng*/
  const modulItemPerRow = Math.floor((modulListW - 41) / 220);
  console.log(modulListW);
  /*Lấy số lượng modul*/
  const modulItemQuantity = modulItem.length;
  /*Hiển thị modul trên 1 dòng, ẩn phần còn lại*/
  for (let i = 0; i < modulItemPerRow; i++) {
    modulItem[i].classList.add("modul-show");
  }
  const modulViewMore = document.querySelector(".modul-view-more");
  if (modulItemQuantity > modulItemPerRow) {
    modulViewMore.classList.add("show");
  }
  modulViewMore.addEventListener("click", () => {
    modulViewMore.classList.remove("show");
    for (let i = 0; i <= modulItemQuantity; i++) {
      modulItem[i].classList.add("modul-show");
    }
  });
});
