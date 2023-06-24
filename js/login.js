// section cart

let shoppingBag = document.querySelector(".loginUserAndCart i:nth-child(2)");

shoppingBag.addEventListener("click", function () {
  showCart();
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
