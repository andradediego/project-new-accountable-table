var cellValues = null;
var inputChange = document.getElementById('input-change');
var btnClear = document.getElementById('btn-clear');
var btnClearAll = document.getElementById('btn-clear-all');


// add the event keyup on the input
inputChange.addEventListener('keyup', function (e) {
	// get id attribute from cell
	let idTable = inputChange.getAttribute('data-id-cell');
	// select the cell element
	let cellTable = document.getElementById(idTable);
	// get the coordinates
	let rcArray = cellTable.id.split('_');
	// get the correct cell in the variable

	// check the values and attribute the new value
	let cellIntegrety = new CellIntegrety();
	
	cellValues[parseInt(rcArray[0])-1][parseInt(rcArray[1])-1] = cellIntegrety.checkNewValue(inputChange.value, cellValues);
	
	let cell = cellValues[parseInt(rcArray[0])-1][parseInt(rcArray[1])-1];	
	
	// display the new value on cell
	cellTable.innerHTML = cell.cellValue;
	//recalculate all formulas
	cellIntegrety.recalculteValues(cellValues);
});

btnClear.addEventListener('click', function (e) {	
	//get the id of cell
	let idTable = inputChange.getAttribute('data-id-cell');
	//get the cell element of the DOM
	let cellTable = document.getElementById(idTable);
	// get the coordinates of the array
	let rcArray = cellTable.id.split('_');
	// reset the value
	cellValues[parseInt(rcArray[0])-1][parseInt(rcArray[1])-1] = new TableCell('', '');
	// get the cell value from the array
	let cell = cellValues[parseInt(rcArray[0])-1][parseInt(rcArray[1])-1];
	// set the value on table
	cellTable.innerHTML = cell.cellValue;
	// set the value on input
	inputChange.value = cell.cellValue;
	//create a new integrety check
	let cellIntegrety = new CellIntegrety();
	// recalculate the integrety
	cellIntegrety.recalculteValues(cellValues);
	e.preventDefault();
});

// create the array with the number of cells
function createFunctions(){	
	return Array.from(Array(20), () => new Array(10));
}

// responsible to build the initial table
function buildTable () {
	// start with the table declaration
	let divHTML = "<table border='1' cellpadding='0' cellspacing='0' class='table table-striped'>";

	// next do the column header labels
	divHTML += "<tr><th></th>";

	for (let j = 0; j < 10; j++) {
		divHTML += "<th>" + String.fromCharCode(j + 65) + "</th>";
	}

	// closing row tag for the headers
	divHTML += "</tr>";

	// now do the main table area
	for (let i = 1; i <= 20; i++) {
			divHTML += "<tr>";
			// ...first column of the current row (row label)
			divHTML += "<td id='" + i + "_0' class='BaseColumn'>" + i + "</td>";

			// ... the rest of the columns
			for (let j = 1; j <= 10; j++)
					divHTML += "<td id='" + i + "_" + j + "' class='cell' onclick='selectCell(this)'></td>";

			// ...end of row
			divHTML += "</tr>";
	}

	// finally add the end of table tag
	divHTML += "</table>";

	//alert(divHTML);
	return divHTML;
}


// event handler fires when user clicks a cell
function selectCell (ref) {
	// set the css to a cell
	setSelectedCssToCell(ref.id);
	// sethe the id on the input
	inputChange.setAttribute('data-id-cell', ref.id);
	// get the coordinates of the array
	let rcArray = ref.id.split('_');	
	
	// remove disable property from array
	inputChange.removeAttribute('disabled');
	// get the cell seleced values from the array
	let cellSelected = cellValues[parseInt(rcArray[0])-1][parseInt(rcArray[1])-1];
	// check if it is null
	if (!cellSelected) {
		// set new class as value
		cellValues[parseInt(rcArray[0])-1][parseInt(rcArray[1])-1] = new TableCell('', '');
	}
	// set the value for the input
	inputChange.value = cellValues[parseInt(rcArray[0])-1][parseInt(rcArray[1])-1].formula;
	// set the focus on input
	inputChange.focus();	
}

// set css for the selected cell
function setSelectedCssToCell (newid) {
	// get the current id value from the input
	let idCell = inputChange.getAttribute('data-id-cell');	
	if (idCell) {
		// get the previous cell
		let cellPreviousSelected = document.getElementById(idCell);	
		// remove the class
		cellPreviousSelected.classList.remove('cell-selected');
	}
	// get the new cell
	let selectedCell = document.getElementById(newid);
	// set the class
	selectedCell.classList.add('cell-selected');
}

btnClearAll.addEventListener('click', function () {
	// get all cell elements
	let allCell = document.getElementsByClassName('cell');	
	// loop
	Array.prototype.forEach.call(allCell, function(el) {
		// clear all cell values
    el.innerHTML = '';
	});
	// reset the input value;
	inputChange.value = '';
	// set the input as disabled by default
	inputChange.setAttribute('disabled', 'disabled');
});

(function init () {
	// build a table in the right element
	document.getElementById("SpreadsheetTable").innerHTML = buildTable();
	// set the array for cell values
	cellValues = createFunctions();
})();