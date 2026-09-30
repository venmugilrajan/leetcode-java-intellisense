import test from 'node:test';
import assert from 'node:assert/strict';
import { JavaProvider } from '../src/languages/java/JavaProvider.js';
import { JavaParser } from '../src/autocomplete/parser.js';

const provider = new JavaProvider();

test('TEST 1: HashMap<Integer,Integer> map = new HashMap<>(); map.', () => {
  const code = `
class Solution {
    public void solve() {
        HashMap<Integer, Integer> map = new HashMap<>();
        map.
    }
}
  `;
  const offset = code.indexOf('map.') + 4;
  const completions = provider.provideCompletions(code, offset);
  const labels = completions.map(c => c.label);

  assert.ok(labels.includes('get'), 'Should include get()');
  assert.ok(labels.includes('put'), 'Should include put()');
  assert.ok(labels.includes('remove'), 'Should include remove()');
  assert.ok(labels.includes('containsKey'), 'Should include containsKey()');
  assert.ok(labels.includes('containsValue'), 'Should include containsValue()');
  assert.ok(labels.includes('size'), 'Should include size()');
  assert.ok(labels.includes('isEmpty'), 'Should include isEmpty()');
  assert.ok(labels.includes('clear'), 'Should include clear()');
});

test('TEST 2: ArrayList<Integer> list = new ArrayList<>(); list.', () => {
  const code = `
class Solution {
    public void solve() {
        ArrayList<Integer> list = new ArrayList<>();
        list.
    }
}
  `;
  const offset = code.indexOf('list.') + 5;
  const completions = provider.provideCompletions(code, offset);
  const labels = completions.map(c => c.label);

  assert.ok(labels.includes('add'), 'Should include add()');
  assert.ok(labels.includes('get'), 'Should include get()');
  assert.ok(labels.includes('set'), 'Should include set()');
  assert.ok(labels.includes('remove'), 'Should include remove()');
  assert.ok(labels.includes('contains'), 'Should include contains()');
  assert.ok(labels.includes('size'), 'Should include size()');
  assert.ok(labels.includes('isEmpty'), 'Should include isEmpty()');
  assert.ok(labels.includes('clear'), 'Should include clear()');
});

test('TEST 3: String s = "hello"; s.', () => {
  const code = `
class Solution {
    public void solve() {
        String s = "hello";
        s.
    }
}
  `;
  const offset = code.indexOf('s.') + 2;
  const completions = provider.provideCompletions(code, offset);
  const labels = completions.map(c => c.label);

  assert.ok(labels.includes('length'), 'Should include length()');
  assert.ok(labels.includes('charAt'), 'Should include charAt()');
  assert.ok(labels.includes('substring'), 'Should include substring()');
  assert.ok(labels.includes('contains'), 'Should include contains()');
  assert.ok(labels.includes('equals'), 'Should include equals()');
  assert.ok(labels.includes('equalsIgnoreCase'), 'Should include equalsIgnoreCase()');
  assert.ok(labels.includes('indexOf'), 'Should include indexOf()');
  assert.ok(labels.includes('toLowerCase'), 'Should include toLowerCase()');
  assert.ok(labels.includes('toUpperCase'), 'Should include toUpperCase()');
  assert.ok(labels.includes('trim'), 'Should include trim()');
});

test('TEST 4: StringBuilder sb = new StringBuilder(); sb.', () => {
  const code = `
class Solution {
    public void solve() {
        StringBuilder sb = new StringBuilder();
        sb.
    }
}
  `;
  const offset = code.indexOf('sb.') + 3;
  const completions = provider.provideCompletions(code, offset);
  const labels = completions.map(c => c.label);

  assert.ok(labels.includes('append'), 'Should include append()');
  assert.ok(labels.includes('insert'), 'Should include insert()');
  assert.ok(labels.includes('delete'), 'Should include delete()');
  assert.ok(labels.includes('deleteCharAt'), 'Should include deleteCharAt()');
  assert.ok(labels.includes('reverse'), 'Should include reverse()');
  assert.ok(labels.includes('toString'), 'Should include toString()');
});

test('TEST 5: Arrays. static methods', () => {
  const code = `
class Solution {
    public void solve() {
        Arrays.
    }
}
  `;
  const offset = code.indexOf('Arrays.') + 7;
  const completions = provider.provideCompletions(code, offset);
  const labels = completions.map(c => c.label);

  assert.ok(labels.includes('sort'), 'Should include sort()');
  assert.ok(labels.includes('binarySearch'), 'Should include binarySearch()');
  assert.ok(labels.includes('copyOf'), 'Should include copyOf()');
  assert.ok(labels.includes('copyOfRange'), 'Should include copyOfRange()');
  assert.ok(labels.includes('fill'), 'Should include fill()');
  assert.ok(labels.includes('equals'), 'Should include equals()');
  assert.ok(labels.includes('toString'), 'Should include toString()');
});

test('TEST 6: Math. static methods', () => {
  const code = `
class Solution {
    public void solve() {
        Math.
    }
}
  `;
  const offset = code.indexOf('Math.') + 5;
  const completions = provider.provideCompletions(code, offset);
  const labels = completions.map(c => c.label);

  assert.ok(labels.includes('abs'), 'Should include abs()');
  assert.ok(labels.includes('max'), 'Should include max()');
  assert.ok(labels.includes('min'), 'Should include min()');
  assert.ok(labels.includes('pow'), 'Should include pow()');
  assert.ok(labels.includes('sqrt'), 'Should include sqrt()');
  assert.ok(labels.includes('round'), 'Should include round()');
});

test('TEST 7: int[] nums; Arrays. and nums.length', () => {
  const code = `
class Solution {
    public int[] twoSum(int[] nums, int target) {
        nums.
    }
}
  `;
  const offset = code.indexOf('nums.') + 5;
  const completions = provider.provideCompletions(code, offset);
  const labels = completions.map(c => c.label);

  assert.ok(labels.includes('length'), 'Array should have length field');
});

test('TEST 8: // map. inside comments -> no autocomplete', () => {
  const code = `
class Solution {
    public void solve() {
        HashMap<Integer, Integer> map = new HashMap<>();
        // map.
    }
}
  `;
  const offset = code.indexOf('// map.') + 7;
  const completions = provider.provideCompletions(code, offset);
  assert.equal(completions.length, 0, 'No completions inside comment');
});

test('TEST 9: String s = "map."; inside string -> no HashMap autocomplete', () => {
  const code = `
class Solution {
    public void solve() {
        HashMap<Integer, Integer> map = new HashMap<>();
        String s = "map.";
    }
}
  `;
  const offset = code.indexOf('"map."') + 5; // inside string right after dot
  const completions = provider.provideCompletions(code, offset);
  assert.equal(completions.length, 0, 'No completions inside string literal');
});

test('TEST 10: ListNode node; node. -> val, next', () => {
  const code = `
class Solution {
    public void solve() {
        ListNode node = new ListNode(1);
        node.
    }
}
  `;
  const offset = code.indexOf('node.') + 5;
  const completions = provider.provideCompletions(code, offset);
  const labels = completions.map(c => c.label);

  assert.ok(labels.includes('val'), 'Should include val');
  assert.ok(labels.includes('next'), 'Should include next');
});

test('SNIPPET TEST: sout -> System.out.println()', () => {
  const code = `
class Solution {
    public void solve() {
        sout
    }
}
  `;
  const offset = code.indexOf('sout') + 4;
  const completions = provider.provideCompletions(code, offset);
  const soutSnippet = completions.find(c => c.label === 'sout');

  assert.ok(soutSnippet, 'sout snippet found');
  assert.equal(soutSnippet.detail, 'Snippet: System.out.println()');
  assert.equal(soutSnippet.insertText, 'System.out.println($0);');
});

test('SNIPPET TEST: ArrayList -> full syntax snippets', () => {
  const code = `
class Solution {
    public void solve() {
        ArrayL
    }
}
  `;
  const offset = code.indexOf('ArrayL') + 6;
  const completions = provider.provideCompletions(code, offset);
  const arrayListCompletions = completions.filter(c => c.label.includes('ArrayList'));

  assert.ok(arrayListCompletions.length > 0, 'Found ArrayList completions');
  const fullSyntaxSnippet = arrayListCompletions.find(c => c.label.includes('List<Integer> list = new ArrayList<>();'));
  assert.ok(fullSyntaxSnippet, 'Found full syntax List<Integer> list = new ArrayList<>(); snippet');
  
  // Verify default placeholder resolution matches the behavior in content.js
  const resolved = fullSyntaxSnippet.insertText
    .replace(/\$\{[0-9]+:([^}]*)\}/g, '$1')
    .replace(/\$[0-9]+/g, '');
  assert.equal(resolved, 'List<Integer> list = new ArrayList<>();');
});

test('SNIPPET TEST: foreach -> resolves placeholders without empty holes', () => {
  const code = `
class Solution {
    public void solve() {
        fore
    }
}
  `;
  const offset = code.indexOf('fore') + 4;
  const completions = provider.provideCompletions(code, offset);
  const foreachSnippet = completions.find(c => c.label === 'foreach');

  assert.ok(foreachSnippet, 'Found foreach snippet');
  const resolved = foreachSnippet.insertText
    .replace(/\$\{[0-9]+:([^}]*)\}/g, '$1')
    .replace(/\$[0-9]+/g, '');
  assert.ok(resolved.includes('for (int x : nums)'), 'Foreach correctly retains default types and variables');
});

