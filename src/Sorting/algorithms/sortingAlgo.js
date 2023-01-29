const bs = (array, arraySteps, colorSteps) => {
  let colorKey = colorSteps[colorSteps.length - 1].slice();

  for (let i = 0; i < array.length - 1; i++) {
    let flag = true;
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        flag = false;
      }
      arraySteps.push(array.slice());
      colorKey[j] = 1;
      colorKey[j + 1] = 1;
      colorSteps.push(colorKey.slice());
      colorKey[j] = 0;
      colorKey[j + 1] = 0;
    }
    if (flag) break;
    colorKey[array.length - i - 1] = 2;
    arraySteps.push(array.slice());
    colorSteps.push(colorKey.slice());
  }
  colorSteps[colorSteps.length - 1] = new Array(array.length).fill(2);
  return;
};

const ss = (array, steps, colorSteps) => {
  let colorKey = colorSteps[colorSteps.length - 1].slice();

  for (let i = 0; i < array.length; i++) {
    let max = 0;
    for (let j = 1; j < array.length - i; j++) {
      colorKey[max] = 1;
      colorKey[j] = 1;
      colorSteps.push(colorKey.slice());
      colorKey[max] = 0;
      colorKey[j] = 0;
      if (array[max] < array[j]) {
        max = j;
      }
      steps.push(array.slice());
    }
    let temp = array[max];
    array[max] = array[array.length - i - 1];
    array[array.length - i - 1] = temp;

    steps.push(array.slice());
    colorKey[array.length - i - 1] = 2;
    colorSteps.push(colorKey.slice());
  }
  colorSteps[colorSteps.length - 1] = new Array(array.length).fill(2);
};

const is = (array, steps, colorSteps) => {
  let colorKey = colorSteps[colorSteps.length - 1].slice();

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i; j >= 0; j--) {
      colorKey[j] = 1;
      colorKey[j + 1] = 1;
      colorSteps.push(colorKey.slice());
      colorKey[j] = 0;
      colorKey[j + 1] = 0;
      if (array[j + 1] < array[j]) {
        let temp = array[j + 1];
        array[j + 1] = array[j];
        array[j] = temp;
        steps.push(array.slice());
      } else {
        steps.push(array.slice());
        break;
      }
    }
  }
  colorSteps[colorSteps.length - 1] = new Array(array.length).fill(2);
};

const qs = (array, steps, colorSteps) => {
  let colorKey = colorSteps[colorSteps.length - 1].slice();

  function partition(array, left, right) {
    var mid = Math.floor((right + left) / 2);
    var pivot = array[mid],
      i = left,
      j = right;
    colorKey[i] = 1;
    colorKey[j] = 1;
    colorKey[mid] = 3;
    colorSteps.push(colorKey.slice());
    steps.push(array.slice());

    while (i <= j) {
      while (array[i] < pivot) {
        colorKey[i] = 1;
        colorSteps.push(colorKey.slice());
        steps.push(array.slice());
        colorKey[i] = 0;

        i++;
      }
      colorKey[i] = 1;
      while (array[j] > pivot) {
        colorKey[j] = 1;
        colorSteps.push(colorKey.slice());
        steps.push(array.slice());
        colorKey[j] = 0;

        j--;
      }
      colorKey[j] = 1;

      if (i <= j) {
        colorSteps.push(colorKey.slice());
        colorKey[j] = 0;
        colorKey[i] = 0;
        [array[i], array[j]] = [array[j], array[i]];
        i++;
        j--;
        steps.push(array.slice());
      }
      colorKey[j] = 0;
      colorKey[i] = 0;
    }
    colorKey[mid] = 0;
    return i;
  }

  function quickSort(array, left, right) {
    var index;
    if (array.length > 1) {
      index = partition(array, left, right);

      if (left < index - 1) quickSort(array, left, index - 1);
      if (index < right) quickSort(array, index, right);
    }
  }

  quickSort(array, 0, array.length - 1);
  colorSteps[colorSteps.length - 1] = new Array(array.length).fill(2);
  console.log(array);
};

export { bs, ss, is, qs };
