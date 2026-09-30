export const JAVA_KEYWORDS = [
  "abstract", "assert", "boolean", "break", "byte", "case", "catch", "char",
  "class", "const", "continue", "default", "do", "double", "else", "enum",
  "extends", "final", "finally", "float", "for", "goto", "if", "implements",
  "import", "instanceof", "int", "interface", "long", "native", "new",
  "package", "private", "protected", "public", "return", "short", "static",
  "strictfp", "super", "switch", "synchronized", "this", "throw", "throws",
  "transient", "try", "void", "volatile", "while", "true", "false", "null"
];

export const JAVA_SNIPPETS = [
  {
    prefix: "sout",
    label: "sout",
    detail: "System.out.println()",
    documentation: "Prints a message to standard output followed by a newline.",
    insertText: "System.out.println($0);"
  },
  {
    prefix: "syso",
    label: "syso",
    detail: "System.out.println()",
    documentation: "Prints a message to standard output followed by a newline.",
    insertText: "System.out.println($0);"
  },
  {
    prefix: "fori",
    label: "fori",
    detail: "for (int i = 0; i < n; i++)",
    documentation: "Standard 0-indexed forward counting loop.",
    insertText: "for (int i = 0; i < ${1:n}; i++) {\n    $0\n}"
  },
  {
    prefix: "forr",
    label: "forr",
    detail: "for (int i = n - 1; i >= 0; i--)",
    documentation: "Reverse loop indexing down to 0.",
    insertText: "for (int i = ${1:n} - 1; i >= 0; i--) {\n    $0\n}"
  },
  {
    prefix: "foreach",
    label: "foreach",
    detail: "for (Type item : collection)",
    documentation: "Enhanced for loop iterating over array or Iterable.",
    insertText: "for (${1:int} ${2:x} : ${3:nums}) {\n    $0\n}"
  },
  {
    prefix: "psvm",
    label: "psvm",
    detail: "public static void main(String[] args)",
    documentation: "Java standard main method entry point.",
    insertText: "public static void main(String[] args) {\n    $0\n}"
  },
  {
    prefix: "if",
    label: "if",
    detail: "if (condition) { ... }",
    documentation: "Conditional statement.",
    insertText: "if (${1:condition}) {\n    $0\n}"
  },
  {
    prefix: "try",
    label: "try",
    detail: "try { ... } catch (Exception e) { ... }",
    documentation: "Try-catch exception handling block.",
    insertText: "try {\n    $0\n} catch (Exception e) {\n    e.printStackTrace();\n}"
  },
  // Full collection declaration and instantiation snippets
  {
    prefix: "list",
    label: "List<Integer> list = new ArrayList<>();",
    detail: "List<Integer> list = new ArrayList<>()",
    documentation: "Declare and instantiate an ArrayList of Integers.",
    insertText: "List<${1:Integer}> ${2:list} = new ArrayList<>();$0"
  },
  {
    prefix: "ArrayList",
    label: "List<Integer> list = new ArrayList<>();",
    detail: "List<Integer> list = new ArrayList<>()",
    documentation: "Full syntax: Declare and instantiate a new ArrayList.",
    insertText: "List<${1:Integer}> ${2:list} = new ArrayList<>();$0"
  },
  {
    prefix: "ArrayList",
    label: "ArrayList<Integer> list = new ArrayList<>();",
    detail: "ArrayList<Integer> list = new ArrayList<>()",
    documentation: "Full concrete type syntax: Declare and instantiate a new ArrayList.",
    insertText: "ArrayList<${1:Integer}> ${2:list} = new ArrayList<>();$0"
  },
  {
    prefix: "new ArrayList",
    label: "new ArrayList<>()",
    detail: "new ArrayList<>()",
    documentation: "Instantiate a new ArrayList with diamond operator.",
    insertText: "new ArrayList<>()"
  },
  {
    prefix: "map",
    label: "Map<Integer, Integer> map = new HashMap<>();",
    detail: "Map<Integer, Integer> map = new HashMap<>()",
    documentation: "Declare and instantiate a HashMap.",
    insertText: "Map<${1:Integer}, ${2:Integer}> ${3:map} = new HashMap<>();$0"
  },
  {
    prefix: "HashMap",
    label: "Map<Integer, Integer> map = new HashMap<>();",
    detail: "Map<Integer, Integer> map = new HashMap<>()",
    documentation: "Full syntax: Declare and instantiate a new HashMap.",
    insertText: "Map<${1:Integer}, ${2:Integer}> ${3:map} = new HashMap<>();$0"
  },
  {
    prefix: "HashMap",
    label: "HashMap<Integer, Integer> map = new HashMap<>();",
    detail: "HashMap<Integer, Integer> map = new HashMap<>()",
    documentation: "Full concrete type syntax: Declare and instantiate a new HashMap.",
    insertText: "HashMap<${1:Integer}, ${2:Integer}> ${3:map} = new HashMap<>();$0"
  },
  {
    prefix: "new HashMap",
    label: "new HashMap<>()",
    detail: "new HashMap<>()",
    documentation: "Instantiate a new HashMap with diamond operator.",
    insertText: "new HashMap<>()"
  },
  {
    prefix: "set",
    label: "Set<Integer> set = new HashSet<>();",
    detail: "Set<Integer> set = new HashSet<>()",
    documentation: "Declare and instantiate a HashSet.",
    insertText: "Set<${1:Integer}> ${2:set} = new HashSet<>();$0"
  },
  {
    prefix: "HashSet",
    label: "Set<Integer> set = new HashSet<>();",
    detail: "Set<Integer> set = new HashSet<>()",
    documentation: "Full syntax: Declare and instantiate a new HashSet.",
    insertText: "Set<${1:Integer}> ${2:set} = new HashSet<>();$0"
  },
  {
    prefix: "HashSet",
    label: "HashSet<Integer> set = new HashSet<>();",
    detail: "HashSet<Integer> set = new HashSet<>()",
    documentation: "Full concrete type syntax: Declare and instantiate a new HashSet.",
    insertText: "HashSet<${1:Integer}> ${2:set} = new HashSet<>();$0"
  },
  {
    prefix: "new HashSet",
    label: "new HashSet<>()",
    detail: "new HashSet<>()",
    documentation: "Instantiate a new HashSet with diamond operator.",
    insertText: "new HashSet<>()"
  },
  {
    prefix: "queue",
    label: "Queue<Integer> queue = new LinkedList<>();",
    detail: "Queue<Integer> queue = new LinkedList<>()",
    documentation: "Declare and instantiate a Queue backed by LinkedList.",
    insertText: "Queue<${1:Integer}> ${2:queue} = new LinkedList<>();$0"
  },
  {
    prefix: "Queue",
    label: "Queue<Integer> queue = new LinkedList<>();",
    detail: "Queue<Integer> queue = new LinkedList<>()",
    documentation: "Full syntax: Declare and instantiate a new Queue.",
    insertText: "Queue<${1:Integer}> ${2:queue} = new LinkedList<>();$0"
  },
  {
    prefix: "deque",
    label: "Deque<Integer> deque = new ArrayDeque<>();",
    detail: "Deque<Integer> deque = new ArrayDeque<>()",
    documentation: "Declare and instantiate a Deque backed by ArrayDeque.",
    insertText: "Deque<${1:Integer}> ${2:deque} = new ArrayDeque<>();$0"
  },
  {
    prefix: "Deque",
    label: "Deque<Integer> deque = new ArrayDeque<>();",
    detail: "Deque<Integer> deque = new ArrayDeque<>()",
    documentation: "Full syntax: Declare and instantiate a new Deque.",
    insertText: "Deque<${1:Integer}> ${2:deque} = new ArrayDeque<>();$0"
  },
  {
    prefix: "ArrayDeque",
    label: "Deque<Integer> deque = new ArrayDeque<>();",
    detail: "Deque<Integer> deque = new ArrayDeque<>()",
    documentation: "Full syntax: Declare and instantiate a new ArrayDeque.",
    insertText: "Deque<${1:Integer}> ${2:deque} = new ArrayDeque<>();$0"
  },
  {
    prefix: "new ArrayDeque",
    label: "new ArrayDeque<>()",
    detail: "new ArrayDeque<>()",
    documentation: "Instantiate a new ArrayDeque with diamond operator.",
    insertText: "new ArrayDeque<>()"
  },
  {
    prefix: "pq",
    label: "PriorityQueue<Integer> pq = new PriorityQueue<>();",
    detail: "PriorityQueue<Integer> pq = new PriorityQueue<>() (Min Heap)",
    documentation: "Declare and instantiate a PriorityQueue (min-heap by default).",
    insertText: "PriorityQueue<${1:Integer}> ${2:pq} = new PriorityQueue<>();$0"
  },
  {
    prefix: "PriorityQueue",
    label: "PriorityQueue<Integer> pq = new PriorityQueue<>();",
    detail: "PriorityQueue<Integer> pq = new PriorityQueue<>() (Min Heap)",
    documentation: "Full syntax: Declare and instantiate a min-heap PriorityQueue.",
    insertText: "PriorityQueue<${1:Integer}> ${2:pq} = new PriorityQueue<>();$0"
  },
  {
    prefix: "maxpq",
    label: "PriorityQueue<Integer> maxPq = new PriorityQueue<>(Collections.reverseOrder());",
    detail: "PriorityQueue<Integer> maxPq = new PriorityQueue<>(Collections.reverseOrder()) (Max Heap)",
    documentation: "Declare and instantiate a max-heap PriorityQueue.",
    insertText: "PriorityQueue<${1:Integer}> ${2:maxPq} = new PriorityQueue<>(Collections.reverseOrder());$0"
  },
  {
    prefix: "stack",
    label: "Stack<Integer> stack = new Stack<>();",
    detail: "Stack<Integer> stack = new Stack<>()",
    documentation: "Declare and instantiate a Stack.",
    insertText: "Stack<${1:Integer}> ${2:stack} = new Stack<>();$0"
  },
  {
    prefix: "Stack",
    label: "Stack<Integer> stack = new Stack<>();",
    detail: "Stack<Integer> stack = new Stack<>()",
    documentation: "Full syntax: Declare and instantiate a new Stack.",
    insertText: "Stack<${1:Integer}> ${2:stack} = new Stack<>();$0"
  },
  {
    prefix: "sb",
    label: "StringBuilder sb = new StringBuilder();",
    detail: "StringBuilder sb = new StringBuilder()",
    documentation: "Declare and instantiate a StringBuilder.",
    insertText: "StringBuilder ${1:sb} = new StringBuilder();$0"
  },
  {
    prefix: "StringBuilder",
    label: "StringBuilder sb = new StringBuilder();",
    detail: "StringBuilder sb = new StringBuilder()",
    documentation: "Full syntax: Declare and instantiate a StringBuilder.",
    insertText: "StringBuilder ${1:sb} = new StringBuilder();$0"
  },
  {
    prefix: "new StringBuilder",
    label: "new StringBuilder()",
    detail: "new StringBuilder()",
    documentation: "Instantiate a new StringBuilder.",
    insertText: "new StringBuilder()"
  }
];
