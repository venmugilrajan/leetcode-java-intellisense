export const JAVA_CLASSES = {
  // Primitives / Boxed
  "Integer": {
    type: "class",
    package: "java.lang",
    description: "Wraps a value of the primitive type int in an object.",
    methods: {
      "parseInt": { sig: "parseInt(String s) : int", doc: "Parses the string argument as a signed decimal integer.", isStatic: true },
      "valueOf": { sig: "valueOf(int i) : Integer", doc: "Returns an Integer instance representing the specified int value.", isStatic: true },
      "compare": { sig: "compare(int x, int y) : int", doc: "Compares two int values numerically.", isStatic: true },
      "max": { sig: "max(int a, int b) : int", doc: "Returns the greater of two int values.", isStatic: true },
      "min": { sig: "min(int a, int b) : int", doc: "Returns the smaller of two int values.", isStatic: true },
      "bitCount": { sig: "bitCount(int i) : int", doc: "Returns the number of one-bits in the two's complement binary representation of the specified int value.", isStatic: true },
      "toBinaryString": { sig: "toBinaryString(int i) : String", doc: "Returns a string representation of the integer argument as an unsigned integer in base 2.", isStatic: true }
    }
  },
  "Long": {
    type: "class",
    package: "java.lang",
    description: "Wraps a value of the primitive type long in an object.",
    methods: {
      "parseLong": { sig: "parseLong(String s) : long", doc: "Parses the string argument as a signed decimal long.", isStatic: true },
      "valueOf": { sig: "valueOf(long l) : Long", doc: "Returns a Long instance representing the specified long value.", isStatic: true },
      "compare": { sig: "compare(long x, long y) : int", doc: "Compares two long values numerically.", isStatic: true }
    }
  },
  "Double": {
    type: "class",
    package: "java.lang",
    description: "Wraps a value of the primitive type double in an object.",
    methods: {
      "parseDouble": { sig: "parseDouble(String s) : double", doc: "Parses the string argument as a double.", isStatic: true },
      "valueOf": { sig: "valueOf(double d) : Double", doc: "Returns a Double instance representing the specified double value.", isStatic: true }
    }
  },
  "Character": {
    type: "class",
    package: "java.lang",
    description: "Wraps a value of the primitive type char in an object.",
    methods: {
      "isLetter": { sig: "isLetter(char ch) : boolean", doc: "Determines if the specified character is a letter.", isStatic: true },
      "isDigit": { sig: "isDigit(char ch) : boolean", doc: "Determines if the specified character is a digit.", isStatic: true },
      "isLetterOrDigit": { sig: "isLetterOrDigit(char ch) : boolean", doc: "Determines if the specified character is a letter or digit.", isStatic: true },
      "toLowerCase": { sig: "toLowerCase(char ch) : char", doc: "Converts the character argument to lowercase.", isStatic: true },
      "toUpperCase": { sig: "toUpperCase(char ch) : char", doc: "Converts the character argument to uppercase.", isStatic: true },
      "isWhitespace": { sig: "isWhitespace(char ch) : boolean", doc: "Determines if the specified character is white space.", isStatic: true }
    }
  },

  // String & StringBuilder
  "String": {
    type: "class",
    package: "java.lang",
    description: "Represents character strings. All string literals in Java programs are implemented as instances of this class.",
    methods: {
      "length": { sig: "length() : int", doc: "Returns the length of this string." },
      "charAt": { sig: "charAt(int index) : char", doc: "Returns the char value at the specified index." },
      "toCharArray": { sig: "toCharArray() : char[]", doc: "Converts this string to a new character array." },
      "substring": { sig: "substring(int beginIndex, int endIndex) : String", doc: "Returns a string that is a substring of this string." },
      "contains": { sig: "contains(CharSequence s) : boolean", doc: "Returns true if and only if this string contains the specified sequence of char values." },
      "equals": { sig: "equals(Object anObject) : boolean", doc: "Compares this string to the specified object." },
      "equalsIgnoreCase": { sig: "equalsIgnoreCase(String anotherString) : boolean", doc: "Compares this String to another String, ignoring case considerations." },
      "indexOf": { sig: "indexOf(String str) : int", doc: "Returns the index within this string of the first occurrence of the specified substring." },
      "lastIndexOf": { sig: "lastIndexOf(String str) : int", doc: "Returns the index within this string of the last occurrence of the specified substring." },
      "startsWith": { sig: "startsWith(String prefix) : boolean", doc: "Tests if this string starts with the specified prefix." },
      "endsWith": { sig: "endsWith(String suffix) : boolean", doc: "Tests if this string ends with the specified suffix." },
      "toLowerCase": { sig: "toLowerCase() : String", doc: "Converts all of the characters in this String to lower case." },
      "toUpperCase": { sig: "toUpperCase() : String", doc: "Converts all of the characters in this String to upper case." },
      "trim": { sig: "trim() : String", doc: "Returns a string whose value is this string, with all leading and trailing space removed." },
      "strip": { sig: "strip() : String", doc: "Returns a string whose value is this string, with all leading and trailing white space removed." },
      "replace": { sig: "replace(char oldChar, char newChar) : String", doc: "Returns a string resulting from replacing all occurrences of oldChar in this string with newChar." },
      "replaceAll": { sig: "replaceAll(String regex, String replacement) : String", doc: "Replaces each substring of this string that matches the given regular expression with the given replacement." },
      "split": { sig: "split(String regex) : String[]", doc: "Splits this string around matches of the given regular expression." },
      "compareTo": { sig: "compareTo(String anotherString) : int", doc: "Compares two strings lexicographically." },
      "isEmpty": { sig: "isEmpty() : boolean", doc: "Returns true if, and only if, length() is 0." },
      "valueOf": { sig: "valueOf(Object obj) : String", doc: "Returns the string representation of the Object argument.", isStatic: true },
      "join": { sig: "join(CharSequence delimiter, CharSequence... elements) : String", doc: "Returns a new String composed of copies of the CharSequence elements joined together with a copy of the specified delimiter.", isStatic: true }
    }
  },
  "StringBuilder": {
    type: "class",
    package: "java.lang",
    description: "A mutable sequence of characters. Designed for use as a drop-in replacement for StringBuffer in places where the string buffer was being used by a single thread.",
    methods: {
      "append": { sig: "append(Object obj) : StringBuilder", doc: "Appends the string representation of the argument." },
      "insert": { sig: "insert(int offset, Object obj) : StringBuilder", doc: "Inserts the string representation of the argument into this character sequence." },
      "delete": { sig: "delete(int start, int end) : StringBuilder", doc: "Removes the characters in a substring of this sequence." },
      "deleteCharAt": { sig: "deleteCharAt(int index) : StringBuilder", doc: "Removes the char at the specified position in this sequence." },
      "reverse": { sig: "reverse() : StringBuilder", doc: "Causes this character sequence to be replaced by the reverse of the sequence." },
      "replace": { sig: "replace(int start, int end, String str) : StringBuilder", doc: "Replaces the characters in a substring with characters in the specified String." },
      "substring": { sig: "substring(int start, int end) : String", doc: "Returns a new String that contains a subsequence of characters." },
      "length": { sig: "length() : int", doc: "Returns the length (character count)." },
      "charAt": { sig: "charAt(int index) : char", doc: "Returns the char value in this sequence at the specified index." },
      "setCharAt": { sig: "setCharAt(int index, char ch) : void", doc: "The character at the specified index is set to ch." },
      "toString": { sig: "toString() : String", doc: "Returns a string representing the data in this sequence." }
    }
  },
  "StringBuffer": {
    type: "class",
    package: "java.lang",
    description: "A thread-safe, mutable sequence of characters.",
    methods: {
      "append": { sig: "append(Object obj) : StringBuffer", doc: "Appends the string representation of the argument." },
      "insert": { sig: "insert(int offset, Object obj) : StringBuffer", doc: "Inserts the string representation of the argument into this sequence." },
      "delete": { sig: "delete(int start, int end) : StringBuffer", doc: "Removes the characters in a substring." },
      "reverse": { sig: "reverse() : StringBuffer", doc: "Causes this character sequence to be replaced by the reverse of the sequence." },
      "toString": { sig: "toString() : String", doc: "Returns a string representing the data in this sequence." }
    }
  },

  // Map implementations
  "Map": {
    type: "interface",
    package: "java.util",
    description: "An object that maps keys to values. A map cannot contain duplicate keys; each key can map to at most one value.",
    methods: {
      "get": { sig: "get(Object key) : V", doc: "Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key." },
      "put": { sig: "put(K key, V value) : V", doc: "Associates the specified value with the specified key in this map." },
      "remove": { sig: "remove(Object key) : V", doc: "Removes the mapping for a key from this map if it is present." },
      "containsKey": { sig: "containsKey(Object key) : boolean", doc: "Returns true if this map contains a mapping for the specified key." },
      "containsValue": { sig: "containsValue(Object value) : boolean", doc: "Returns true if this map maps one or more keys to the specified value." },
      "getOrDefault": { sig: "getOrDefault(Object key, V defaultValue) : V", doc: "Returns the value to which the specified key is mapped, or defaultValue if this map contains no mapping." },
      "putIfAbsent": { sig: "putIfAbsent(K key, V value) : V", doc: "If the specified key is not already associated with a value, associates it with the given value." },
      "keySet": { sig: "keySet() : Set<K>", doc: "Returns a Set view of the keys contained in this map." },
      "values": { sig: "values() : Collection<V>", doc: "Returns a Collection view of the values contained in this map." },
      "entrySet": { sig: "entrySet() : Set<Map.Entry<K,V>>", doc: "Returns a Set view of the mappings contained in this map." },
      "size": { sig: "size() : int", doc: "Returns the number of key-value mappings in this map." },
      "isEmpty": { sig: "isEmpty() : boolean", doc: "Returns true if this map contains no key-value mappings." },
      "clear": { sig: "clear() : void", doc: "Removes all of the mappings from this map." },
      "computeIfAbsent": { sig: "computeIfAbsent(K key, Function<? super K, ? extends V> mappingFunction) : V", doc: "If the specified key is not already associated with a value, attempts to compute its value using the given mapping function." }
    }
  },
  "HashMap": {
    type: "class",
    package: "java.util",
    description: "Hash table based implementation of the Map interface. Permits null values and the null key.",
    inherits: "Map"
  },
  "LinkedHashMap": {
    type: "class",
    package: "java.util",
    description: "Hash table and linked list implementation of the Map interface, with predictable iteration order.",
    inherits: "Map"
  },
  "TreeMap": {
    type: "class",
    package: "java.util",
    description: "A Red-Black tree based NavigableMap implementation. Sorted according to the natural ordering of its keys.",
    inherits: "Map",
    methods: {
      "firstKey": { sig: "firstKey() : K", doc: "Returns the first (lowest) key currently in this map." },
      "lastKey": { sig: "lastKey() : K", doc: "Returns the last (highest) key currently in this map." },
      "floorKey": { sig: "floorKey(K key) : K", doc: "Returns the greatest key less than or equal to the given key, or null if there is no such key." },
      "ceilingKey": { sig: "ceilingKey(K key) : K", doc: "Returns the least key greater than or equal to the given key, or null if there is no such key." },
      "higherKey": { sig: "higherKey(K key) : K", doc: "Returns the least key strictly greater than the given key." },
      "lowerKey": { sig: "lowerKey(K key) : K", doc: "Returns the greatest key strictly less than the given key." }
    }
  },

  // List implementations
  "List": {
    type: "interface",
    package: "java.util",
    description: "An ordered collection (also known as a sequence). The user has precise control over where in the list each element is inserted.",
    methods: {
      "add": { sig: "add(E e) : boolean", doc: "Appends the specified element to the end of this list." },
      "get": { sig: "get(int index) : E", doc: "Returns the element at the specified position in this list." },
      "set": { sig: "set(int index, E element) : E", doc: "Replaces the element at the specified position in this list with the specified element." },
      "remove": { sig: "remove(int index) : E", doc: "Removes the element at the specified position in this list." },
      "contains": { sig: "contains(Object o) : boolean", doc: "Returns true if this list contains the specified element." },
      "size": { sig: "size() : int", doc: "Returns the number of elements in this list." },
      "isEmpty": { sig: "isEmpty() : boolean", doc: "Returns true if this list contains no elements." },
      "clear": { sig: "clear() : void", doc: "Removes all of the elements from this list." },
      "indexOf": { sig: "indexOf(Object o) : int", doc: "Returns the index of the first occurrence of the specified element in this list, or -1." },
      "lastIndexOf": { sig: "lastIndexOf(Object o) : int", doc: "Returns the index of the last occurrence of the specified element in this list, or -1." },
      "subList": { sig: "subList(int fromIndex, int toIndex) : List<E>", doc: "Returns a view of the portion of this list between fromIndex, inclusive, and toIndex, exclusive." },
      "toArray": { sig: "toArray(T[] a) : T[]", doc: "Returns an array containing all of the elements in this list in proper sequence." },
      "sort": { sig: "sort(Comparator<? super E> c) : void", doc: "Sorts this list according to the order induced by the specified Comparator." }
    }
  },
  "ArrayList": {
    type: "class",
    package: "java.util",
    description: "Resizable-array implementation of the List interface. Implements all optional list operations, and permits all elements, including null.",
    inherits: "List"
  },
  "LinkedList": {
    type: "class",
    package: "java.util",
    description: "Doubly-linked list implementation of the List and Deque interfaces.",
    inherits: "List",
    methods: {
      "addFirst": { sig: "addFirst(E e) : void", doc: "Inserts the specified element at the beginning of this list." },
      "addLast": { sig: "addLast(E e) : void", doc: "Appends the specified element to the end of this list." },
      "getFirst": { sig: "getFirst() : E", doc: "Returns the first element in this list." },
      "getLast": { sig: "getLast() : E", doc: "Returns the last element in this list." },
      "removeFirst": { sig: "removeFirst() : E", doc: "Removes and returns the first element from this list." },
      "removeLast": { sig: "removeLast() : E", doc: "Removes and returns the last element from this list." },
      "poll": { sig: "poll() : E", doc: "Retrieves and removes the head (first element) of this list." },
      "peek": { sig: "peek() : E", doc: "Retrieves, but does not remove, the head (first element) of this list." }
    }
  },

  // Set implementations
  "Set": {
    type: "interface",
    package: "java.util",
    description: "A collection that contains no duplicate elements.",
    methods: {
      "add": { sig: "add(E e) : boolean", doc: "Adds the specified element to this set if it is not already present." },
      "remove": { sig: "remove(Object o) : boolean", doc: "Removes the specified element from this set if it is present." },
      "contains": { sig: "contains(Object o) : boolean", doc: "Returns true if this set contains the specified element." },
      "size": { sig: "size() : int", doc: "Returns the number of elements in this set." },
      "isEmpty": { sig: "isEmpty() : boolean", doc: "Returns true if this set contains no elements." },
      "clear": { sig: "clear() : void", doc: "Removes all of the elements from this set." },
      "toArray": { sig: "toArray(T[] a) : T[]", doc: "Returns an array containing all of the elements in this set." }
    }
  },
  "HashSet": {
    type: "class",
    package: "java.util",
    description: "This class implements the Set interface, backed by a hash table (actually a HashMap instance).",
    inherits: "Set"
  },
  "LinkedHashSet": {
    type: "class",
    package: "java.util",
    description: "Hash table and linked list implementation of the Set interface, with predictable iteration order.",
    inherits: "Set"
  },
  "TreeSet": {
    type: "class",
    package: "java.util",
    description: "A NavigableSet implementation based on a TreeMap. The elements are ordered using their natural ordering, or by a Comparator.",
    inherits: "Set",
    methods: {
      "first": { sig: "first() : E", doc: "Returns the first (lowest) element currently in this set." },
      "last": { sig: "last() : E", doc: "Returns the last (highest) element currently in this set." },
      "floor": { sig: "floor(E e) : E", doc: "Returns the greatest element in this set less than or equal to the given element, or null." },
      "ceiling": { sig: "ceiling(E e) : E", doc: "Returns the least element in this set greater than or equal to the given element, or null." },
      "higher": { sig: "higher(E e) : E", doc: "Returns the least element in this set strictly greater than the given element." },
      "lower": { sig: "lower(E e) : E", doc: "Returns the greatest element in this set strictly less than the given element." }
    }
  },

  // Queue & Deque
  "Queue": {
    type: "interface",
    package: "java.util",
    description: "A collection designed for holding elements prior to processing. Besides basic Collection operations, queues provide additional insertion, extraction, and inspection operations.",
    methods: {
      "add": { sig: "add(E e) : boolean", doc: "Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions." },
      "offer": { sig: "offer(E e) : boolean", doc: "Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions." },
      "poll": { sig: "poll() : E", doc: "Retrieves and removes the head of this queue, or returns null if this queue is empty." },
      "peek": { sig: "peek() : E", doc: "Retrieves, but does not remove, the head of this queue, or returns null if this queue is empty." },
      "remove": { sig: "remove() : E", doc: "Retrieves and removes the head of this queue. Throws NoSuchElementException if empty." },
      "element": { sig: "element() : E", doc: "Retrieves, but does not remove, the head of this queue." },
      "size": { sig: "size() : int", doc: "Returns the number of elements in this queue." },
      "isEmpty": { sig: "isEmpty() : boolean", doc: "Returns true if this collection contains no elements." }
    }
  },
  "Deque": {
    type: "interface",
    package: "java.util",
    description: "A linear collection that supports element insertion and removal at both ends. The name deque is short for 'double ended queue'.",
    inherits: "Queue",
    methods: {
      "addFirst": { sig: "addFirst(E e) : void", doc: "Inserts the specified element at the front of this deque." },
      "addLast": { sig: "addLast(E e) : void", doc: "Inserts the specified element at the end of this deque." },
      "offerFirst": { sig: "offerFirst(E e) : boolean", doc: "Inserts the specified element at the front of this deque unless it would violate capacity restrictions." },
      "offerLast": { sig: "offerLast(E e) : boolean", doc: "Inserts the specified element at the end of this deque unless it would violate capacity restrictions." },
      "removeFirst": { sig: "removeFirst() : E", doc: "Retrieves and removes the first element of this deque." },
      "removeLast": { sig: "removeLast() : E", doc: "Retrieves and removes the last element of this deque." },
      "pollFirst": { sig: "pollFirst() : E", doc: "Retrieves and removes the first element of this deque, or returns null if this deque is empty." },
      "pollLast": { sig: "pollLast() : E", doc: "Retrieves and removes the last element of this deque, or returns null if this deque is empty." },
      "getFirst": { sig: "getFirst() : E", doc: "Retrieves, but does not remove, the first element of this deque." },
      "getLast": { sig: "getLast() : E", doc: "Retrieves, but does not remove, the last element of this deque." },
      "peekFirst": { sig: "peekFirst() : E", doc: "Retrieves, but does not remove, the first element of this deque, or returns null if this deque is empty." },
      "peekLast": { sig: "peekLast() : E", doc: "Retrieves, but does not remove, the last element of this deque, or returns null if this deque is empty." },
      "push": { sig: "push(E e) : void", doc: "Pushes an element onto the stack represented by this deque (at head)." },
      "pop": { sig: "pop() : E", doc: "Pops an element from the stack represented by this deque (from head)." }
    }
  },
  "ArrayDeque": {
    type: "class",
    package: "java.util",
    description: "Resizable-array implementation of the Deque interface. Null elements are prohibited. Faster than Stack when used as a stack, and faster than LinkedList when used as a queue.",
    inherits: "Deque"
  },
  "PriorityQueue": {
    type: "class",
    package: "java.util",
    description: "An unbounded priority queue based on a priority heap. The elements are ordered according to their natural ordering, or by a Comparator.",
    inherits: "Queue"
  },
  "Stack": {
    type: "class",
    package: "java.util",
    description: "The Stack class represents a last-in-first-out (LIFO) stack of objects.",
    inherits: "List",
    methods: {
      "push": { sig: "push(E item) : E", doc: "Pushes an item onto the top of this stack." },
      "pop": { sig: "pop() : E", doc: "Removes the object at the top of this stack and returns that object as the value of this function." },
      "peek": { sig: "peek() : E", doc: "Looks at the object at the top of this stack without removing it from the stack." },
      "empty": { sig: "empty() : boolean", doc: "Tests if this stack is empty." },
      "search": { sig: "search(Object o) : int", doc: "Returns the 1-based position where an object is on this stack." }
    }
  },

  // Utilities
  "Arrays": {
    type: "class",
    package: "java.util",
    description: "This class contains various methods for manipulating arrays (such as sorting and searching).",
    methods: {
      "sort": { sig: "sort(int[] a) : void", doc: "Sorts the specified array into ascending numerical order.", isStatic: true },
      "binarySearch": { sig: "binarySearch(int[] a, int key) : int", doc: "Searches the specified array for the specified value using the binary search algorithm.", isStatic: true },
      "equals": { sig: "equals(int[] a, int[] a2) : boolean", doc: "Returns true if the two specified arrays are equal to one another.", isStatic: true },
      "fill": { sig: "fill(int[] a, int val) : void", doc: "Assigns the specified int value to each element of the specified array of ints.", isStatic: true },
      "copyOf": { sig: "copyOf(T[] original, int newLength) : T[]", doc: "Copies the specified array, truncating or padding with nulls/zeros so the copy has the specified length.", isStatic: true },
      "copyOfRange": { sig: "copyOfRange(T[] original, int from, int to) : T[]", doc: "Copies the specified range of the specified array into a new array.", isStatic: true },
      "asList": { sig: "asList(T... a) : List<T>", doc: "Returns a fixed-size list backed by the specified array.", isStatic: true },
      "toString": { sig: "toString(int[] a) : String", doc: "Returns a string representation of the contents of the specified array.", isStatic: true },
      "deepToString": { sig: "deepToString(Object[] a) : String", doc: "Returns a string representation of the \"deep contents\" of the specified multidimensional array.", isStatic: true }
    }
  },
  "Collections": {
    type: "class",
    package: "java.util",
    description: "This class consists exclusively of static methods that operate on or return collections.",
    methods: {
      "sort": { sig: "sort(List<T> list) : void", doc: "Sorts the specified list into ascending order, according to the natural ordering of its elements.", isStatic: true },
      "reverse": { sig: "reverse(List<?> list) : void", doc: "Reverses the order of the elements in the specified list.", isStatic: true },
      "shuffle": { sig: "shuffle(List<?> list) : void", doc: "Randomly permutes the specified list using a default source of randomness.", isStatic: true },
      "swap": { sig: "swap(List<?> list, int i, int j) : void", doc: "Swaps the elements at the specified positions in the specified list.", isStatic: true },
      "min": { sig: "min(Collection<? extends T> coll) : T", doc: "Returns the minimum element of the given collection.", isStatic: true },
      "max": { sig: "max(Collection<? extends T> coll) : T", doc: "Returns the maximum element of the given collection.", isStatic: true },
      "frequency": { sig: "frequency(Collection<?> c, Object o) : int", doc: "Returns the number of elements in the specified collection equal to the specified object.", isStatic: true },
      "binarySearch": { sig: "binarySearch(List<? extends Comparable<? super T>> list, T key) : int", doc: "Searches the specified list for the specified object using the binary search algorithm.", isStatic: true },
      "emptyList": { sig: "emptyList() : List<T>", doc: "Returns an empty list (immutable).", isStatic: true },
      "emptySet": { sig: "emptySet() : Set<T>", doc: "Returns an empty set (immutable).", isStatic: true },
      "emptyMap": { sig: "emptyMap() : Map<K,V>", doc: "Returns an empty map (immutable).", isStatic: true }
    }
  },
  "Math": {
    type: "class",
    package: "java.lang",
    description: "The class Math contains methods for performing basic numeric operations such as the elementary exponential, logarithm, square root, and trigonometric functions.",
    methods: {
      "abs": { sig: "abs(int a) : int", doc: "Returns the absolute value of an int value.", isStatic: true },
      "max": { sig: "max(int a, int b) : int", doc: "Returns the greater of two int values.", isStatic: true },
      "min": { sig: "min(int a, int b) : int", doc: "Returns the smaller of two int values.", isStatic: true },
      "pow": { sig: "pow(double a, double b) : double", doc: "Returns the value of the first argument raised to the power of the second argument.", isStatic: true },
      "sqrt": { sig: "sqrt(double a) : double", doc: "Returns the correctly rounded positive square root of a double value.", isStatic: true },
      "cbrt": { sig: "cbrt(double a) : double", doc: "Returns the cube root of a double value.", isStatic: true },
      "round": { sig: "round(double a) : long", doc: "Returns the closest long to the argument.", isStatic: true },
      "floor": { sig: "floor(double a) : double", doc: "Returns the largest (closest to positive infinity) double value that is less than or equal to the argument and is an integer.", isStatic: true },
      "ceil": { sig: "ceil(double a) : double", doc: "Returns the smallest (closest to negative infinity) double value that is greater than or equal to the argument and is an integer.", isStatic: true },
      "random": { sig: "random() : double", doc: "Returns a double value with a positive sign, greater than or equal to 0.0 and less than 1.0.", isStatic: true },
      "log": { sig: "log(double a) : double", doc: "Returns the natural logarithm (base e) of a double value.", isStatic: true },
      "log10": { sig: "log10(double a) : double", doc: "Returns the base 10 logarithm of a double value.", isStatic: true }
    }
  },
  "Objects": {
    type: "class",
    package: "java.util",
    description: "This class consists of static utility methods for operating on objects, or checking certain conditions before operation.",
    methods: {
      "equals": { sig: "equals(Object a, Object b) : boolean", doc: "Returns true if the arguments are equal to each other and false otherwise.", isStatic: true },
      "hashCode": { sig: "hashCode(Object o) : int", doc: "Returns the hash code of a non-null argument and 0 for a null argument.", isStatic: true },
      "hash": { sig: "hash(Object... values) : int", doc: "Generates a hash code for a sequence of input values.", isStatic: true },
      "requireNonNull": { sig: "requireNonNull(T obj) : T", doc: "Checks that the specified object reference is not null.", isStatic: true },
      "isNull": { sig: "isNull(Object obj) : boolean", doc: "Returns true if the provided reference is null.", isStatic: true },
      "nonNull": { sig: "nonNull(Object obj) : boolean", doc: "Returns true if the provided reference is non-null.", isStatic: true }
    }
  },
  "System": {
    type: "class",
    package: "java.lang",
    description: "The System class contains several useful class fields and methods.",
    methods: {
      "arraycopy": { sig: "arraycopy(Object src, int srcPos, Object dest, int destPos, int length) : void", doc: "Copies an array from the specified source array, beginning at the specified position, to the specified position of the destination array.", isStatic: true },
      "currentTimeMillis": { sig: "currentTimeMillis() : long", doc: "Returns the current time in milliseconds.", isStatic: true },
      "nanoTime": { sig: "nanoTime() : long", doc: "Returns the current value of the running Java Virtual Machine's high-resolution time source, in nanoseconds.", isStatic: true }
    },
    fields: {
      "out": { sig: "out : PrintStream", doc: "The 'standard' output stream." },
      "err": { sig: "err : PrintStream", doc: "The 'standard' error output stream." },
      "in": { sig: "in : InputStream", doc: "The 'standard' input stream." }
    }
  },
  "PrintStream": {
    type: "class",
    package: "java.io",
    description: "A PrintStream adds functionality to another output stream, namely the ability to print representations of various data values conveniently.",
    methods: {
      "println": { sig: "println(Object x) : void", doc: "Prints an Object and then terminates the line." },
      "print": { sig: "print(Object x) : void", doc: "Prints an object." },
      "printf": { sig: "printf(String format, Object... args) : PrintStream", doc: "A convenience method to write a formatted string to this output stream." }
    }
  },

  // LeetCode Data Structures
  "ListNode": {
    type: "class",
    package: "leetcode",
    description: "Definition for singly-linked list in LeetCode problems.",
    fields: {
      "val": { sig: "int val", doc: "The value stored in this list node." },
      "next": { sig: "ListNode next", doc: "Reference to the next node in the list." }
    },
    methods: {
      "ListNode": { sig: "ListNode(int val)", doc: "Constructor initializing value." }
    }
  },
  "TreeNode": {
    type: "class",
    package: "leetcode",
    description: "Definition for a binary tree node in LeetCode problems.",
    fields: {
      "val": { sig: "int val", doc: "The value stored in this tree node." },
      "left": { sig: "TreeNode left", doc: "Reference to the left child node." },
      "right": { sig: "TreeNode right", doc: "Reference to the right child node." }
    },
    methods: {
      "TreeNode": { sig: "TreeNode(int val)", doc: "Constructor initializing value." }
    }
  },
  "Node": {
    type: "class",
    package: "leetcode",
    description: "Definition for a general graph/tree node in LeetCode problems.",
    fields: {
      "val": { sig: "int val", doc: "The value stored in this node." },
      "neighbors": { sig: "List<Node> neighbors", doc: "List of neighbor nodes for graph problems." },
      "children": { sig: "List<Node> children", doc: "List of children nodes for N-ary tree problems." },
      "next": { sig: "Node next", doc: "Reference to next right pointer." },
      "random": { sig: "Node random", doc: "Reference to random pointer in copy list problems." }
    }
  },
  "Array": {
    type: "array",
    description: "Java array type.",
    fields: {
      "length": { sig: "int length", doc: "The constant length of this array." }
    },
    methods: {
      "clone": { sig: "clone() : Object", doc: "Creates and returns a copy of this array." }
    }
  }
};
