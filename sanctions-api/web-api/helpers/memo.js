const memo = fn => { 
    console.log("copy")
	// переменная memory находится в области видимости функции memo  
	// и не видна снаружи let 
	let memory = []; 
	return anything=> { 
		// область видимости вложенной функции 
		if(anything in memory) { 
			// вложенная функция читает переменную memory return 
			memory[anything]; } 
		else { const result = fn(anything); 
			// вложенная функция изменяет переменную memory 
			memory[anything] = result; 
			return result; 
		} 
	}; 
}; 

export default memo; 