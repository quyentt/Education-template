$(document).ready(function () {
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

  // Xử lý box chức năng----------------------------------------
  const featureItem = document.querySelectorAll(".action-group .item");
  const featureItem2 = document.querySelectorAll(".feature-list .feature-item");

  const featureItemMaxHeightArr = [];
  featureItem2.forEach((item) => {
    const featureLink = item.querySelector(".feature-box");
    featureLink.addEventListener("click", (e) => {
      //e.preventDefault();

      var itemPosition = featureLink.getAttribute("data-position");
      if (!itemPosition) {
        itemPosition = 0;
      }
      console.log(itemPosition);
      localStorage.setItem("dataPosition", itemPosition);
    });
  });

  featureItem.forEach((item) => {
    /* Index swiperJs when click*/
    const featureLink = item.querySelector(".feature-box");

    featureLink.addEventListener("click", (e) => {
      //e.preventDefault();

      var itemPosition = featureLink.getAttribute("data-position");
      if (!itemPosition) {
        itemPosition = 0;
      }
      console.log(itemPosition);
      localStorage.setItem("dataPosition", itemPosition);
    });

    /* Thiết lập chiều cao box chức năng */

    const featureItemHeight = item.clientHeight;
    featureItemMaxHeightArr.push(featureItemHeight);
    featureItemMaxHeight = Math.max(...featureItemMaxHeightArr);
    item.setAttribute("style", "height:" + featureItemMaxHeight + "px");
  });
  var dataPosition = localStorage.getItem("dataPosition");
  console.log(dataPosition);
  var swiper = new Swiper(".label-slider", {
    spaceBetween: 0,
    slidesPerView: "auto",
    freeMode: false,
    watchSlidesProgress: false,
    // simulateTouch: false
  });

  var swiper2 = new Swiper(".content-slider", {
    initialSlide: dataPosition,
    autoHeight: true,
    spaceBetween: 0,
    navigation: false,
    noSwipingClass: ["no-swiper"],
    thumbs: {
      swiper: swiper,
    },
  });
  var swiperInwiper = new Swiper(".tab-header-nav", {
    spaceBetween: 0,
    slidesPerView: "auto",
    freeMode: false,
    watchSlidesProgress: false,
  });
  var swiperInwiper2 = new Swiper(".swiper-tab-content", {
    initialSlide: dataPosition,
    autoHeight: true,
    spaceBetween: 0,
    navigation: false,
    noSwipingClass: ["no-swiper"],
    thumbs: {
      swiper: swiperInwiper,
    },
  });

  // upload image vs video---------------------------------------------------
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

  // play video modal---------------------------------------------------------
  $("#video_view").on("shown.bs.modal", function (e) {
    $(".video__view").attr("src", videoSrc);
  });

  //   color picker---------------------------------------------------------
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
  //Tự động thay đổi màu sắc box chức năng-------------------------------------
  const featureEle = document.querySelectorAll(" .feature-box");

  for (let i = 0; i < featureEle.length; i++) {
    let randomNum = Math.floor(Math.random() * 10 + 1);

    featureEle[i].setAttribute("data-bg", randomNum);
  }

  // show quantity modul on page responsive!------------------------------------
  const modulList = document.querySelector(".modul-v2 .modul-list");
  const modulItem = document.querySelectorAll(".modul-v2 .modul-item");
  if (modulList) {
    /*Lấy chiều rộng list modul*/
    const modulListW = modulList.offsetWidth;
    /*Số lượng modul có thể hiển thị trên 1 dòng*/
    const modulItemPerRow = Math.floor((modulListW - 41) / 220);

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
  }
  // myTab-------------------------------------------------------------------------------

  const myFunctionWrap = document.querySelectorAll(".function");
  myFunctionWrap.forEach((funcEle) => {
    const myTabLink = funcEle.querySelectorAll(".myTab-header-link");
    const myTabItem = funcEle.querySelectorAll(".myTab-item");
    const leftNav = funcEle.querySelector(".function-nav");
    const featureActionActive = funcEle.querySelector(
      ".feature-action-group-first"
    );
    if (featureActionActive) {
      leftNav.innerHTML = featureActionActive.innerHTML;
    }

    myTabLink.forEach((el) => {
      el.addEventListener("click", showMyTab);
    });

    function showMyTab(el) {
      const btn = el.currentTarget;
      const dataTarget = btn.getAttribute("data-myTab");
      myTabItem.forEach((el) => {
        el.classList.remove("show");
      });
      myTabLink.forEach((el) => {
        el.classList.remove("active");
      });
      const myTabItemshow = document.querySelector("#" + dataTarget);
      myTabItemshow.classList.add("show");
      btn.classList.add("active");

      const featureAction = myTabItemshow.querySelector(
        ".feature-action-group "
      ).innerHTML;

      leftNav.innerHTML = featureAction;
    }
  });

  // select custom -----------------------------------------------------------
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
    a.innerHTML =
      "<span>" + selElmnt.options[selElmnt.selectedIndex].innerHTML + "</span>";
    x[i].appendChild(a);
    /* Tạo DIV chứa danh sách option*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
      /*Tạo DIV chứa 1 option*/
      c = document.createElement("DIV");

      if (selElmnt.options[j].defaultSelected) {
        c.setAttribute("class", "same-as-selected");
      }
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
      this.previousElementSibling.classList.toggle("icon-toggle");
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
  document.addEventListener("click", () => {
    let it = document.querySelector(".icon-toggle");
    if (it) {
      it.classList.remove("icon-toggle");
    }
  });

  //responsive tab header--------------------------

  const myTabHeader = document.querySelectorAll(".myTab-header");
  myTabHeader.forEach((el) => {
    const myTabHeaderHeight = el.offsetHeight;
    if (myTabHeaderHeight > 60) {
      el.classList.add("myTab-header-res");
    }
  });

  // swipe table-----------------------------------------------------------
  const swipeScroll = document.querySelectorAll(".table-responsive111");

  let isDown = false;
  let startX;
  let scrollLeft;

  swipeScroll.forEach((slider) => {
    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener("mouseleave", () => {
      isDown = false;
    });
    slider.addEventListener("mouseup", () => {
      isDown = false;
    });
    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
    });
  });

  //modal show test
  $(window).on("load", function () {
    // $("#timkiem_sinhvien").modal("show");
  });
});
