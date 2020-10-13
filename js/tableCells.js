class TableCell {
	constructor (cellValue, formula) {
		this._cellValue = cellValue;
		this._formula = formula;
	}

	set cellValue(val){
		this._cellValue = val;
	}	
	
	get cellValue(){
		return this._cellValue;
	}

	// the idea here is to keep the result and the formula
	// however, if there is no formula, display the normal value	
	get formula(){
		if (this._formula) {
			return this._formula;
		} else {
			return this._cellValue;
		}
	}
}