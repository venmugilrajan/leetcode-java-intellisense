# LeetCode Java IntelliSense (Chrome Extension)

A lightweight, high-performance Manifest V3 Chrome Extension providing **VS Code-like IntelliSense, Type-Aware Autocomplete, and Method Signatures** directly inside the LeetCode Monaco editor.

---

## 🚀 Key Features

- **Type-Aware Java Autocomplete**: Infers local variable and method parameter types (`HashMap`, `ArrayList`, `String`, `StringBuilder`, `Array`, etc.) and delivers accurate method completions.
- **Static Class Completion**: Full static method completion and signature help for `Arrays`, `Math`, `Collections`, `System`, `Objects`, `Integer`, etc.
- **LeetCode Structure Support**: First-class support for `ListNode`, `TreeNode`, and `Node` (`val`, `next`, `left`, `right`, etc.).
- **Code Snippets**: Quick templates for `sout` / `syso` (`System.out.println()`), `fori`, `forr`, `foreach`, `psvm`, `if`, `try`.
- **VS Code-Style Dark UI**: Pixel-perfect dark popup featuring: 
  - 🔷 Method icons and 🔹 field indicators
  - Keyboard navigation (`ArrowUp`, `ArrowDown`, `Enter`, `Tab`, `Escape`)
  - Real-time side documentation and signature panel
- **Context Detection**: Ignores trigger characters inside string literals (`"..."`) and comments (`// ...`, `/* ... */`).
- **Resilient Monaco Integration**: Hooks into LeetCode's Monaco Editor instances, tracks cursor coordinates, and automatically observes Single Page Application (SPA) problem transitions.
- **100% Offline & Private**: Zero external network requests, zero telemetry, no AI API keys required (< 50ms latency).

---

## 📦 Project Architecture

```
leetcode-java-intellisense/
├── manifest.json                  # Manifest V3 configuration
├── vite.config.js                 # Rollup/Vite build configuration
├── package.json                   # Build scripts & dependencies
├── src/
│   ├── background/
│   │   └── background.js          # Service worker lifecycle handler
│   ├── content/
│   │   ├── content.js             # Main content script coordinator
│   │   ├── editorDetector.js      # Monaco editor & cursor locator
│   │   ├── injected.js            # Main-world bridge script
│   │   └── leetcodeObserver.js    # SPA mutation & URL observer
│   ├── autocomplete/
│   │   ├── autocompleteEngine.js  # Language-provider coordinator
│   │   ├── parser.js              # Lightweight Java lexer & AST type extractor
│   │   ├── symbolTable.js         # Scoped variable symbol table
│   │   └── typeResolver.js        # Inheritance & method lookup engine
│   ├── languages/
│   │   └── java/
│   │       ├── JavaProvider.js    # Java language completion provider
│   │       ├── javaClasses.js     # Java classes, methods, and javadocs
│   │       └── javaSnippets.js    # Snippets & keyword definitions
│   ├── ui/
│   │   ├── completionWidget.js    # Floating IntelliSense popup widget
│   │   ├── documentationWidget.js # Method signature & doc preview panel
│   │   └── styles.css             # Dark theme styles
│   └── utils/
│       ├── debounce.js            # Keystroke debounce utility
│       └── logger.js              # Debugging and diagnostic logger
├── test/
│   └── javaCompletions.test.js    # Unit test suite verifying all 10 test cases
├── icons/                         # Extension icons (16, 48, 128)
└── dist/                          # Production-ready unpacked extension
```

---

## 🛠️ Installation Instructions

1. Ensure **Node.js** (v18+) is installed.
2. In the extension directory (`r:/extension`), build the project:
   ```bash
   npm install
   npm run build
   ```
3. Open Google Chrome and navigate to:
   ```text
   chrome://extensions
   ```
4. Enable **Developer mode** toggle in the top-right corner.
5. Click **Load unpacked**.
6. Select the **`dist`** directory inside this repository (`r:\extension\dist`).

### 🔄 Updating the Extension (For Users & Teammates)
When a new version is released on GitHub:
1. A notification banner automatically appears on LeetCode letting the user know a new version (e.g. `v1.0.1`) is available with a link to the release notes.
2. If the user cloned the repository with Git, they can update anytime with:
   ```bash
   git pull && npm run build
   ```
3. Click the 🔄 **Reload** icon on the extension card at `chrome://extensions`. No re-installation needed!

---

## 🧪 Testing and Verification

### 1. Run Automated Unit Tests
Run the test suite verifying all 10 mandatory test cases:
```bash
npm test
```

### 2. Manual Testing in LeetCode
1. Open any problem on [LeetCode](https://leetcode.com/problems/two-sum/) with language set to **Java**.
2. Test **Snippets**:
   - Type `sout` ➡️ Press `Tab` or `Enter` ➡️ expands to `System.out.println();`
   - Type `fori` ➡️ Press `Tab` or `Enter` ➡️ expands to indexed for-loop.
3. Test **Type-Aware Autocomplete**:
   - Declare: `HashMap<Integer, Integer> map = new HashMap<>();`
   - Type: `map.`
   - Observe the dark IntelliSense popup listing `get`, `put`, `remove`, `containsKey`, `size`, `isEmpty`, etc. with signatures and docs.
4. Test **Static Utilities**:
   - Type: `Arrays.` ➡️ `sort`, `binarySearch`, `copyOf`, etc.
   - Type: `Math.` ➡️ `abs`, `max`, `min`, `sqrt`, `pow`, etc.
5. Test **LeetCode Nodes**:
   - Declare: `ListNode node;`
   - Type: `node.` ➡️ `val`, `next`.

### 3. Developer Debug Mode
Open Chrome DevTools (`F12`) on LeetCode and enable debug logging:
```javascript
window.__LEETSENSE_DEBUG__ = true;
```
As you type, real-time type extraction, offsets, and symbol tables will be output to the console.
