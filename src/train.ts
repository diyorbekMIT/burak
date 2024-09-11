function firstUniqueCharIndex(s: string): number {
  const charCount: Map<string, number> = new Map();

  for (const char of s) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }
  for (let i = 0; i < s.length; i++) {
    if (charCount.get(s[i]) === 1) {
      return i;
    }
  }
  return -1;
}
console.log(firstUniqueCharIndex("stamp")); 
