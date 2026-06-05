// ═══════════════════════════════════════════════════════
//  tracker.js  –  Daily Intake State Manager
// ═══════════════════════════════════════════════════════
const Tracker = (() => {
  // ── State ─────────────────────────────────────────────
  let _log    = [];       // Array of log entries
  let _totals = _zeroTotals();
  function _zeroTotals() {
    return { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 };
  }
  // ── Compute totals from log ───────────────────────────
  function _recompute() {
    _totals = _zeroTotals();
    for (const entry of _log) {
      for (const key of Object.keys(_totals)) {
        _totals[key] = +(_totals[key] + entry.nutrition[key]).toFixed(1);
      }
    }
  }
  // ── Dispatch custom event ─────────────────────────────
  function _emit() {
    window.dispatchEvent(new CustomEvent('intakeUpdated', {
      detail: { log: [..._log], totals: { ..._totals } }
    }));
  }
  // ── Add a meal entry ──────────────────────────────────
  function addEntry(food, portion, nutrition) {
    const now = new Date();
    const entry = {
      id:        `e_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      food,
      portion,
      nutrition: { ...nutrition },
      timestamp: now,
      timeLabel: _formatTime(now),
      mealType:  _getMealType(now.getHours()),
    };
    _log.push(entry);
    _recompute();
    _emit();
    return entry;
  }
  // ── Remove a log entry ────────────────────────────────
  function removeEntry(id) {
    _log = _log.filter(e => e.id !== id);
    _recompute();
    _emit();
  }
  // ── Clear all ─────────────────────────────────────────
  function clear() {
    _log    = [];
    _totals = _zeroTotals();
    _emit();
  }
  // ── Getters ───────────────────────────────────────────
  function getTotals()  { return { ..._totals }; }
  function getLog()     { return [..._log];       }
  function getCount()   { return _log.length;     }
  // ── % of RDV per nutrient ─────────────────────────────
  function getPercentages() {
    const pct = {};
    for (const [key, rdv] of Object.entries(RECOMMENDED_DAILY)) {
      pct[key] = Math.min(120, Math.round((_totals[key] / rdv) * 100));
    }
    return pct;
  }
  // ── Remaining budget ─────────────────────────────────
  function getRemaining() {
    const rem = {};
    for (const [key, rdv] of Object.entries(RECOMMENDED_DAILY)) {
      rem[key] = Math.max(0, +(rdv - _totals[key]).toFixed(1));
    }
    return rem;
  }
  // ── Status per nutrient: ok | low | over ─────────────
  function getNutrientStatus() {
    const pct = getPercentages();
    const status = {};
    for (const key of Object.keys(RECOMMENDED_DAILY)) {
      if (pct[key] < 40)       status[key] = 'low';
      else if (pct[key] > 100) status[key] = 'over';
      else                      status[key] = 'ok';
    }
    return status;
  }
  // ── Time helpers ──────────────────────────────────────
  function _formatTime(date) {
    let h = date.getHours(), m = date.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${m.toString().padStart(2, '0')} ${ampm}`;
  }
  function _getMealType(hour) {
    if (hour < 11)  return 'Breakfast';
    if (hour < 14)  return 'Lunch';
    if (hour < 17)  return 'Snack';
    if (hour < 21)  return 'Dinner';
    return 'Late Night';
  }
  // ── Current meal type (time-based) ───────────────────
  function getCurrentMealType() {
    return _getMealType(new Date().getHours());
  }
  return {
    addEntry, removeEntry, clear,
    getTotals, getLog, getCount,
    getPercentages, getRemaining, getNutrientStatus,
    getCurrentMealType,
  };
})();
