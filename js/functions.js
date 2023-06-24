function showCart() {
  let sectionCart = document.getElementById("sectionCart");

  sectionCart.classList.add("show");

  window.addEventListener("click", function (ev) {
    if (ev.target == sectionCart) {
      sectionCart.classList.remove("show");
    }
  });

  // close button
  let closeButton = document.querySelector(".closeSectionCart");
  closeButton.addEventListener("click", function () {
    sectionCart.classList.remove("show");
  });
}

function itemplus(itemPlusButton) {
  let currentManyItem = itemPlusButton.previousElementSibling;

  let manyItemPlus = Number(currentManyItem.innerText);
  manyItemPlus++;

  currentManyItem.innerText = manyItemPlus;

  // disabled false;
  let addToBagAll = document.querySelectorAll(".viewAndAddToCart button");

  for (let i = 0; i < addToBagAll.length; i++) {
    if (
      addToBagAll[i].parentElement ==
      itemPlusButton.parentElement.parentElement.nextElementSibling
    ) {
      addToBagAll[i].disabled = false;
      addToBagAll[i].style.backgroundColor = "var(--third-color)";
      addToBagAll[i].style.cursor = "pointer";
      addToBagAll[i].style.transition = ".4s";
    }
  }
}

function itemmin(itemMinButton) {
  let countItem = 0;
  countItem--;

  if (itemMinButton.nextElementSibling.innerText == 0) {
    return;
  }

  if (itemMinButton.nextElementSibling.innerText > 0) {
    let item = itemMinButton.nextElementSibling.innerText;

    let test = item;
    test--;

    itemMinButton.nextElementSibling.innerText = test;

    console.log(test);

    if (itemMinButton.nextElementSibling.innerText == 0) {
      // disabled true;
      let addToBagAll = document.querySelectorAll(".viewAndAddToCart button");

      for (let i = 0; i < addToBagAll.length; i++) {
        if (
          addToBagAll[i].parentElement ==
          itemMinButton.parentElement.parentElement.nextElementSibling
        ) {
          addToBagAll[i].disabled = true;
          addToBagAll[i].style.backgroundColor = "grey";
          addToBagAll[i].style.cursor = "not-allowed";
          addToBagAll[i].style.transition = ".4s";
        }
      }
    }

    return;
  }

  itemMinButton.nextElementSibling.innerText = countItem;
}

function addtobag(addButton) {
  // added to bag pop up active
  let addedToBag = document.querySelector(".addedToBag");
  addedToBag.classList.add("active");

  setTimeout(function () {
    addedToBag.classList.remove("active");
  }, 2000);

  // add button disabled
  addButton.disabled = true;
  addButton.style.backgroundColor = "grey";
  addButton.style.cursor = "not-allowed";

  // GET CURRENT PRICE ADD BUTTON CLICK

  let currentPrice = addButton.getAttribute("current-price");

  // END

  // GET IMAGE OF PRODUCT

  let imageProd = addButton.parentElement.parentElement.parentElement
    .querySelector(".topSignatureMenu img")
    .getAttribute("src");

  // END

  // GET NAME OF PRODUCT

  let nameProd =
    addButton.parentElement.parentElement.querySelector(
      ".nameProduct p"
    ).innerText;

  // END

  // GET CATEGORIES OF PRODUCT

  let categoriesProd = addButton.parentElement.parentElement.querySelector(
    ".tagAndPrice p:first-child"
  ).innerText;

  // END

  // GET MANY ITEM ADD TO BAG

  let manyItemAddToBag = addButton.parentElement.parentElement
    .querySelector(".tagAndPrice")
    .querySelector(".manyProduct p:nth-child(2)").innerText;

  // END

  // ------------------ PRICE OF ITEM ---------------

  let currentPriceNumber = Number(currentPrice);
  let priceFixed = currentPriceNumber * Number(manyItemAddToBag);

  // ---------- end

  // USER LOGINED ADD TO BAG

  let body = document.body.getAttribute("check");

  if(body == 1) {

    let dataProduk = {};

    // DATA PRODUK
    dataProduk.image_produk = imageProd;
    dataProduk.name_produk = nameProd;
    dataProduk.categories_produk = categoriesProd;
    dataProduk.manyItem_produk = manyItemAddToBag;
    dataProduk.price_produk = priceFixed + "0";
    dataProduk.original_price = currentPrice;

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if( xhr.readyState == 4 && xhr.status == 200 ) {

        console.log(JSON.stringify(dataProduk));

      }
    }

    xhr.open("POST", "loginbag.php?addtobag=" + JSON.stringify(dataProduk), true);
    xhr.send();


  }

  // ------ JIKA ITEM SUDAH ADA DIDALAM BAG

  let allNameOfProductBag = document.querySelectorAll(
    ".nameAndCategories p:first-child"
  );

  for (let allNameOfBag of allNameOfProductBag) {
    if (allNameOfBag.innerText == nameProd) {
      // update many item and price iem

      // many item update
      let currentManyExistItem =
        allNameOfBag.parentElement.nextElementSibling.querySelector(
          "p:nth-child(2)"
        );

      currentManyExistItem.innerText =
        Number(currentManyExistItem.innerText) + Number(manyItemAddToBag);

      // price item update
      let currentPriceExistItem =
        allNameOfBag.parentElement.nextElementSibling.nextElementSibling.querySelector(
          "span:last-child"
        );

      let newPriceItem =
        Number(currentPriceExistItem.innerText) + Number(priceFixed);

      currentPriceExistItem.innerText = newPriceItem.toFixed(2);

      // subtotal update
      let currentSubtotal = document.querySelector(
        ".subtotalPrice span:last-child"
      );
      let newSubtotal = Number(currentSubtotal.innerText) + Number(priceFixed);

      currentSubtotal.innerText = newSubtotal.toFixed(2);

      // total update
      let currentTotalPrice = document.querySelector(
        ".totalPaymentPrice span:last-child"
      );

      let newTotalPrice =
        Number(currentTotalPrice.innerText) + Number(priceFixed);

      currentTotalPrice.innerText = newTotalPrice.toFixed(2);

      // reset many item add
      addButton.parentElement.parentElement.querySelector(
        ".manyProduct p:nth-child(2)"
      ).innerText = 0;

      // set local storage bag

      let sectionCart = document.getElementById("sectionCart");

      localStorage.setItem("cachebag", sectionCart.innerHTML);

      return;
    }
  }

  // END -------------

  // rangkai order item child

  // orderItemChild
  let orderItemChild = document.createElement("div");
  orderItemChild.setAttribute("class", "orderItemChild");

  // leftItemChild
  let leftItemChild = document.createElement("div");
  leftItemChild.setAttribute("class", "leftItemChild");

  // img element for leftItemChild
  let img = document.createElement("img");
  img.setAttribute("src", imageProd);
  img.setAttribute("alt", "My added menu");

  leftItemChild.appendChild(img);
  orderItemChild.appendChild(leftItemChild);

  // rightItemChild
  let rightItemChild = document.createElement("div");
  rightItemChild.setAttribute("class", "rightItemChild");

  // name and categories for rightItemChild
  let nameAndCategories = document.createElement("div");
  nameAndCategories.setAttribute("class", "nameAndCategories");

  // tag p for nameAndCategories
  let pNameItem = document.createElement("p");
  pNameItem.setAttribute("original-price", currentPrice)
  pNameItem.innerText = nameProd;

  let pCategoriesItem = document.createElement("p");
  pCategoriesItem.innerText = categoriesProd;

  nameAndCategories.append(pNameItem, pCategoriesItem);
  rightItemChild.appendChild(nameAndCategories);

  // editItem
  let editItem = document.createElement("div");
  editItem.setAttribute("class", "editItem");

  // tag p for editItem
  let pMin = document.createElement("p");
  pMin.innerText = "-";
  pMin.setAttribute("current-price", currentPrice);

  let pManyItem = document.createElement("p");
  pManyItem.innerText = manyItemAddToBag;

  let pPlus = document.createElement("p");
  pPlus.innerText = "+";
  pPlus.setAttribute("current-price", currentPrice);

  editItem.append(pMin, pManyItem, pPlus);
  rightItemChild.appendChild(editItem);

  // priceItemBag
  let priceItemBag = document.createElement("div");
  priceItemBag.setAttribute("class", "priceItemBag");

  // span for priceItemBag
  let span$ = document.createElement("span");
  span$.innerText = "$";
  let spanPriceItem = document.createElement("span");
  spanPriceItem.innerText = priceFixed.toFixed(2);

  priceItemBag.append(span$, spanPriceItem);
  rightItemChild.appendChild(priceItemBag);

  orderItemChild.appendChild(rightItemChild);

  // ORDER ITEM PR
  let orderItemPr = document.querySelector(".orderItemPr");
  orderItemPr.appendChild(orderItemChild);

  // END

  // SUBTOTAL

  let currentSubtotal = document.querySelector(
    ".subtotalPrice span:last-child"
  );
  let newSubtotalNumber =
    Number(currentSubtotal.innerText) + Number(priceFixed);
  currentSubtotal.innerText = newSubtotalNumber.toFixed(2);

  // END

  // SHIPPING PRICE

  let currentShippingPrice = document.querySelector(
    ".shippingPrice span:last-child"
  );
  currentShippingPrice.remove();

  let newShippingPrice = document.createElement("span");
  newShippingPrice.innerText = 5.12;

  let shippingPriceRoot = document.querySelector(".shippingPrice");
  shippingPriceRoot.appendChild(newShippingPrice);

  // TOTAL PAYMENT

  let currentTotalPay = document.querySelector(
    ".totalPaymentPrice span:last-child"
  );
  let newTotalPay = Number(currentTotalPay.innerText) + Number(priceFixed);
  currentTotalPay.innerText = newTotalPay.toFixed(2);

  // END

  // CHECKOUT
  let checkOutButton = document.querySelector(".checkOutButton a");
  checkOutButton.remove();

  let newCheckoutButton = document.createElement("a");
  newCheckoutButton.setAttribute("href", "checkout.php");
  newCheckoutButton.innerText = "Checkout now!";

  let checkoutButtonRoot = document.querySelector(".checkOutButton");

  checkoutButtonRoot.appendChild(newCheckoutButton);

  // reset many item add
  addButton.parentElement.parentElement.querySelector(
    ".manyProduct p:nth-child(2)"
  ).innerText = 0;

  // text empty remove
  let textEmpty = document.querySelector(".textEmpty");

  if (textEmpty == null) {
    // set local storage bag

    let sectionCart = document.getElementById("sectionCart");

    localStorage.setItem("cachebag", sectionCart.innerHTML);

    pPlus.addEventListener("click", function () {
      plusitem(pPlus);
    });

    pMin.addEventListener("click", function () {
      minitem(pMin);
    });

    return;
  }

  textEmpty.remove();

  // set local storage bag

  let sectionCart = document.getElementById("sectionCart");

  localStorage.setItem("cachebag", sectionCart.innerHTML);

  pPlus.addEventListener("click", function () {
    plusitem(pPlus);
  });

  pMin.addEventListener("click", function () {
    minitem(pMin);
  });
}

// plus item in bag

function plusitem(plusButton) {

  // GET ORIGINAL PRICE OF PRODUCT

  let originalPriceOfProduct = plusButton.getAttribute("current-price");

  // END

  // UPDATE CURRENT MANY OF PRODUCT

  let currentManyExistItem = plusButton.previousElementSibling;

  currentManyExistItem.innerText = Number(currentManyExistItem.innerText) + 1;

  // END

  // UPDATE CURRENT PRICE OF PRODUCT

  let currentPriceExistItem =
    plusButton.parentElement.nextElementSibling.querySelector(
      "span:last-child"
    );

  let newPriceOfProduct =
    Number(currentPriceExistItem.innerText) + Number(originalPriceOfProduct);

  currentPriceExistItem.innerText = newPriceOfProduct.toFixed(2);

  // END

    // IF USER LOGINED
    let body = document.body.getAttribute("check");

    if(body == 1) {

      let name_produk = plusButton.parentElement.parentElement.querySelector(".nameAndCategories p:first-child").innerText;

      let objekPlus = {};

      objekPlus.name_produk = name_produk;
      objekPlus.original_price = originalPriceOfProduct;

  
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "loginbag.php?objekPlus=" + JSON.stringify(objekPlus), true)
      xhr.send();
  
    }

  // UPDATE CURRENT SUBTOTAL

  let currentSubtotal = document.querySelector(
    ".subtotalPrice span:last-child"
  );

  let newSubtotal =
    Number(currentSubtotal.innerText) + Number(originalPriceOfProduct);

  currentSubtotal.innerText = newSubtotal.toFixed(2);

  // END

  // UPDATE CURRENT TOTAL PAYMENT

  let currentTotalPay = document.querySelector(
    ".totalPaymentPrice span:last-child"
  );

  let newTotalPay =
    Number(currentTotalPay.innerText) + Number(originalPriceOfProduct);

  currentTotalPay.innerText = newTotalPay.toFixed(2);

  // END

  // set local storage bag

  let sectionCart = document.getElementById("sectionCart");

  localStorage.setItem("cachebag", sectionCart.innerHTML);
}

// min item in bag

function minitem(minButton) {
  // GET ORIGINAL PRICE OF PRODUCT

  let originalPriceOfProduct = minButton.getAttribute("current-price");

  // END

  // UPDATE CURRENT MANY OF PRODUCT

  let currentManyExistItem = minButton.nextElementSibling;

  currentManyExistItem.innerText = Number(currentManyExistItem.innerText) - 1;

  if (currentManyExistItem.innerText == 0) {
    minButton.parentElement.parentElement.parentElement.style.transform =
      "translate(-100%)";

    setTimeout(function () {
      let deleteRoot = minButton.parentElement.parentElement.parentElement;

      deleteRoot.remove();

      // set local storage bag

      let sectionCart = document.getElementById("sectionCart");

      localStorage.setItem("cachebag", sectionCart.innerHTML);


    }, 2000);
  }

  // END

  // UPDATE CURRENT PRICE OF PRODUCT

  let currentPriceExistItem =
    minButton.parentElement.nextElementSibling.querySelector("span:last-child");

  let newPriceOfProduct =
    Number(currentPriceExistItem.innerText) - Number(originalPriceOfProduct);

  currentPriceExistItem.innerText = newPriceOfProduct.toFixed(2);

  // END

  // UPDATE CURRENT SUBTOTAL

  let currentSubtotal = document.querySelector(
    ".subtotalPrice span:last-child"
  );

  let newSubtotal =
    Number(currentSubtotal.innerText) - Number(originalPriceOfProduct);

  currentSubtotal.innerText = newSubtotal.toFixed(2);

  // END

  // UPDATE CURRENT TOTAL PAYMENT

  let currentTotalPay = document.querySelector(
    ".totalPaymentPrice span:last-child"
  );

  let newTotalPay =
    Number(currentTotalPay.innerText) - Number(originalPriceOfProduct);

  currentTotalPay.innerText = newTotalPay.toFixed(2);

  // END

  if (currentTotalPay.innerText == 0.00) {
    setTimeout(function () {

      // REMOVE CACHEBAG LCS
      localStorage.removeItem("cachebag");

      // text empty root
      let textEmptyRoot = document.createElement("div");
      textEmptyRoot.setAttribute("class", "textEmpty");
      let textEmpty = document.createElement("h2");
      textEmpty.innerText = "Your bag is empty(0), please shop first...";

      textEmptyRoot.appendChild(textEmpty);

      let orderItemPr = document.querySelector(".orderItemPr");

      orderItemPr.appendChild(textEmptyRoot);

      // shipping price
      let currentShippingPrice = document.querySelector(
        ".shippingPrice span:last-child"
      );
      currentShippingPrice.remove();

      let shippingPriceRoot = document.querySelector(".shippingPrice");

      let newShippingPrice = document.createElement("span");
      newShippingPrice.innerText = "0.00";

      shippingPriceRoot.appendChild(newShippingPrice);

      // checkout button
      let currentCheckoutButton = document.querySelector(".checkOutButton a");
      currentCheckoutButton.remove();

      let checkoutButtonRoot = document.querySelector(".checkOutButton");
      let newCheckoutButton = document.createElement("a");
      newCheckoutButton.setAttribute("href", "shop.php");
      newCheckoutButton.innerText = "Shop now!";

      checkoutButtonRoot.appendChild(newCheckoutButton);

      // set local storage bag
    }, 2000);
  }

  // set local storage bag

  let sectionCart = document.getElementById("sectionCart");

  localStorage.setItem("cachebag", sectionCart.innerHTML);
}




// FUNCTION USER LOGIN IMPORT ALL ITEM CART TO DATABASE

function sendobjek() {

  let running = localStorage.getItem("running");

  if (running) {
    return;
  }

  let emptyArr = [];
  // get all order item child
  let allOrderItemChild = document.querySelectorAll(".orderItemChild");

  if (allOrderItemChild.length == 0) {
    
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {

      
        let sectionCart = document.getElementById("sectionCart");

        sectionCart.innerHTML = xhr.responseText;

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

        localStorage.setItem("cachebag", xhr.responseText);



      }
    };

    xhr.open("GET", "loginbag.php", true);
    xhr.send();

    localStorage.setItem("running", 1);

    return;

  }

  for (let orderItemChild of allOrderItemChild) {
    let obj = {};

    // IMAGE PRODUCT
    let imageProd = orderItemChild
      .querySelector(".leftItemChild img")
      .getAttribute("src");

    // NAME PRODUCT
    let nameProd = orderItemChild.querySelector(
      ".nameAndCategories p:first-child"
    ).innerText;

    // CATEGORIES PRODUCT
    let categoriesProd = orderItemChild.querySelector(
      ".nameAndCategories p:last-child"
    ).innerText;

    // MANY PRODUCT
    let manyProduct = orderItemChild.querySelector(
      ".editItem p:nth-child(2)"
    ).innerText;

    // PRICE ITEM BAG
    let priceItemBag = orderItemChild.querySelector(
      ".priceItemBag span:last-child"
    ).innerText;

    // ORIGINAL PRICE
    let originalPrice = orderItemChild.querySelector(".nameAndCategories p:first-child").getAttribute("original-price");

    obj.imageOfProduct = imageProd;
    obj.nameOfProduct = nameProd;
    obj.categoriesOfProduct = categoriesProd;
    obj.manyOfProduct = manyProduct;
    obj.priceOfProduct = priceItemBag;
    obj.originalPriceOfProduct = originalPrice;
    emptyArr.push(obj);
  }

  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      

      let sectionCart = document.getElementById("sectionCart");

      sectionCart.innerHTML = xhr.responseText;

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

      localStorage.setItem("cachebag", xhr.responseText);


    }
  };

  xhr.open("POST", "loginbag.php?objek=" + JSON.stringify(emptyArr), true);
  xhr.send();

  localStorage.setItem("running", 1);

}

let logoutButton = document.getElementById("logout");

logoutButton.addEventListener("click", function() {
  localStorage.removeItem("running");
  localStorage.removeItem("cachebag");
})


