// ═══════════════════════════════════════════════════════
//  recommender.js  –  Smart Meal Recommendation Engine
// ═══════════════════════════════════════════════════════
const Recommender = (() => {
  // ── Calorie categories ────────────────────────────────
  const calBand = cal =>
    cal < 100 ? 'very-low' :
    cal < 250 ? 'low' :
    cal < 450 ? 'medium' : 'high';
  // ── Score a food against nutrient gaps ───────────────
  function scoreFood(food, portion, gaps, over) {
    const nutr = scaledNutrition(food, portion);
    let score = 0;
    // Bonus for filling low nutrients
    if (gaps.protein > 15 && nutr.protein > 10)  score += 30;
    if (gaps.fiber   > 8  && nutr.fiber   > 3)   score += 20;
    if (gaps.protein > 8  && nutr.protein > 5)   score += 15;
    if (gaps.fiber   > 4  && nutr.fiber   > 1.5) score += 10;
    // Penalty for over-consumed nutrients
    if (over.calories && nutr.calories > 400) score -= 25;
    if (over.fat      && nutr.fat      > 15)  score -= 20;
    if (over.carbs    && nutr.carbs    > 40)  score -= 15;
    if (over.sugar    && nutr.sugar    > 15)  score -= 20;
    // Light bonus for calorie-light options when over calories
    if (over.calories) {
      const band = calBand(nutr.calories);
      if (band === 'very-low') score += 20;
      if (band === 'low')      score += 10;
    }
    // Bonus for protein when protein is low
    const proteinRatio = nutr.protein / Math.max(1, nutr.calories) * 100;
    if (gaps.protein > 10 && proteinRatio > 5) score += 12;
    // Variety nudge – slight random shuffle (±5)
    score += (Math.random() * 10 - 5);
    return { food, portion, nutr, score };
  }
  // ── Build human-readable rationale ────────────────────
  function buildRationale(nutr, gaps, over) {
    const parts = [];
    if (over.calories) parts.push('low-calorie choice');
    if (over.fat)      parts.push('low in unhealthy fats');
    if (over.sugar)    parts.push('low-sugar option');
    if (over.carbs)    parts.push('reduced carbohydrates');
    if (gaps.protein > 10) parts.push(`adds ${nutr.protein}g protein`);
    if (gaps.fiber   > 5)  parts.push(`adds ${nutr.fiber}g fiber`);
    if (gaps.calories > 200 && !over.calories) parts.push(`provides ${nutr.calories} kcal energy`);
    if (parts.length === 0) parts.push('well-balanced option');
    const joined = parts.slice(0, 3).join(', ');
    return joined.charAt(0).toUpperCase() + joined.slice(1) + '.';
  }
  // ── Main recommendation function ──────────────────────
  /**
   * @param {number} count – how many recommendations to return
   * @returns {Array<{food, portion, nutr, rationale, tag}>}
   */
  function recommend(count = 4) {
    const totals  = Tracker.getTotals();
    const status  = Tracker.getNutrientStatus();
    const remaining = Tracker.getRemaining();
    // Identify deficits and over-consumption
    const gaps = {};
    const over = {};
    for (const key of Object.keys(RECOMMENDED_DAILY)) {
      const pct = (totals[key] / RECOMMENDED_DAILY[key]) * 100;
      if (pct < 50) gaps[key] = RECOMMENDED_DAILY[key] - totals[key];
      if (pct > 100) over[key] = true;
    }
    // Current meal type for context
    const mealType = Tracker.getCurrentMealType();
    // Filter food pool based on context
    let pool = [...FOOD_DATABASE];
    // If calories are over, exclude high-calorie categories
    if (over.calories) {
      pool = pool.filter(f => f.calories * (f.defaultPortion / 100) < 350);
    }
    // Prefer categories matching meal time
    const categoryBoost = {
      Breakfast: ['Breakfast', 'Fruits', 'Dairy', 'Beverages'],
      Lunch:     ['Grains', 'Protein', 'Meals', 'Vegetables'],
      Snack:     ['Fruits', 'Snacks', 'Dairy'],
      Dinner:    ['Protein', 'Vegetables', 'Grains', 'Meals'],
      'Late Night': ['Fruits', 'Dairy', 'Vegetables'],
    }[mealType] || [];
    // Score all foods
    const scored = pool.map(food => {
      const portion = food.defaultPortion;
      const result = scoreFood(food, portion, gaps, over);
      // Category time-of-day boost
      if (categoryBoost.includes(food.category)) result.score += 8;
      return result;
    });
    // Sort and deduplicate categories (variety)
    scored.sort((a, b) => b.score - a.score);
    const seen = new Set();
    const final = [];
    for (const item of scored) {
      if (final.length >= count) break;
      // At most 2 per category for variety
      const catCount = final.filter(i => i.food.category === item.food.category).length;
      if (catCount >= 2) continue;
      seen.add(item.food.id);
      final.push({
        food:      item.food,
        portion:   item.portion,
        nutr:      item.nutr,
        rationale: buildRationale(item.nutr, gaps, over),
        tag:       _getTag(item.food, over, gaps, mealType),
      });
    }
    return final;
  }
  // ── Assign a badge tag ────────────────────────────────
  function _getTag(food, over, gaps, mealType) {
    if (over.calories && food.calories * (food.defaultPortion / 100) < 150) return '🔥 Low Cal';
    if (gaps.protein && food.protein > 15) return '💪 High Protein';
    if (gaps.fiber   && food.fiber   > 4)  return '🌿 High Fiber';
    if (over.fat     && food.fat     < 3)  return '✅ Low Fat';
    if (over.sugar   && food.sugar   < 2)  return '🍬 Low Sugar';
    if (mealType === 'Breakfast' && food.category === 'Breakfast') return '🌅 Perfect Breakfast';
    if (mealType === 'Snack'     && food.category === 'Fruits')    return '🍎 Healthy Snack';
    return '⭐ Recommended';
  }
  // ── Insight summary string ────────────────────────────
  function getInsight() {
    const totals  = Tracker.getTotals();
    const status  = Tracker.getNutrientStatus();
    const count   = Tracker.getCount();
    if (count === 0) {
      return "Log your first meal to get personalized recommendations!";
    }
    const overList  = Object.entries(status).filter(([, s]) => s === 'over').map(([k]) => NUTRIENT_META[k]?.label);
    const lowList   = Object.entries(status).filter(([k, s]) => s === 'low' && k !== 'calories').map(([k]) => NUTRIENT_META[k]?.label);
    if (overList.length > 0) {
      return `You've exceeded your daily ${overList.join(' & ')} target. The recommendations below help balance your intake.`;
    }
    const pctCal = Math.round((totals.calories / RECOMMENDED_DAILY.calories) * 100);
    if (pctCal > 75) {
      return `You're at ${pctCal}% of your daily calorie goal. Choosing lighter options now will keep you on track.`;
    }
    return `Great progress! You're at ${pctCal}% of your daily calorie goal. Keep up the balanced eating!`;
  }
  return { recommend, getInsight };
})();
