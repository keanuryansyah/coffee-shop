window.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    let scroll = window.pageYOffset;

    //rotate coffee

    let rotateCoffee = document.querySelector("main .rotateCoffee");
    rotateCoffee.style.transform = `rotate(${scroll}deg)`;

    // end---

    // rotate coffe change color

    let firstSec = document.getElementById("sectionFirst");

    if (scroll >= firstSec.offsetHeight) {
      rotateCoffee.style.color = "var(--second-color)";
    } else {
      rotateCoffee.style.color = "var(--third-color)";
    }

    // end---

    // animation signature card

    let ourSignatureProductAll = document.querySelectorAll(
      ".ourSignatureProduct"
    );

    if (scroll >= 556) {
      for (let ourSignature of ourSignatureProductAll) {
        ourSignature.classList.add("show");

        ourSignatureProductAll[1].style.transitionDelay = ".4s";
        ourSignatureProductAll[2].style.transitionDelay = ".8s";
        ourSignatureProductAll[3].style.transitionDelay = "1.2s";

        setTimeout(() => {
          ourSignature.style.transitionDelay = "0s";
        }, 0);
      }
    }

    // end---
  });

  // section cart

  let shoppingBag = document.querySelector(".loginUserAndCart i:nth-child(2)");

  shoppingBag.addEventListener("click", function () {
    showCart();
  });

  // item plus in our signature menu

  let itemPlusAll = document.querySelectorAll(".manyProduct p:last-child");

  itemPlusAll.forEach(function (itemPlus) {
    itemPlus.addEventListener("click", function () {
      itemplus(itemPlus);
    });
  });

  // item min in our signature menu

  let itemMinAll = document.querySelectorAll(".manyProduct p:first-child");

  itemMinAll.forEach(function (itemMin) {
    itemMin.addEventListener("click", function () {
      itemmin(itemMin);
    });
  });

  // add to bag klik

  let addToBagAll = document.querySelectorAll(".viewAndAddToCart button");

  addToBagAll.forEach(function (addToBag) {
    let manyProductAll = document.querySelectorAll(
      ".manyProduct p:nth-child(2)"
    );

    for (let manyProduct of manyProductAll) {
      if (manyProduct.innerText == 0) {
        addToBag.disabled = true;

        addToBag.style.backgroundColor = "grey";
        addToBag.style.cursor = "not-allowed";
      }
    }

    addToBag.addEventListener("click", function () {
      addtobag(addToBag);
    });
  });

  // section cart change to localstorage
  let cacheLcs = localStorage.getItem("cachebag");

  if (cacheLcs) {
    let sectionCartChange = document.getElementById("sectionCart");
    sectionCartChange.innerHTML = cacheLcs;

    // plus item in bag
    let plusButtons = document.querySelectorAll(".editItem p:last-child");

    plusButtons.forEach(function (plusButton) {
      plusButton.addEventListener("click", function () {
        plusitem(plusButton);
      });
    });

    // min item in bag
    let minButtons = document.querySelectorAll(".editItem p:first-child");

    minButtons.forEach(function (minButton) {
      minButton.addEventListener("click", function () {
        minitem(minButton);
      });
    });

  }

  // review active

  let allBoxReview = document.querySelectorAll(".boxReview");
  allBoxReview[0].classList.add("active");

  let countSlide = 0;
  setInterval(function () {
    countSlide++;

    if (countSlide > 2) {
      countSlide = 0;
    }

    for (let allBox of allBoxReview) {
      allBox.classList.remove("active");
    }

    if (allBoxReview[countSlide]) {
      allBoxReview[countSlide].classList.add("active");
    }
  }, 5000);

  // customer review title active
  window.addEventListener("scroll", function () {
    let scroll = window.pageYOffset;

    if (scroll >= 837) {
      let sectionCtnH3 = this.document.querySelector("#sectionCtn h3");

      sectionCtnH3.classList.add("active");
    }
  });



  // login true
  let body = document.body.getAttribute("check");

  if (body == 1) {

    sendobjek();
    
  }
















  
});


