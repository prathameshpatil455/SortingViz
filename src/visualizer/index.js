import {
  ARRAY_SIZE,
  MIN_VALUE,
  MAX_VALUE,
  BAR_STATES,
} from "../constants/index.js";

export class Visualizer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.array = [];
    this.comparisons = 0;
    this.swaps = 0;
  }

  generateRandomArray() {
    this.array = [];
    for (let i = 0; i < ARRAY_SIZE; i++) {
      this.array.push(
        Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE
      );
    }
    this.render();
    this.resetStats();
  }

  render() {
    this.container.innerHTML = `
      <div class="stats-overlay">
        <h3>Live Stats</h3>
        <div class="stat-item">
          <span class="stat-label">Comparisons:</span>
          <span class="stat-value" id="comparisonsCount">${this.comparisons}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Swaps:</span>
          <span class="stat-value" id="swapsCount">${this.swaps}</span>
        </div>
        <div class="complexity">
          <div class="complexity-label">Time Complexity:</div>
          <div class="complexity-value" id="timeComplexity">O(n²)</div>
        </div>
      </div>
    `;

    this.array.forEach((value, index) => {
      const bar = document.createElement("div");
      bar.className = "bar";
      bar.style.height = `${value}px`;
      bar.textContent = value;
      bar.dataset.index = index;
      this.container.appendChild(bar);
    });

    this.updateStatsDisplay();
  }

  updateBarState(index, state) {
    const bars = document.querySelectorAll(".bar");
    if (bars[index]) {
      bars[index].className = `bar ${state}`;
    }
  }

  resetBarStates() {
    const bars = document.querySelectorAll(".bar");
    bars.forEach((bar) => {
      bar.className = "bar";
    });
  }

  clearComparingStates() {
    const bars = document.querySelectorAll(".bar");
    bars.forEach((bar) => {
      if (!bar.className.includes(BAR_STATES.SORTED)) {
        bar.className = "bar";
      }
    });
  }

  updateStatsDisplay() {
    const comparisonsEl = document.getElementById("comparisonsCount");
    const swapsEl = document.getElementById("swapsCount");
    if (comparisonsEl) comparisonsEl.textContent = this.comparisons;
    if (swapsEl) swapsEl.textContent = this.swaps;
  }

  incrementComparison() {
    this.comparisons++;
    this.updateStatsDisplay();
  }

  incrementSwap() {
    this.swaps++;
    this.updateStatsDisplay();
  }

  resetStats() {
    this.comparisons = 0;
    this.swaps = 0;
    this.updateStatsDisplay();
  }

  getArray() {
    return this.array;
  }

  setArray(newArray) {
    this.array = newArray;
  }
}

