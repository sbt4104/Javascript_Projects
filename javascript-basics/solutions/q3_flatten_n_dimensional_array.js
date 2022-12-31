/* Write a Program to Flatten a given n-dimensional array */

let result = [];
function add1(arr) {
	for(let index=0;index<arr.length;index++){
		if(Number.isInteger(arr[index])) {
			result.push(arr[index]);
		} else {
			add1(arr[index]);
		}
	}
	return arr;
}

const flatten = (inputArray) => {
	// Write your code here
	if(!Array.isArray(inputArray)) {return null;}
	result = [];
	add1(inputArray);
	if(result.length == 0) {return null;}
	return result;
};

/* For example,
INPUT - flatten([1, [2, 3], [[4], [5]])
OUTPUT - [ 1, 2, 3, 4, 5 ]

*/

module.exports = flatten;