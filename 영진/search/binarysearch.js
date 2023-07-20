const binarySearch = (sortedArr, value) => {
  const arr = [...sortedArr];
  let left = 0;
  let right = arr.length -1;
  let middle = Math.round((left + right)/2);

  while (left < right ){
    if (value === arr[middle]) {
      return middle;
    }
    switch (value < arr[middle]){
      case true:
        right = middle - 1;
        break;
      case false:
        left = middle + 1;
        break;
    }
    middle = Math.round((left + right)/2);
  }
  if (value == arr[left]){
    return left
  }
  return -1
}



// test case binarySearch([1,12,15,19,20,23,44], 1);
// O(log(n))
