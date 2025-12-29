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
    this.resetBarStates();
    this.render();
    this.resetStats();
  }

  render(preserveStates = false) {
    const existingBars = document.querySelectorAll(".bar");
    const statsOverlay = document.querySelector(".stats-overlay");

    if (!statsOverlay) {
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
    }

    if (existingBars.length === this.array.length) {
      existingBars.forEach((bar, index) => {
        if (this.array[index] !== undefined) {
          const currentHeight = parseInt(bar.style.height) || 0;
          const newHeight = this.array[index];
          const isSorted = bar.className.includes(BAR_STATES.SORTED);
          
          if (currentHeight !== newHeight) {
            bar.style.height = `${newHeight}px`;
            bar.textContent = newHeight;
          }
          
          if (!preserveStates && !isSorted) {
            const currentState = bar.className.split(" ").find(cls => 
              cls === BAR_STATES.COMPARING || cls === BAR_STATES.SWAPPING
            );
            if (!currentState) {
              bar.className = "bar";
            }
          }
        }
      });
    } else {
      existingBars.forEach((bar) => bar.remove());
      this.array.forEach((value, index) => {
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = `${value}px`;
        bar.style.transition = "height 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
        bar.textContent = value;
        bar.dataset.index = index;
        this.container.appendChild(bar);
      });
    }

    this.updateStatsDisplay();
  }

  updateBarState(index, state) {
    const bars = document.querySelectorAll(".bar");
    if (bars[index]) {
      bars[index].className = `bar ${state}`;
      bars[index].style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
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

