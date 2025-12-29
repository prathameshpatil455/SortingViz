To develop this project quickly and professionally for your PG program, follow this **3-step roadmap**. Using Cursor’s "Composer" mode (`Cmd + I` or `Ctrl + I`) is the most efficient way to generate the entire codebase in one go.

---

## Part 1: The "Master Prompt" for Cursor

Copy and paste this exact prompt into the **Cursor Composer**. It includes the logic, modern 2025 design trends (Dark mode & Bento grid style), and the specific success criteria you need.

> **Prompt:** > "Develop a modern, high-performance **Sorting Visualizer** web application in a single `index.html` file (using internal CSS and JS for simplicity).
> **1. Visuals & Style:** Use a 'Midnight Dark' theme with a 'Bento Grid' layout. Represent array values as sleek bars with rounded tops. Use a CSS transition of `0.2s` for smooth height changes.
> **2. Algorithms:** Implement **Bubble Sort** and **Selection Sort**.
> **3. Interactivity:** > - A 'Generate New Array' button that creates 30 random bars.
>
> - A 'Speed Control' slider.
> - A 'Start Sorting' dropdown to pick the algorithm.
>   **4. Animation Logic:** Use `async/await` with a `sleep` function so the UI doesn't freeze.
>   **5. State Indication (Color Palette):**
> - Default: Soft Blue (`#3498db`)
> - Comparing: Vibrant Yellow (`#f1c40f`)
> - Swapping: Coral Red (`#e74c3c`)
> - Sorted: Emerald Green (`#2ecc71`)
>   **6. PG Feature:** Add a small 'Live Stats' overlay that shows the current **Time Complexity** () and a counter for the number of 'Swaps' and 'Comparisons' performed in real-time."

---

## Part 2: The Development Roadmap

### **Step 1: Setup (1 Minute)**

1. Open **Cursor**.
2. Create a new folder named `SortingVisualizer`.
3. Open the **Composer** (`Ctrl+I` / `Cmd+I`) and paste the prompt above.
4. Click **"Apply"** to let Cursor generate the code.

### **Step 2: Refinement & "PG Level" Polish (5 Minutes)**

Once the basic app works, ask Cursor to add these advanced touches to make it look like a post-graduate project:

- **Prompt:** _"Add a legend explaining the colors and a 'Big O' cheat sheet section at the bottom."_
- **Prompt:** _"Add a sound effect (short 'blip') every time a swap occurs (optional but very cool for presentations)."_

### **Step 3: Exporting for your PPT**

To make your presentation visually stunning:

1. **Screen Record:** Use a tool like Loom or your OS built-in recorder to capture the bars "bubbling" to the top.
2. **GIF Conversion:** Convert those clips to GIFs to embed directly into your PPT slides.
3. **Code Snippet:** Highlight the `await sleep()` part of the code—this is the "bridge" between the algorithm's speed and human perception.

---

## Part 3: Presentation "Pro-Tips"

Since this is for a PG program, don't just show the bars moving. Explain **why** you built it this way:

- **The Async Logic:** Explain that JavaScript is single-threaded. To animate without "locking" the browser, you used `Promises` and the `Event Loop`.
- **State Machine:** Mention that each bar acts like a state in a **Finite Automaton**—it transitions from `Unsorted` `Comparing` `Swapping` `Sorted`. (This links it perfectly to your previous topic!)
- **Complexity Visualization:** Point out how the "Sorted" (Green) bars accumulate at the end, visually proving why the inner loop of Bubble Sort gets shorter each time ().

### **The "NotebookLLM" Hook**

If you want to feed this to NotebookLM to generate your PPT:

1. Save your code as `index.html`.
2. Ask Cursor: _"Summarize the technical architecture and the mathematical logic of the Bubble Sort implementation in this file for a technical report."_
3. Upload that **summary** + the **code** to NotebookLLM. It will have all the "meat" it needs to create a high-level academic presentation.

**Would you like me to write the specific `bubbleSort` and `sleep` functions for you to review before you run them in Cursor?**
