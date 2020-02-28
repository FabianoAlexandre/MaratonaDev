window.document
    .querySelector('header button')
    .addEventListener("click", function() {
        document
            .querySelector('.form')
            /*.style.display = "none"*/
            .classList.toggle('hide')
    })