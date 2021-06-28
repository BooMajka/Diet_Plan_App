const modal = document.querySelector('.modal-content');
const modal2 = document.querySelector('.modal-content2');
const recipeButton = document.querySelector('#recipe-button');
const planButton = document.querySelector('#plan-button');

recipeButton.addEventListener('click', function (event) {
    modal.style.display = "block";

});

planButton.addEventListener('click', function (event){
    modal2.style.display = "block";
})

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal || event.target === modal2) {
        modal.style.display = "none";
        modal2.style.display = "none";
    }
}