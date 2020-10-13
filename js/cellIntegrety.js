class CellIntegrety {
	constructor () {
		// pattern for formula
		this._pattern = /=sum\([a-j][1-9]?[0-9]\:[a-j][1-9]?[0-9]\)/g;
	}
	
	checkNewValue (newValue, cellValues) {
		// test the pattern
		if (this._pattern.test(newValue.trim().toLowerCase())) {
			// set new value to lower case
			newValue = newValue.trim().toLowerCase();
			// set the formula
			let formula = newValue;
			// remove text
			let text = formula.replace('=sum(', '');
			text = text.replace(')', '');

			// get the final array coordinates
			let values = text.split(':');
			
			// check the number of the elements
			if (values.length > 2) {
				return new TableCell(newValue, '');
			}

			// get the rows start and finish
			let rowStart = parseInt(values[0].substring(1, values[0].length)) - 1; 
			let rowFinish = parseInt(values[1].substring(1, values[1].length)) - 1;
			
			// get the columns start and finish
			let columnStart = values[0].charCodeAt(0) - 97;
			let columnFinish = values[1].charCodeAt(0) - 97;
			
			let sum = 0;	
			// sum the values from the coordinates			
			for (var row = rowStart; row <= rowFinish; row++) {					
				for (let column = columnStart; column <= columnFinish; column++) {
					if (cellValues[row][column]) {
						let currentValue = cellValues[row][column].cellValue;
						if (!isNaN(currentValue) && currentValue) {						
							sum = sum + parseFloat(currentValue);
						}
					}
				}					
			}			
			// return new value
			return new TableCell(sum, formula);			
		} else {
			// return the new value
			return new TableCell(newValue, '');
		}
	}

	recalculteValues(cellValues) {
		// for to check values from every cell
		for (let row = 0; row < 20; row++) {					
			for (let column = 0; column < 10; column++) {
				// get the current cell
				let currentCell = cellValues[row][column];
				// check if there is a value
				if (currentCell) {
					// get the formula
					let text = currentCell.formula;
					
					// test the pattern
					if (this._pattern.test(text)) {
						// check the integrety
						let checkValue = new CellIntegrety();
						cellValues[row][column] = checkValue.checkNewValue(currentCell.formula, cellValues);
						// get the cell from the DOM
						let cellTable = document.getElementById((row + 1) + '_' + (column + 1));
						// get the values from array
						currentCell = cellValues[row][column];
						// set the new value on DOM
						cellTable.innerHTML = currentCell.cellValue;
					}
				}
			}					
		}
	}
}