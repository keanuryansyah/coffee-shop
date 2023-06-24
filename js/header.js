let headerWrap = document.getElementById("headerWrap");
let count = 200;

window.addEventListener("scroll", function() {

    let scroll = window.pageYOffset;

    if( scroll > count ) {

        headerWrap.classList.add("hide");

    } else {

        headerWrap.classList.remove("hide")

    }

    if( scroll >= 200 ) {
        count = scroll;
    }



})