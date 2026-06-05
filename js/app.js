// ═══════════════════════════════════════════════════════
//  app.js  –  Main Application Controller
// ═══════════════════════════════════════════════════════
(function () {
  'use strict';
  // ── State ─────────────────────────────────────────────
  let currentResults = [];   // Last recognition results
  let selectedResult = null; // Result chosen by user
  // ── DOM refs (populated on DOMContentLoaded) ──────────
  let dom = {};
  // ══════════════════════════════════════════════════════
  //  Boot
  // ══════════════════════════════════════════════════════
  document.addEventListener('DOMContentLoaded', () => {
    cacheDom();
    bindEvents();
    updateDashboard();
    updateRecommendations();
    setTheme('dark');
    animateHeroStats();
    // Listen for tracker updates
    window.addEventListener('intakeUpdated', () => {
      updateDashboard();
      updateRecommendations();
      updateLogList();
      updateNavPill();
    });
    // Initial nav pill
    updateNavPill();
  });
  // ── Cache DOM ─────────────────────────────────────────
  function cacheDom() {
    dom = {
      // Upload
      dropZone:      q('#drop-zone'),
      fileInput:     q('#file-input'),
      uploadBtn:     q('#upload-btn'),
      demoBtn:       q('#demo-btn'),
      imagePreview:  q('#image-preview'),
      previewImg:    q('#preview-img'),
      // Scanner
      scannerSection: q('#scanner-section'),
      scannerLoader:  q('#scanner-loader'),
      resultsSection: q('#results-section'),
      resultCards:    q('#result-cards'),
      // Dashboard
      dashSection:    q('#dashboard-section'),
      donutSvg:       q('#donut-svg'),
      donutCenter:    q('#donut-center'),
      gaugeSvg:       q('#gauge-svg'),
      gaugePct:       q('#gauge-pct'),
      barsContainer:  q('#nutrient-bars'),
      macroRatioEl:   q('#macro-ratio'),
      // Log
      logSection:    q('#log-section'),
      logList:       q('#log-list'),
      logEmpty:      q('#log-empty'),
      clearLogBtn:   q('#clear-log-btn'),
      mealTypeLabel: q('#meal-type-label'),
      // Recommendations
      recSection:    q('#rec-section'),
      recInsight:    q('#rec-insight'),
      recGrid:       q('#rec-grid'),
      // Nav
      navPill:       q('#nav-pill'),
      menuScanBtn:   q('#menu-scan'),
      menuDashBtn:   q('#menu-dash'),
      menuLogBtn:    q('#menu-log'),
      menuRecBtn:    q('#menu-rec'),
      // Theme
      themeToggle:   q('#theme-toggle'),
    };
  }
  function q(sel) { return document.querySelector(sel); }
  function qa(sel) { return document.querySelectorAll(sel); }
  // ══════════════════════════════════════════════════════
  //  Events
  // ══════════════════════════════════════════════════════
  function bindEvents() {
    // File upload — label handles opening the picker natively
    // Clicking the drop zone background also triggers the picker
    dom.dropZone.addEventListener('click', e => {
      // If click came from the label/button directly, let it propagate naturally
      if (e.target === dom.uploadBtn || e.target.closest('label')) return;
      dom.fileInput.click();
    });
    dom.fileInput.addEventListener('change', e => {
      if (e.target.files.length) handleFile(e.target.files[0]);
    });
    // Drag & drop
    dom.dropZone.addEventListener('dragover', e => {
      e.preventDefault();
      dom.dropZone.classList.add('drag-over');
    });
    dom.dropZone.addEventListener('dragleave', () => dom.dropZone.classList.remove('drag-over'));
    dom.dropZone.addEventListener('drop', e => {
      e.preventDefault();
      dom.dropZone.classList.remove('drag-over');
      const f = e.dataTransfer.files[0];
      if (f && f.type.startsWith('image/')) handleFile(f);
    });
    // Demo button
    dom.demoBtn.addEventListener('click', runDemo);
    // Log clear
    dom.clearLogBtn.addEventListener('click', () => {
      Tracker.clear();
      dom.logList.innerHTML = '';
    });
    // Theme toggle
    dom.themeToggle.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme');
      setTheme(cur === 'dark' ? 'light' : 'dark');
    });
    // Smooth scroll nav
    [
      ['#menu-scan', '#upload-section'],
      ['#menu-dash', '#dashboard-section'],
      ['#menu-log',  '#log-section'],
      ['#menu-rec',  '#rec-section'],
    ].forEach(([btnSel, targetSel]) => {
      const btn = q(btnSel);
      if (btn) btn.addEventListener('click', () => {
        q(targetSel)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    // CTA hero button
    q('#hero-cta')?.addEventListener('click', () => {
      q('#upload-section')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
  // ══════════════════════════════════════════════════════
  //  File Handling & Recognition
  // ══════════════════════════════════════════════════════
  async function handleFile(file) {
    showImagePreview(file);
    showScanner(true);
    clearResults();
    try {
      currentResults = await Recognizer.analyze(file);
      showResults(currentResults);
    } catch (err) {
      console.error('Recognition error', err);
      showError('Recognition failed. Please try again.');
    } finally {
      showScanner(false);
    }
  }
  async function runDemo() {
    showImagePreview(null);
    showScanner(true);
    clearResults();
    dom.dashSection.scrollIntoView({ behavior: 'smooth' });
    try {
      currentResults = await Recognizer.demo();
      showResults(currentResults);
      // Auto-scroll to results
      setTimeout(() => dom.resultsSection.scrollIntoView({ behavior: 'smooth' }), 200);
    } catch (err) {
      console.error('Demo error', err);
    } finally {
      showScanner(false);
    }
  }
  function showImagePreview(file) {
    if (!file) {
      dom.imagePreview.style.display = 'none';
      return;
    }
    const url = URL.createObjectURL(file);
    dom.previewImg.src = url;
    dom.imagePreview.style.display = 'block';
    dom.previewImg.onload = () => URL.revokeObjectURL(url);
  }
  function showScanner(active) {
    dom.scannerSection.style.display = active ? 'flex' : 'none';
  }
  function clearResults() {
    dom.resultsSection.style.display = 'none';
    dom.resultCards.innerHTML = '';
    currentResults = [];
  }
  // ══════════════════════════════════════════════════════
  //  Result Cards
  // ══════════════════════════════════════════════════════
  function showResults(results) {
    dom.resultCards.innerHTML = '';
    if (!results || results.length === 0) {
      showError('No food items detected. Try a clearer image.');
      return;
    }
    results.forEach((result, idx) => {
      const card = buildResultCard(result, idx);
      dom.resultCards.appendChild(card);
      // Stagger entrance
      requestAnimationFrame(() => {
        setTimeout(() => card.classList.add('visible'), idx * 120);
      });
    });
    dom.resultsSection.style.display = 'block';
  }
  function buildResultCard(result, idx) {
    const { food, confidence, portion: initPortion } = result;
    const nutr = scaledNutrition(food, initPortion);
    const cardId = `card-${food.id}-${idx}`;
    const card = document.createElement('div');
    card.className = 'result-card fade-up';
    card.dataset.idx = idx;
    card.innerHTML = `
      <div class="rc-header">
        <span class="rc-emoji">${food.emoji}</span>
        <div class="rc-title">
          <h3>${food.name}</h3>
          <span class="rc-category">${food.category}</span>
        </div>
        <div class="rc-confidence">
          <div class="conf-ring">
            <span class="conf-val">${confidence}%</span>
          </div>
          <span class="conf-label">Match</span>
        </div>
      </div>
      <div class="rc-macros">
        <div class="rc-macro cal"><span class="macro-val" id="${cardId}-cal">${nutr.calories}</span><span>kcal</span></div>
        <div class="rc-macro pro"><span class="macro-val" id="${cardId}-pro">${nutr.protein}g</span><span>Protein</span></div>
        <div class="rc-macro crb"><span class="macro-val" id="${cardId}-crb">${nutr.carbs}g</span><span>Carbs</span></div>
        <div class="rc-macro fat"><span class="macro-val" id="${cardId}-fat">${nutr.fat}g</span><span>Fat</span></div>
      </div>
      <div class="rc-portion">
        <label for="${cardId}-portion">Portion Size</label>
        <select id="${cardId}-portion" class="portion-select">
          ${food.portionOptions.map(opt => `
            <option value="${opt.value}" ${opt.value === initPortion ? 'selected' : ''}>
              ${opt.label}
            </option>
          `).join('')}
        </select>
      </div>
      <button class="btn-add-log" data-idx="${idx}" data-cardid="${cardId}">
        ＋ Add to Daily Log
      </button>
    `;
    // Portion change → update macro display
    const portionSel = card.querySelector(`#${cardId}-portion`);
    portionSel.addEventListener('change', () => {
      const p = +portionSel.value;
      currentResults[idx].portion = p;
      const n = scaledNutrition(food, p);
      card.querySelector(`#${cardId}-cal`).textContent = n.calories;
      card.querySelector(`#${cardId}-pro`).textContent = n.protein + 'g';
      card.querySelector(`#${cardId}-crb`).textContent = n.carbs + 'g';
      card.querySelector(`#${cardId}-fat`).textContent = n.fat + 'g';
    });
    // Add to log
    card.querySelector('.btn-add-log').addEventListener('click', function () {
      const p    = +portionSel.value;
      const n    = scaledNutrition(food, p);
      Tracker.addEntry(food, p, n);
      // Visual feedback
      this.textContent = '✓ Added!';
      this.classList.add('added');
      card.classList.add('logged');
      setTimeout(() => {
        this.textContent = '＋ Add to Daily Log';
        this.classList.remove('added');
      }, 2000);
      // Scroll to dashboard
      setTimeout(() => dom.dashSection.scrollIntoView({ behavior: 'smooth' }), 600);
    });
    return card;
  }
  function showError(msg) {
    dom.resultCards.innerHTML = `<p class="error-msg">⚠ ${msg}</p>`;
    dom.resultsSection.style.display = 'block';
  }
  // ══════════════════════════════════════════════════════
  //  Dashboard
  // ══════════════════════════════════════════════════════
  function updateDashboard() {
    const totals = Tracker.getTotals();
    const pcts   = Tracker.getPercentages();
    // Donut chart (protein/carbs/fat calories)
    const segments = [
      { value: totals.protein * 4,  color: '#10b981', label: 'Protein' },
      { value: totals.carbs   * 4,  color: '#6366f1', label: 'Carbs'   },
      { value: totals.fat     * 9,  color: '#ec4899', label: 'Fat'      },
    ];
    Charts.renderDonut(dom.donutSvg, segments);
    dom.donutCenter.innerHTML = `<span class="donut-cal">${Math.round(totals.calories)}</span><span class="donut-lbl">kcal</span>`;
    // Gauge
    Charts.renderGauge(dom.gaugeSvg, totals.calories, RECOMMENDED_DAILY.calories);
    const calPct = Math.round((totals.calories / RECOMMENDED_DAILY.calories) * 100);
    dom.gaugePct.textContent = `${calPct}% Daily Goal`;
    // Nutrient bars
    dom.barsContainer.innerHTML = '';
    ['protein', 'carbs', 'fat', 'fiber', 'sugar'].forEach(key => {
      const wrapper = document.createElement('div');
      wrapper.className = 'bar-wrapper';
      Charts.renderBar(wrapper, key, totals[key], RECOMMENDED_DAILY[key], NUTRIENT_META[key].color);
      dom.barsContainer.appendChild(wrapper);
    });
    // Macro ratio bar
    Charts.renderMacroRatioBar(dom.macroRatioEl, totals.protein, totals.carbs, totals.fat);
  }
  // ══════════════════════════════════════════════════════
  //  Log List
  // ══════════════════════════════════════════════════════
  function updateLogList() {
    const log = Tracker.getLog();
    dom.logEmpty.style.display = log.length === 0 ? 'block' : 'none';
    dom.clearLogBtn.style.display = log.length > 0 ? 'inline-flex' : 'none';
    dom.mealTypeLabel.textContent = Tracker.getCurrentMealType();
    // Re-render full list
    dom.logList.innerHTML = '';
    [...log].reverse().forEach(entry => {
      const item = buildLogItem(entry);
      dom.logList.appendChild(item);
    });
  }
  function buildLogItem(entry) {
    const { food, portion, nutrition, timeLabel, mealType, id } = entry;
    const el = document.createElement('div');
    el.className = 'log-item slide-in';
    el.dataset.id = id;
    el.innerHTML = `
      <div class="li-left">
        <span class="li-emoji">${food.emoji}</span>
        <div class="li-info">
          <span class="li-name">${food.name}</span>
          <span class="li-meta">${portion}g · ${mealType} · ${timeLabel}</span>
        </div>
      </div>
      <div class="li-right">
        <div class="li-nutrition">
          <span class="li-cal">${nutrition.calories} kcal</span>
          <span class="li-macros">P:${nutrition.protein}g C:${nutrition.carbs}g F:${nutrition.fat}g</span>
        </div>
        <button class="li-remove" data-id="${id}" title="Remove">✕</button>
      </div>
    `;
    el.querySelector('.li-remove').addEventListener('click', () => {
      el.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => Tracker.removeEntry(id), 280);
    });
    return el;
  }
  // ══════════════════════════════════════════════════════
  //  Recommendations
  // ══════════════════════════════════════════════════════
  function updateRecommendations() {
    const recs = Recommender.recommend(4);
    const insight = Recommender.getInsight();
    dom.recInsight.textContent = insight;
    dom.recGrid.innerHTML = '';
    recs.forEach((rec, i) => {
      const card = buildRecCard(rec, i);
      dom.recGrid.appendChild(card);
    });
  }
  function buildRecCard(rec, idx) {
    const { food, portion, nutr, rationale, tag } = rec;
    const card = document.createElement('div');
    card.className = 'rec-card fade-up';
    card.style.animationDelay = `${idx * 80}ms`;
    card.innerHTML = `
      <div class="rec-tag">${tag}</div>
      <div class="rec-emoji">${food.emoji}</div>
      <h4 class="rec-name">${food.name}</h4>
      <p class="rec-rationale">${rationale}</p>
      <div class="rec-macros">
        <span>${nutr.calories} kcal</span>
        <span>P ${nutr.protein}g</span>
        <span>C ${nutr.carbs}g</span>
        <span>F ${nutr.fat}g</span>
      </div>
      <button class="btn-quick-add" data-foodid="${food.id}" data-portion="${portion}">
        Quick Add
      </button>
    `;
    card.querySelector('.btn-quick-add').addEventListener('click', function () {
      Tracker.addEntry(food, portion, nutr);
      this.textContent = '✓ Added!';
      this.disabled = true;
      setTimeout(() => { this.textContent = 'Quick Add'; this.disabled = false; }, 2000);
    });
    return card;
  }
  // ══════════════════════════════════════════════════════
  //  Helpers
  // ══════════════════════════════════════════════════════
  function updateNavPill() {
    const totals = Tracker.getTotals();
    const count  = Tracker.getCount();
    if (dom.navPill) {
      dom.navPill.textContent = count > 0
        ? `${count} meal${count > 1 ? 's' : ''} · ${Math.round(totals.calories)} kcal`
        : 'No meals logged yet';
    }
  }
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (dom.themeToggle) {
      dom.themeToggle.textContent = theme === 'dark' ? '☀' : '🌙';
    }
  }
  function animateHeroStats() {
    const stats = qa('.hero-stat-val');
    stats.forEach(el => {
      const target = +el.dataset.target;
      let cur = 0;
      const step = target / 40;
      const timer = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(timer); }
        el.textContent = Math.round(cur) + (el.dataset.suffix || '');
      }, 30);
    });
  }
})();
