import { sleep, playSwapSound } from "../utils/index.js";
import { BAR_STATES } from "../constants/index.js";

export class BubbleSort {
  constructor(visualizer, speed) {
    this.visualizer = visualizer;
    this.speed = speed;
    this.isSorting = true;
  }

  async sort() {
    const array = this.visualizer.getArray();
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
      let swapped = false;

      for (let j = 0; j < n - i - 1; j++) {
        if (!this.isSorting) return;

        this.visualizer.incrementComparison();

        this.visualizer.updateBarState(j, BAR_STATES.COMPARING);
        this.visualizer.updateBarState(j + 1, BAR_STATES.COMPARING);
        await sleep(this.speed);

        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          swapped = true;
          this.visualizer.incrementSwap();
          playSwapSound();

          this.visualizer.updateBarState(j, BAR_STATES.SWAPPING);
          this.visualizer.updateBarState(j + 1, BAR_STATES.SWAPPING);
          await sleep(this.speed);

          this.visualizer.setArray([...array]);
          this.visualizer.render();
          await sleep(this.speed);
        }

        this.visualizer.clearComparingStates();
      }

      this.visualizer.updateBarState(n - i - 1, BAR_STATES.SORTED);

      if (!swapped) {
        for (let k = 0; k < n - i; k++) {
          this.visualizer.updateBarState(k, BAR_STATES.SORTED);
        }
        this.visualizer.render();
        break;
      }
    }

    for (let i = 0; i < n; i++) {
      this.visualizer.updateBarState(i, BAR_STATES.SORTED);
    }
    this.visualizer.render();
  }

  stop() {
    this.isSorting = false;
  }
}

export class SelectionSort {
  constructor(visualizer, speed) {
    this.visualizer = visualizer;
    this.speed = speed;
    this.isSorting = true;
  }

  async sort() {
    const array = this.visualizer.getArray();
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
      if (!this.isSorting) return;

      let minIndex = i;
      this.visualizer.updateBarState(i, BAR_STATES.COMPARING);
      await sleep(this.speed);

      for (let j = i + 1; j < n; j++) {
        if (!this.isSorting) return;

        this.visualizer.incrementComparison();

        this.visualizer.updateBarState(j, BAR_STATES.COMPARING);
        await sleep(this.speed);

        if (array[j] < array[minIndex]) {
          this.visualizer.resetBarStates();
          minIndex = j;
          this.visualizer.updateBarState(minIndex, BAR_STATES.COMPARING);
          await sleep(this.speed);
        } else {
          this.visualizer.resetBarStates();
          this.visualizer.updateBarState(i, BAR_STATES.COMPARING);
          this.visualizer.updateBarState(minIndex, BAR_STATES.COMPARING);
        }
      }

      if (minIndex !== i) {
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
        this.visualizer.incrementSwap();
        playSwapSound();

        this.visualizer.updateBarState(i, BAR_STATES.SWAPPING);
        this.visualizer.updateBarState(minIndex, BAR_STATES.SWAPPING);
        await sleep(this.speed);

        this.visualizer.setArray([...array]);
        this.visualizer.render();
        await sleep(this.speed);
      }

      this.visualizer.resetBarStates();
      this.visualizer.updateBarState(i, BAR_STATES.SORTED);
    }

    this.visualizer.updateBarState(n - 1, BAR_STATES.SORTED);
    this.visualizer.render();
  }

  stop() {
    this.isSorting = false;
  }
}

export class InsertionSort {
  constructor(visualizer, speed) {
    this.visualizer = visualizer;
    this.speed = speed;
    this.isSorting = true;
  }

  async sort() {
    const array = this.visualizer.getArray();
    const n = array.length;

    this.visualizer.updateBarState(0, BAR_STATES.SORTED);

    for (let i = 1; i < n; i++) {
      if (!this.isSorting) return;

      const key = array[i];
      let j = i - 1;

      this.visualizer.updateBarState(i, BAR_STATES.COMPARING);
      await sleep(this.speed);

      while (j >= 0 && array[j] > key) {
        if (!this.isSorting) return;

        this.visualizer.incrementComparison();

        this.visualizer.updateBarState(j, BAR_STATES.COMPARING);
        this.visualizer.updateBarState(j + 1, BAR_STATES.COMPARING);
        await sleep(this.speed);

        array[j + 1] = array[j];
        this.visualizer.incrementSwap();
        playSwapSound();

        this.visualizer.updateBarState(j, BAR_STATES.SWAPPING);
        this.visualizer.updateBarState(j + 1, BAR_STATES.SWAPPING);
        await sleep(this.speed);

        this.visualizer.setArray([...array]);
        this.visualizer.render();
        await sleep(this.speed);

        this.visualizer.clearComparingStates();
        j--;
      }

      array[j + 1] = key;
      this.visualizer.setArray([...array]);
      this.visualizer.render();

      this.visualizer.clearComparingStates();
      this.visualizer.updateBarState(j + 1, BAR_STATES.SORTED);
      await sleep(this.speed);
    }

    for (let i = 0; i < n; i++) {
      this.visualizer.updateBarState(i, BAR_STATES.SORTED);
    }
    this.visualizer.render();
  }

  stop() {
    this.isSorting = false;
  }
}

