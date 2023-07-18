const linearSearch = (arr, target) => {
  for (let i = 0; i < arr.length; i++){
    if(arr[i] === target) {
      return i
    }
  }
  return -1
}

// test case linearSearch([1,2,6,2,87],5);

// same with Array.prototype.indexOf
// Time complexity: O(n) - length of array
