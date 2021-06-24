const headerUserName = document.querySelector(".header__user-name");
const submitNameButton = document.querySelector(".news-btn");
const welcomeScreen = document.querySelector(".news");
const username = window.localStorage.getItem("username");

if (username) {
	headerUserName.innerText = username;
	welcomeScreen.style.display = "none";
} else {
	const planSection = document.querySelector(".plan-section");
	planSection.style.display = "none";
}

const onSaveUserName = () => {
	const userNameInput = document.querySelector("#imie");

	window.localStorage.setItem("username", userNameInput.value);
	headerUserName.innerText = window.localStorage.getItem("username");
	userNameInput.value = ""; //czyszczenie inputa po wpisaniu imienia

	const welcomeScreen = document.querySelector(".news");
	const planSection = document.querySelector(".plan-section");
	planSection.style.display = "flex";
	welcomeScreen.style.display = "none";
};

submitNameButton.addEventListener("click", onSaveUserName);

const widgetsButton = document.querySelectorAll(".widgets-info .close-btn");

function onCloseWidget() {
	this.parentElement.style.display = "none";
}

widgetsButton.forEach((item) => item.addEventListener("click", onCloseWidget));

/// ---- Dodawanie przepisu do local storage ------
class Recipe {
	constructor(id, title, description) {
		//object constructor
		this.id = id; // id przepisu
		this.title = title; // nazwa przepisu
		this.description = description; // opis przepisu
		this.ingredients = []; // składniki przepisu
		this.instructions = []; // instrukcje przepisu
	}
}

const recipeName = document.querySelector("#recipe_name");
const recipeDescription = document.querySelector("#recipe_desc");
const instructionsDescription = document.querySelector("#instruction");
const addInstruction = document.querySelector("#add-instruction");
const instructionList = document.querySelector("#recipe-list");
const instructionListAll = document.querySelectorAll("#recipe-list li");
const ingredients = document.querySelector("#ingridients");
const addIngredients = document.querySelector("#add-ingridients");
const ingredientsList = document.querySelector("#ingredients-list");
const ingredientsListAll = document.querySelectorAll("#ingredients-list li");
const saveBtn = document.querySelector("#save");

addInstruction.addEventListener("click", function (event) {
	event.preventDefault();
	if (instructionsDescription.value) {
		const newInstruction = document.createElement("li");
		newInstruction.innerHTML = `${instructionsDescription.value} 
				<a href=""><i class="far fa-edit"></i></a>
				<a href=""><i class="far fa-trash-alt"></i></a>`;
		instructionList.appendChild(newInstruction);
	}
});
addIngredients.addEventListener("click", function (event) {
	event.preventDefault();
	if (ingredients.value) {
		const newIngridient = document.createElement("li");
		newIngridient.innerHTML = `${ingredients.value} 
			<a href=""><i class="far fa-edit"></i></a>
			<a href=""><i class="far fa-trash-alt"></i></a>`;
		ingredientsList.appendChild(newIngridient);
	}
});
instructionListAll.forEach((el) => {
	const deleteBtn = el.querySelector(".fa-trash-alt");
	deleteBtn.addEventListener("click", function (event) {
		event.preventDefault();
		deleteBtn.parentElement.parentElement.parentElement.removeChild(el);
	});
});
instructionListAll.forEach((el) => {
	const editBtn = el.querySelector(".fa-edit");
	editBtn.addEventListener("click", function (event) {
		event.preventDefault();
		editBtn.parentElement.parentElement.contentEditable = true;
	});
});

ingredientsListAll.forEach((el) => {
	const deleteBtn = el.querySelector(".fa-trash-alt");
	deleteBtn.addEventListener("click", function (event) {
		event.preventDefault();
		deleteBtn.parentElement.parentElement.parentElement.removeChild(el);
	});
});
ingredientsListAll.forEach((el) => {
	const editBtn = el.querySelector(".fa-edit");
	editBtn.addEventListener("click", function (event) {
		event.preventDefault();
		editBtn.parentElement.parentElement.contentEditable = true;
	});
});

saveBtn.addEventListener("click", function addRecipe(e) {
	// let recipesCounter = 1;
	if (recipeName.value && recipeDescription.value) {
		let recipesStorage = JSON.parse(localStorage.getItem("recipes"));
		let recipesCounter = recipesStorage
			? Number(recipesStorage[recipesStorage.length - 1].id) + 1
			: 1;
		const newRecipe = new Recipe(
			recipesCounter,
			recipeName.value,
			recipeDescription.value
		);
		instructionListAll.forEach((el) => {
			newRecipe.instructions.push(el.innerText);
		});
		ingredientsListAll.forEach((el) => {
			newRecipe.ingredients.push(el.innerText);
		});
		// let recipesStorage = localStorage.getItem(‘recipes’);
		// let recipesCounter = recipesStorage ? Number(JSON.parse(recipesStorage)[recipesStorage.length].id + 1) : 1;
		addRecipesToLocalStorage(newRecipe);
	} else {
		alert("Dodaj nazwę i opis przepisu, resztę możesz dodać później :-)!!");
	}
	location.reload();
});

function addRecipesToLocalStorage(newRecipe) {
	let dataFromLocalStorage = [];
	if (localStorage.getItem("recipes") != null) {
		dataFromLocalStorage = JSON.parse(localStorage.getItem("recipes"));
		dataFromLocalStorage.push(newRecipe);
		localStorage.setItem("recipes", JSON.stringify(dataFromLocalStorage));
	} else {
		dataFromLocalStorage.push(newRecipe);
		localStorage.setItem("recipes", JSON.stringify(dataFromLocalStorage));
	}
	alert("Przepis zapisany do localStorage");

	modal.style.display = "none";
}

// --- zbieranie przepisów z LocalStorage do dodawania planu ---

const recipes = JSON.parse(window.localStorage.getItem("recipes"));
const optionSelect = document.querySelectorAll("select");

// const planTable = (data) => {
// 	data.forEach((item) => {
// 		const newOption = document.createElement("option");
// 		newOption.innerHTML = item.title;
//
// 		optionSelect.forEach((el) => {
// 			console.log(el);
// 			console.log(newOption);
// 			el.appendChild(newOption);
// 		});
//
// 	});
// };

const planTable = (data) => {
	optionSelect.forEach(select => {
		data.forEach(recipe => {
			const recipeOption = document.createElement('option');
			recipeOption.innerText = recipe.title;
			select.appendChild(recipeOption);
		})
	})
}
planTable(recipes);

// ---- dodawanie planu ---

class Plan {
	constructor(id, title, description) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.weekNr = weekNumber;
		this.monday = [];
		this.tuesday = [];
		this.wednesday = [];
		this.thursday = [];
		this.friday = [];
		this.saturday = [];
		this.sunday = [];
	}
}

const planName = document.querySelector("#plan_name");
const planDesc = document.querySelector("#plan_desc");
const weekNumber = document.querySelector("#number-week");
// const selectRecipe = document.querySelectorAll("select");
const saveButton = document.querySelector("#closeButton");
const planDate = document.querySelectorAll(".plan__calendar tbody tr");

saveButton.addEventListener("click", function addRecipe(e) {
	if (planName.value && planDesc.value) {
		let planStorage = JSON.parse(localStorage.getItem("plan"));
		let planCounter = planStorage
			? Number(planStorage[planStorage.length - 1].id) + 1
			: 1;
		const newPlan = new Plan(planCounter, planName.value, planDesc.value);
		newPlan.weekNr = weekNumber.value;

		const mondaySelects = document.querySelectorAll(".monday"); // dopisałem klasę dla selecta do app.html dla poniedziałku i odczytałem
		newPlan.monday = []; // odwoluje sie do tablicy w klasie Plan
		mondaySelects.forEach((monday) => {
			// wyciagam pojedynczo kazdy select z poniedzialku
			newPlan.monday.push(monday.value); // wpisuje do tablicy w klasie Plan w miejsce poniedzialek
		});

		const tuesdaySelects = document.querySelectorAll(".tuesday");
		newPlan.tuesday = [];
		tuesdaySelects.forEach((tuesday) => {
			newPlan.tuesday.push(tuesday.value);
		});

		const wednesdaySelects = document.querySelectorAll(".wednesday");
		newPlan.wednesday = [];
		wednesdaySelects.forEach((wednesday) => {
			newPlan.wednesday.push(wednesday.value);
		});

		const thursdaySelects = document.querySelectorAll(".thursday");
		newPlan.thursday = [];
		thursdaySelects.forEach((thursday) => {
			newPlan.thursday.push(thursday.value);
		});

		const fridaySelects = document.querySelectorAll(".friday");
		newPlan.friday = [];
		fridaySelects.forEach((friday) => {
			newPlan.friday.push(friday.value);
		});

		const saturdaySelects = document.querySelectorAll(".saturday");
		newPlan.saturday = [];
		saturdaySelects.forEach((saturday) => {
			newPlan.saturday.push(saturday.value);
		});

		const sundaySelects = document.querySelectorAll(".sunday");
		newPlan.sunday = [];
		sundaySelects.forEach((sunday) => {
			newPlan.sunday.push(sunday.value);
		});

		addPlanToLocalStorage(newPlan);
		location.reload();
	} else {
		alert("Dodaj nazwę i opis planu, resztę możesz dodać później :-)!!");
	}
});

function addPlanToLocalStorage(newPlan) {
	let dataFromLocalStorage = [];
	if (localStorage.getItem("plan") != null) {
		dataFromLocalStorage = JSON.parse(localStorage.getItem("plan"));
		dataFromLocalStorage.push(newPlan);
		localStorage.setItem("plan", JSON.stringify(dataFromLocalStorage));
	} else {
		dataFromLocalStorage.push(newPlan);
		localStorage.setItem("plan", JSON.stringify(dataFromLocalStorage));
	}
	alert("Plan zapisany do localStorage");

	modal.style.display = "none";
}

const plans = JSON.parse(window.localStorage.getItem("plan"));
const tableWrapper = document.querySelector(".weekly__info");
const weeklyTitle = document.querySelector(".weekly__title");
const table = document.querySelector(".weekly__plan");

if (!plans || !plans.length) {
	tableWrapper.style.display = "none";
	weeklyTitle.innerHTML = "Brak planów";
	weeklyTitle.style.lineHeight = "380px";
}

let currentPlan = plans[0];

const populatePlansColumn = (columnData, indexInRow) => {
	const plansRows = document.querySelectorAll(".weekly__plan tbody tr");

	plansRows.forEach((item, index) => {
		const cell = item.querySelectorAll("td")[indexInRow];
		cell.innerHTML = columnData[index];
	});
};

const populatePlansTable = (plan) => {
	const {
		monday,
		tuesday,
		wednesday,
		thursday,
		friday,
		saturday,
		sunday,
	} = plan;

	weeklyTitle.innerHTML = plan.title;

	const daysInAWeek = 7;
	const numberOfMeals = 5;
	const plansTbody = document.createElement("tbody");

	for (i = 1; i <= numberOfMeals; i++) {
		const newRow = document.createElement("tr");

		for (j = 1; j <= daysInAWeek; j++) {
			const newCell = document.createElement("td");
			newRow.appendChild(newCell);
		}

		plansTbody.appendChild(newRow);
	}

	table.appendChild(plansTbody);

	populatePlansColumn(monday, 0);
	populatePlansColumn(tuesday, 1);
	populatePlansColumn(wednesday, 2);
	populatePlansColumn(thursday, 3);
	populatePlansColumn(friday, 4);
	populatePlansColumn(saturday, 5);
	populatePlansColumn(sunday, 6);
};

populatePlansTable(currentPlan);

const arrowButtons = document.querySelectorAll(".arrow-btn");

const onPlanChange = (plan, action) => {
	const tableContent = document.querySelector(".weekly__plan tbody");
	const currentPlanIndex = plans.indexOf(plan);

	if (action === "next") {
		currentPlan = plans[currentPlanIndex + 1];

		if (!currentPlan) {
			return;
		}

		tableContent.remove();
		populatePlansTable(currentPlan);
	}

	if (action === "previous") {
		currentPlan = plans[currentPlanIndex - 1];

		if (!currentPlan) {
			return;
		}

		tableContent.remove();
		populatePlansTable(currentPlan);
	}
};

arrowButtons.forEach((btn) => {
	if (btn.className.includes("previous")) {
		btn.addEventListener("click", () => onPlanChange(currentPlan, "previous"));
	}

	if (btn.className.includes("next")) {
		btn.addEventListener("click", () => onPlanChange(currentPlan, "next"));
	}
});
