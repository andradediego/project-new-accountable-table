class TableCell {
	constructor () {
		this._cellValue = '';
		this._formula = '';
	}

	set cellValue(val){
		this._cellValue = val;
	}
	
	
	get cellValue(){
		return this._cellValue;
	}

	get formula(){
		if (this._formula) {
			return this._formula;
		} else {
			return this._cellValue;
		}
	}

	checkNewValue (newValue) {
		if (!isNaN(newValue)) {
			this._formula = '';
			this.cellValue = newValue;
			return this.cellValue;
		} else {
			let text = newValue.toLocaleLowerCase();
			var pattern = /=sum\([a-j][1-9]?[0-9]\:[a-j][1-9]?[0-9]\)/g;

			if (pattern.test(text)) {
				let formula = text;
				text = text.replace('=sum(', '');
				text = text.replace(')', '');
				let values = text.split(':');
				
				if (values.length > 2) {
					return this._cellValue;
				}

				let rowStart = parseInt(values[0].substring(1, values[0].length)) - 1; 
				let rowFinish = parseInt(values[1].substring(1, values[1].length)) - 1;
				
				let columnStart = values[0].charCodeAt(0) - 97;
				let columnFinish = values[1].charCodeAt(0) - 97;
				
				let sum = 0;				
				for (var row = rowStart; row <= rowFinish; row++) {					
				  for (let column = columnStart; column <= columnFinish; column++) {
						let currentValue = cellValues[row][column].cellValue;
						if (!isNaN(currentValue)) {
							if (currentValue) {
								sum = sum + parseFloat(currentValue);
							}
						}			
					}					
				}
				this._formula = formula;
				this.cellValue = sum;
				return sum;
			} else {
				this._formula = '';
				this.cellValue = newValue;	
				return this.cellValue;
			}
		}
	}


}