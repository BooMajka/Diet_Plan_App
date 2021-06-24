const plan = JSON.parse(window.localStorage.getItem("plan"));

const tableBody = document.querySelector(".schedule__table tbody");

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

        const weekCell = document.createElement("td");
        weekCell.innerHTML = item.weekNr;

		const actionsCell = document.createElement("td");

		const editActionIcon = document.createElement("i");
		editActionIcon.className = "far fa-edit";

		const deleteActionIcon = document.createElement("i");
		deleteActionIcon.className = "far fa-trash-alt delete-btn";

		actionsCell.appendChild(editActionIcon);
		actionsCell.appendChild(deleteActionIcon);

		newRow.appendChild(idCell);
		newRow.appendChild(titleCell);
		newRow.appendChild(descCell);
        newRow.appendChild(weekCell);
		newRow.appendChild(actionsCell);

		tableBody.appendChild(newRow);
	});
};

populateTable(plan);

