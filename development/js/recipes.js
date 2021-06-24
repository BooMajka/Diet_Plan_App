const recipes = JSON.parse(window.localStorage.getItem("recipes"));

const tableBody = document.querySelector(".recipes__table tbody");

const populateTable = (data) => {
	data.forEach((item) => {
		const newRow = document.createElement("tr");

		const idCell = document.createElement("td");
		idCell.className = "id";
		idCell.innerHTML = item.id;

		const titleCell = document.createElement("td");
		titleCell.innerHTML = item.title;

		const descCell = document.createElement("td");
		descCell.innerHTML = item.description;

		const actionsCell = document.createElement("td");

		const editActionIcon = document.createElement("i");
		editActionIcon.className = "far fa-edit edit-btn";

		const deleteActionIcon = document.createElement("i");
		deleteActionIcon.className = "far fa-trash-alt delete-btn";

		actionsCell.appendChild(editActionIcon);
		actionsCell.appendChild(deleteActionIcon);

		newRow.appendChild(idCell);
		newRow.appendChild(titleCell);
		newRow.appendChild(descCell);
		newRow.appendChild(actionsCell);

		tableBody.appendChild(newRow);
	});
};

populateTable(recipes);

const deleteBtns = document.querySelectorAll(".delete-btn");

const deleteRecipe = (element, recipes, id) => {
	element.parentElement.parentElement.remove();

	const updatedRecipes = JSON.stringify(recipes.filter((item) => item.id !== id)
	);

	window.localStorage.setItem("recipes", updatedRecipes);
};

deleteBtns.forEach((item, index) => {
	const id = index + 1;

	item.addEventListener("click", function () {
		deleteRecipe(this, recipes, id);
	});
});

const tbodyTd = document.querySelectorAll("tbody td");
const editBtns = document.querySelector('.edit-btn');
const submitRow = document.querySelectorAll("tbody tr");

tbodyTd.forEach(el => {
    editBtns.addEventListener('click', function (event) {
        event.preventDefault();
		console.log(editBtns.parentElement.parentElement.parentElement);
        editBtns.parentElement.parentElement.parentElement.contentEditable = true;
		
	const updatedRecipes = JSON.stringify(recipes.filter((item) => item.id !== id)
	);
		
	})
    });
