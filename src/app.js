import { Visualizer } from "./visualizer/index.js";
import { BubbleSort, SelectionSort, InsertionSort } from "./algorithms/index.js";
import { DEFAULT_SPEED, ALGORITHMS } from "./constants/index.js";

class SortingApp {
  constructor() {
    this.visualizer = new Visualizer("visualizationArea");
    this.isSorting = false;
    this.speed = DEFAULT_SPEED;
    this.currentAlgorithm = null;

    this.initializeElements();
    this.attachEventListeners();
    this.visualizer.generateRandomArray();
  }

  initializeElements() {
    this.generateBtn = document.getElementById("generateBtn");
    this.startBtn = document.getElementById("startBtn");
    this.speedSlider = document.getElementById("speedSlider");
    this.speedValue = document.getElementById("speedValue");
    this.algorithmSelect = document.getElementById("algorithmSelect");
  }

  attachEventListeners() {
    this.generateBtn.addEventListener("click", () => {
      if (!this.isSorting) {
        this.visualizer.generateRandomArray();
      }
    });

    this.startBtn.addEventListener("click", () => this.startSorting());

    this.speedSlider.addEventListener("input", (e) => {
      this.speed = 101 - parseInt(e.target.value);
      this.speedValue.textContent = `${this.speed}ms`;
    });
  }

  async startSorting() {
    if (this.isSorting) return;

    this.isSorting = true;
    this.disableControls();

    this.visualizer.resetStats();
    this.visualizer.resetBarStates();

    const algorithm = this.algorithmSelect.value;

    if (algorithm === ALGORITHMS.BUBBLE) {
      this.currentAlgorithm = new BubbleSort(this.visualizer, this.speed);
      await this.currentAlgorithm.sort();
    } else if (algorithm === ALGORITHMS.SELECTION) {
      this.currentAlgorithm = new SelectionSort(this.visualizer, this.speed);
      await this.currentAlgorithm.sort();
    } else if (algorithm === ALGORITHMS.INSERTION) {
      this.currentAlgorithm = new InsertionSort(this.visualizer, this.speed);
      await this.currentAlgorithm.sort();
    }

    this.isSorting = false;
    this.enableControls();
  }

  disableControls() {
    this.generateBtn.disabled = true;
    this.startBtn.disabled = true;
    this.algorithmSelect.disabled = true;
    this.speedSlider.disabled = true;
  }

  enableControls() {
    this.generateBtn.disabled = false;
    this.startBtn.disabled = false;
    this.algorithmSelect.disabled = false;
    this.speedSlider.disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new SortingApp();
});

