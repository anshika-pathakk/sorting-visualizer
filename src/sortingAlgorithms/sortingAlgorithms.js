// Merge Sort
export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
  let i = startIdx;
  let j = middleIdx + 1;
  let k = startIdx;

  while (i <= middleIdx && j <= endIdx) {
    animations.push({ type: 'compare', indices: [i, j] });
    animations.push({ type: 'revert', indices: [i, j] });

    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push({ type: 'swap', indices: [k, k], values: [auxiliaryArray[i], auxiliaryArray[i]] });
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push({ type: 'swap', indices: [k, k], values: [auxiliaryArray[j], auxiliaryArray[j]] });
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push({ type: 'compare', indices: [i, i] });
    animations.push({ type: 'revert', indices: [i, i] });
    animations.push({ type: 'swap', indices: [k, k], values: [auxiliaryArray[i], auxiliaryArray[i]] });
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push({ type: 'compare', indices: [j, j] });
    animations.push({ type: 'revert', indices: [j, j] });
    animations.push({ type: 'swap', indices: [k, k], values: [auxiliaryArray[j], auxiliaryArray[j]] });
    mainArray[k++] = auxiliaryArray[j++];
  }
}

// Quick Sort
export function getQuickSortAnimations(array) {
  const animations = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(array, low, high, animations) {
  if (low < high) {
    const pivotIndex = partition(array, low, high, animations);
    quickSortHelper(array, low, pivotIndex - 1, animations);
    quickSortHelper(array, pivotIndex + 1, high, animations);
  }
}

function partition(array, low, high, animations) {
  const pivot = array[high];
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    animations.push({ type: 'compare', indices: [j, high] });
    animations.push({ type: 'revert', indices: [j, high] });
    if (array[j] < pivot) {
      i++;
      animations.push({ type: 'swap', indices: [i, j], values: [array[j], array[i]] });
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  animations.push({ type: 'swap', indices: [i + 1, high], values: [array[high], array[i + 1]] });
  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  return i + 1;
}

// Heap Sort
export function getHeapSortAnimations(array) {
  const animations = [];
  const n = array.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i, animations);
  }

  for (let i = n - 1; i > 0; i--) {
    animations.push({ type: 'compare', indices: [0, i] });
    animations.push({ type: 'revert', indices: [0, i] });
    animations.push({ type: 'swap', indices: [0, i], values: [array[i], array[0]] });
    [array[0], array[i]] = [array[i], array[0]];

    heapify(array, i, 0, animations);
  }
  return animations;
}

function heapify(array, heapSize, rootIndex, animations) {
  let largest = rootIndex;
  const left = 2 * rootIndex + 1;
  const right = 2 * rootIndex + 2;

  if (left < heapSize) {
    animations.push({ type: 'compare', indices: [left, largest] });
    animations.push({ type: 'revert', indices: [left, largest] });
    if (array[left] > array[largest]) largest = left;
  }

  if (right < heapSize) {
    animations.push({ type: 'compare', indices: [right, largest] });
    animations.push({ type: 'revert', indices: [right, largest] });
    if (array[right] > array[largest]) largest = right;
  }

  if (largest !== rootIndex) {
    animations.push({ type: 'swap', indices: [rootIndex, largest], values: [array[largest], array[rootIndex]] });
    [array[rootIndex], array[largest]] = [array[largest], array[rootIndex]];
    heapify(array, heapSize, largest, animations);
  }
}

// Bubble Sort
export function getBubbleSortAnimations(array) {
  const animations = [];
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push({ type: 'compare', indices: [j, j + 1] });
      animations.push({ type: 'revert', indices: [j, j + 1] });

      if (array[j] > array[j + 1]) {
        animations.push({ type: 'swap', indices: [j, j + 1], values: [array[j + 1], array[j]] });
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return animations;
}

// Selection Sort
export function getSelectionSortAnimations(array) {
  const animations = [];
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      animations.push({ type: 'compare', indices: [j, minIndex] });
      animations.push({ type: 'revert', indices: [j, minIndex] });
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      animations.push({ type: 'swap', indices: [i, minIndex], values: [array[minIndex], array[i]] });
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }
  return animations;
}
