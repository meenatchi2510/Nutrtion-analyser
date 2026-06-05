// ═══════════════════════════════════════════════════════
//  charts.js  –  SVG Chart Renderers  (fixed v2)
// ═══════════════════════════════════════════════════════
const Charts = (() => {
  // ══════════════════════════════════════════════════════
  //  Animated SVG Donut Chart
  // ══════════════════════════════════════════════════════
  function renderDonut(svgEl, segments) {
    svgEl.innerHTML = '';
    const cx = 90, cy = 90, R = 68, strokeW = 16;
    const circumference = 2 * Math.PI * R;
    // ── Always-visible background ring ──────────────────
    const bg = _circle(cx, cy, R, strokeW, '#ffffff12');
    svgEl.appendChild(bg);
    const total = segments.reduce((s, seg) => s + Math.max(0, seg.value), 0);
    if (total <= 0) return;   // nothing more to draw at 0
    let offsetAngle = -90;   // start at the top
    segments.forEach((seg, i) => {
      if (seg.value <= 0) return;
      const pct   = seg.value / total;
      const dash  = +(pct * circumference).toFixed(2);
      const gap   = +(circumference - dash).toFixed(2);
      const circle = _circle(cx, cy, R, strokeW, seg.color);
      circle.setAttribute('stroke-dasharray', `0 ${circumference}`);
      circle.setAttribute('transform', `rotate(${offsetAngle}, ${cx}, ${cy})`);
      circle.style.filter = `drop-shadow(0 0 5px ${seg.color}77)`;
      offsetAngle += pct * 360;
      svgEl.appendChild(circle);
      // Animate after paint
      setTimeout(() => {
        circle.style.transition = 'stroke-dasharray 0.8s cubic-bezier(0.4,0,0.2,1)';
        circle.setAttribute('stroke-dasharray', `${dash} ${gap}`);
      }, i * 110 + 60);
    });
  }
  function _circle(cx, cy, r, strokeW, color) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    el.setAttribute('cx', cx);
    el.setAttribute('cy', cy);
    el.setAttribute('r', r);
    el.setAttribute('fill', 'none');
    el.setAttribute('stroke', color);
    el.setAttribute('stroke-width', strokeW);
    el.setAttribute('stroke-linecap', 'round');
    return el;
  }
  // ══════════════════════════════════════════════════════
  //  Calorie Gauge  (semicircle, viewBox 0 0 200 120)
  // ══════════════════════════════════════════════════════
  //  Arc lives inside viewBox.  cx=100 cy=108 R=82
  //  Semicircle top-point: y = 108-82 = 26   ✓ visible
  //  Endpoints (left/right):  y = 108          ✓ just inside 120
  function renderGauge(svgEl, current, max) {
    svgEl.innerHTML = '';
    const cx = 100, cy = 108, R = 82;
    const pct = Math.min(1, current / Math.max(1, max));
    const bgColor  = 'rgba(255,255,255,0.18)';
    const fgColor  = pct > 1 ? '#ef4444' : pct > 0.75 ? '#f59e0b' : '#10b981';
    // Background arc (always visible)
    const bgPath = _arc(cx, cy, R, -180, 0, bgColor, 14);
    bgPath.setAttribute('stroke-linecap', 'butt');
    svgEl.appendChild(bgPath);
    // Colored progress arc
    if (pct > 0.005) {
      const endAngle = -180 + pct * 180;
      const fgPath   = _arc(cx, cy, R, -180, endAngle, fgColor, 14);
      fgPath.style.filter = `drop-shadow(0 0 6px ${fgColor}99)`;
      svgEl.appendChild(fgPath);
    }
    // Needle dot at current pct position
    const needleRad = ((-180 + pct * 180) * Math.PI) / 180;
    const nx = cx + R * Math.cos(needleRad);
    const ny = cy + R * Math.sin(needleRad);
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', nx.toFixed(2));
    dot.setAttribute('cy', ny.toFixed(2));
    dot.setAttribute('r', '7');
    dot.setAttribute('fill', fgColor);
    dot.setAttribute('stroke', '#0f1225');
    dot.setAttribute('stroke-width', '2');
    dot.style.filter = `drop-shadow(0 0 8px ${fgColor})`;
    svgEl.appendChild(dot);
  }
  // ── Arc path ──────────────────────────────────────────
  function _arc(cx, cy, r, startDeg, endDeg, color, sw) {
    const s = _polar(cx, cy, r, startDeg);
    const e = _polar(cx, cy, r, endDeg);
    const large = (endDeg - startDeg > 180) ? 1 : 0;
    const d = `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', sw);
    path.setAttribute('stroke-linecap', 'round');
    return path;
  }
  function _polar(cx, cy, r, deg) {
    const rad = (deg * Math.PI) / 180;
    return {
      x: +(cx + r * Math.cos(rad)).toFixed(3),
      y: +(cy + r * Math.sin(rad)).toFixed(3),
    };
  }
  // ══════════════════════════════════════════════════════
  //  Animated Horizontal Bar
  // ══════════════════════════════════════════════════════
  function renderBar(containerEl, nutrient, current, max, color) {
    const pct    = Math.min(120, Math.round((current / Math.max(1, max)) * 100));
    const isOver = pct > 100;
    const barColor = isOver ? '#ef4444' : color;
    containerEl.innerHTML = `
      <div class="bar-label">
        <span class="bar-icon">${NUTRIENT_META[nutrient].icon}</span>
        <span class="bar-name">${NUTRIENT_META[nutrient].label}</span>
        <span class="bar-value ${isOver ? 'over' : ''}">${current}${NUTRIENT_META[nutrient].unit}</span>
        <span class="bar-pct">${pct}%</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style="--bar-color:${barColor}; --bar-width:0%"></div>
        ${isOver ? '<div class="bar-over-marker"></div>' : ''}
      </div>
    `;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const fill = containerEl.querySelector('.bar-fill');
        if (fill) fill.style.setProperty('--bar-width', `${Math.min(pct, 100)}%`);
      });
    });
  }
  // ══════════════════════════════════════════════════════
  //  Mini Macro Ratio Bar  (3-segment)
  // ══════════════════════════════════════════════════════
  function renderMacroRatioBar(el, protein, carbs, fat) {
    const total = protein + carbs + fat;
    if (total <= 0) {
      el.innerHTML = `
        <div class="macro-ratio-bar" style="background:rgba(255,255,255,0.06);"></div>
        <div class="macro-ratio-legend">
          <span class="protein">P 0%</span>
          <span class="carbs">C 0%</span>
          <span class="fat">F 0%</span>
        </div>`;
      return;
    }
    const pP = (protein / total * 100).toFixed(1);
    const pC = (carbs   / total * 100).toFixed(1);
    const pF = (fat     / total * 100).toFixed(1);
    el.innerHTML = `
      <div class="macro-ratio-bar">
        <div class="mr-seg protein" style="width:${pP}%" title="Protein ${pP}%"></div>
        <div class="mr-seg carbs"  style="width:${pC}%" title="Carbs ${pC}%"></div>
        <div class="mr-seg fat"    style="width:${pF}%" title="Fat ${pF}%"></div>
      </div>
      <div class="macro-ratio-legend">
        <span class="protein">P ${pP}%</span>
        <span class="carbs">C ${pC}%</span>
        <span class="fat">F ${pF}%</span>
      </div>`;
  }
  return { renderDonut, renderGauge, renderBar, renderMacroRatioBar };
})();
