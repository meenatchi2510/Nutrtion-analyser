// ═══════════════════════════════════════════════════════
//  recognizer.js  –  AI Food Recognition Simulation
// ═══════════════════════════════════════════════════════
const Recognizer = (() => {
  // ── Hash a string to a stable number ─────────────────
  function hashString(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
    }
    return Math.abs(hash);
  }
  // ── Extract candidate keywords from filename ──────────
  function extractKeywords(filename) {
    return filename
      .toLowerCase()
      .replace(/\.[^.]+$/, '')          // strip extension
      .replace(/[_\-\s]+/g, ' ')        // normalize separators
      .split(' ')
      .filter(w => w.length > 2);
  }
  // ── Score how well a food matches keyword list ────────
  function scoreFood(food, keywords) {
    let score = 0;
    for (const kw of keywords) {
      for (const fk of food.keywords) {
        if (fk.includes(kw) || kw.includes(fk)) score += 3;
        else if (fk.startsWith(kw) || kw.startsWith(fk)) score += 1;
      }
      if (food.name.toLowerCase().includes(kw)) score += 2;
      if (food.category.toLowerCase().includes(kw)) score += 1;
    }
    return score;
  }
  // ── Pick N deterministic "fallback" foods from DB ─────
  function deterministicPick(hash, count, excluded = []) {
    const pool = FOOD_DATABASE.filter(f => !excluded.includes(f.id));
    const result = [];
    let h = hash;
    for (let i = 0; i < count && pool.length; i++) {
      h = ((h * 1664525 + 1013904223) >>> 0);
      const idx = h % pool.length;
      result.push(pool.splice(idx, 1)[0]);
    }
    return result;
  }
  // ── Generate realistic confidence score ───────────────
  function confidence(baseScore, hash, index) {
    const seed = (hash + index * 37) % 100;
    const base = baseScore > 0 ? Math.min(98, 76 + baseScore * 3) : 68;
    const jitter = (seed % 11) - 5;           // ±5 %
    return Math.max(60, Math.min(98, base + jitter));
  }
  // ── Main recognition function ─────────────────────────
  /**
   * Analyze an image File object and return detected food results.
   * @param {File} file
   * @returns {Promise<Array<{food, confidence, portion}>>}
   */
  async function analyze(file) {
    // Simulate AI processing delay (400-900 ms)
    await new Promise(r => setTimeout(r, 400 + Math.random() * 500));
    const hash = hashString(file.name + file.size + file.type);
    const keywords = extractKeywords(file.name);
    // Score all foods
    const scored = FOOD_DATABASE
      .map(food => ({ food, score: scoreFood(food, keywords) }))
      .sort((a, b) => b.score - a.score);
    const results = [];
    // Top keyword-matched food (if score > 0)
    if (scored[0].score > 0) {
      results.push({
        food: scored[0].food,
        confidence: confidence(scored[0].score, hash, 0),
        portion: scored[0].food.defaultPortion,
      });
      // Possibly add second match
      if (scored[1].score > 0 && scored[1].food.id !== scored[0].food.id) {
        results.push({
          food: scored[1].food,
          confidence: confidence(scored[1].score, hash, 1),
          portion: scored[1].food.defaultPortion,
        });
      }
    }
    // Determine how many to show (1-3)
    const totalCount = 1 + (hash % 2); // 1 or 2 detected foods
    const needed = totalCount - results.length;
    if (needed > 0) {
      const existingIds = results.map(r => r.food.id);
      const extras = deterministicPick(hash, needed, existingIds);
      extras.forEach((food, i) => {
        results.push({
          food,
          confidence: confidence(0, hash, results.length + i),
          portion: food.defaultPortion,
        });
      });
    }
    // Sort by confidence descending
    results.sort((a, b) => b.confidence - a.confidence);
    return results;
  }
  // ── Demo mode: return random popular meal ─────────────
  async function demo() {
    await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
    const popularIds = ['f001', 'f008', 'f034', 'f049', 'f027', 'f009', 'f019', 'f055'];
    const shuffled = popularIds.sort(() => Math.random() - 0.5);
    const count = 1 + Math.floor(Math.random() * 2);
    const results = [];
    for (let i = 0; i < count; i++) {
      const food = getFoodById(shuffled[i]);
      if (food) {
        results.push({
          food,
          confidence: Math.floor(75 + Math.random() * 22),
          portion: food.defaultPortion,
        });
      }
    }
    return results.sort((a, b) => b.confidence - a.confidence);
  }
  return { analyze, demo };
})();
