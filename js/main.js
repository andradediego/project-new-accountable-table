var cellValues = null;
var inputChange = document.getElementById('input-change');
var btnClear = document.getElementById('btn-clear');

inputChange.addEventListener('keyup', function (e) {
	let idTable = inputChange.getAttribute('data-id-table');
	var cellTable = document.getElementById(idTable);
	var rcArray = cellTable.id.split('_');
	let cell = cellValues[parseInt(rcArray[0])-1][parseInt(rcArray[1])-1];
	var newValue = cell.checkNewValue(inputChange.value);
	// console.log(cell.cellValue);
	cellTable.innerHTML = newValue;
	recalculteValues();
});

btnClear.addEventListener('click', function (e) {	
	let idTable = inputChange.getAttribute('data-id-table');
	var cellTable = document.getElementById(idTable);
	var rcArray = cellTable.id.split('_');
	let cell = cellValues[parseInt(rcArray[0])-1][parseInt(rcArray[1])-1];
	cell.cellValue = '';
	cellTable.innerHTML = cell.cellValue;
	inputChange.value = cell.cellValue;
	e.preventDefault();
});

function init () {
	document.getElementById("SpreadsheetTable").innerHTML = buildTable();
	cellValues = createFunctions();
}

function createFunctions(){
	var arr = Array.from(Array(20), () => new Array(10));
	var result = arr;
	
	for (var i = 0; i < 20; i++){
			for (var j = 0; j < 10; j++) {					
				result[i][j] = new TableCell();
			}
	}
	
	return result;
}

function recalculteValues() {
	for (var row = 0; row < 20; row++) {					
		for (let column = 0; column < 10; column++) {
			let currentCell = cellValues[row][column];
			let text = currentCell.formula;
			var pattern = /=sum\([a-j][1-9]?[0-9]\:[a-j][1-9]?[0-9]\)/g;
			if (pattern.test(text)) {
				currentCell.checkNewValue(currentCell.formula);
				var cellTable = document.getElementById((row + 1) + '_' + (column + 1));
				cellTable.innerHTML = currentCell.cellValue;
			}
		}					
	}
}


function buildTable () {
	// start with the table declaration
	var divHTML = "<table border='1' cellpadding='0' cellspacing='0' class='table table-striped'>";

	// next do the column header labels
	divHTML += "<tr><th></th>";

	for (var j = 0; j < 10; j++) {
		divHTML += "<th>" + String.fromCharCode(j + 65) + "</th>";
	}

	// closing row tag for the headers
	divHTML += "</tr>";

	// now do the main table area
	for (var i = 1; i <= 20; i++) {
			divHTML += "<tr>";
			// ...first column of the current row (row label)
			divHTML += "<td id='" + i + "_0' class='BaseColumn'>" + i + "</td>";

			// ... the rest of the columns
			for (var j = 1; j <= 10; j++)
					divHTML += "<td id='" + i + "_" + j + "' class='' onclick='clickCell(this)'></td>";

			// ...end of row
			divHTML += "</tr>";
	}

	// finally add the end of table tag
	divHTML += "</table>";

	//alert(divHTML);
	return divHTML;
}

// *******************************************
// event handler fires when user clicks a cell
function clickCell (ref) {
	setSelectedCell(ref.id);
	inputChange.setAttribute('data-id-table', ref.id);
	var rcArray = ref.id.split('_');	
	
	inputChange.removeAttribute('disabled');
	inputChange.value = cellValues[parseInt(rcArray[0])-1][parseInt(rcArray[1])-1].formula;
	inputChange.focus();	
}

function setSelectedCell (id) {
	let idCell = inputChange.getAttribute('data-id-table');
	if(idCell) {
		let cellPreviousSelected = document.getElementById(idCell);	
		cellPreviousSelected.classList.remove('cell-selected');
	}
	
	let selectedCell = document.getElementById(id);
	selectedCell.classList.add('cell-selected');
}

init();