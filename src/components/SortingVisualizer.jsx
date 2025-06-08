import React, { useState, useEffect } from 'react';
import {
  getMergeSortAnimations,
  getQuickSortAnimations,
  getHeapSortAnimations,
  getBubbleSortAnimations,
  getSelectionSortAnimations,
} from '../sortingAlgorithms/sortingAlgorithms';

const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

const ANIMATION_SPEED_MS = 100; // Adjust animation speed here

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [numBars, setNumBars] = useState(10);
  const [isSorting, setIsSorting] = useState(false);

  useEffect(() => {
    resetArray();
  }, [numBars]);

  const resetArray = () => {
    if (isSorting) return;
    const newArray = [];
    for (let i = 0; i < numBars; i++) {
      newArray.push(randomIntFromInterval(5, 500));
    }
    setArray(newArray);
  };

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const runAnimation = (animations) => {
    setIsSorting(true);
    const arrayBars = document.getElementsByClassName('array-bar');
    let i = 0;

    function animateStep() {
      if (i >= animations.length) {
        setIsSorting(false);
        return;
      }

      const animation = animations[i];

      if (animation.type === 'compare') {
        const [barOneIdx, barTwoIdx] = animation.indices;
        arrayBars[barOneIdx].style.backgroundColor = SECONDARY_COLOR;
        arrayBars[barTwoIdx].style.backgroundColor = SECONDARY_COLOR;
      } else if (animation.type === 'revert') {
        const [barOneIdx, barTwoIdx] = animation.indices;
        arrayBars[barOneIdx].style.backgroundColor = PRIMARY_COLOR;
        arrayBars[barTwoIdx].style.backgroundColor = PRIMARY_COLOR;
      } else if (animation.type === 'swap') {
        const [barOneIdx, barTwoIdx] = animation.indices;
        const [barOneHeight, barTwoHeight] = animation.values;
        arrayBars[barOneIdx].style.height = `${barOneHeight}px`;
        arrayBars[barTwoIdx].style.height = `${barTwoHeight}px`;
      }
      i++;
      setTimeout(animateStep, ANIMATION_SPEED_MS);
    }

    animateStep();
  };

  const mergeSort = () => {
    if (isSorting) return;
    const animations = getMergeSortAnimations(array.slice());
    runAnimation(animations);
  };

  const quickSort = () => {
    if (isSorting) return;
    const animations = getQuickSortAnimations(array.slice());
    runAnimation(animations);
  };

  const heapSort = () => {
    if (isSorting) return;
    const animations = getHeapSortAnimations(array.slice());
    runAnimation(animations);
  };

  const bubbleSort = () => {
    if (isSorting) return;
    const animations = getBubbleSortAnimations(array.slice());
    runAnimation(animations);
  };

  const selectionSort = () => {
    if (isSorting) return;
    const animations = getSelectionSortAnimations(array.slice());
    runAnimation(animations);
  };

  return (
    <div className="container">
      <div className="controls">
        <label>
          Number of bars:
          <input
            type="range"
            min="10"
            max="20"
            value={numBars}
            disabled={isSorting}
            onChange={(e) => setNumBars(Number(e.target.value))}
            style={{ marginLeft: '10px' }}
          />
        </label>
        <button onClick={resetArray} disabled={isSorting}>
          Generate New Array
        </button>
        <button onClick={mergeSort} disabled={isSorting}>
          Merge Sort
        </button>
        <button onClick={quickSort} disabled={isSorting}>
          Quick Sort
        </button>
        <button onClick={heapSort} disabled={isSorting}>
          Heap Sort
        </button>
        <button onClick={bubbleSort} disabled={isSorting}>
          Bubble Sort
        </button>
        <button onClick={selectionSort} disabled={isSorting}>
          Selection Sort
        </button>
      </div>

      <div className="array-container" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', height: '550px', margin: 'auto', maxWidth: '900px', border: '1px solid #ddd', backgroundColor: '#222' }}>
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
              width: `${Math.floor(900 / numBars)}px`,
              margin: '0 1px',
              transition: 'background-color 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;
