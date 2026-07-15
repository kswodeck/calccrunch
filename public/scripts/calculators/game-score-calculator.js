// Game Score Calculator — a scoreboard for card & board games.
// Vanilla JS, no dependencies. State persists to localStorage so a game
// survives a refresh or a closed tab.
(function () {
  'use strict';

  var STORAGE_KEY = 'calccrunch:game-score-calculator';
  var VALID_MODES = { high: 1, low: 1, target: 1 };
  var VALID_SORTS = { 'score-desc': 1, 'score-asc': 1, 'name-asc': 1, 'name-desc': 1 };
  var MODE_HELP = {
    high: 'Highest total wins — great for most board and card games.',
    low: 'Lowest total wins — for golf, Hearts, and many rummy variants.',
    target: 'First player to reach the target score wins.'
  };

  var state = null;
  var pending = {}; // playerId -> points entered for the current (not yet recorded) round
  var els = {};

  document.addEventListener('DOMContentLoaded', function () {
    cacheElements();
    state = load();
    if (state.players.length === 0) seedPlayers();
    syncSettingsInputs();
    attachEvents();
    renderPlayers();
    renderRoundInputs();
    renderResult();
  });

  // ---------------------------------------------------------------- state ---

  function defaultState() {
    return {
      gameName: '',
      mode: 'high',
      target: 100,
      seq: 1,
      players: [],
      rounds: [],
      sortBy: 'score-desc'
    };
  }

  function seedPlayers() {
    addPlayerObj('Player 1');
    addPlayerObj('Player 2');
  }

  function nextId(prefix) {
    var id = prefix + state.seq;
    state.seq += 1;
    return id;
  }

  function load() {
    var raw;
    try {
      raw = window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return defaultState();
    }
    if (!raw) return defaultState();
    try {
      var data = JSON.parse(raw);
      return validate(data);
    } catch (e) {
      return defaultState();
    }
  }

  function validate(data) {
    var s = defaultState();
    if (!data || typeof data !== 'object') return s;
    if (typeof data.gameName === 'string') s.gameName = data.gameName.slice(0, 60);
    if (VALID_MODES[data.mode]) s.mode = data.mode;
    if (VALID_SORTS[data.sortBy]) s.sortBy = data.sortBy;
    if (isFinite(data.target) && data.target > 0) s.target = Number(data.target);
    if (isFinite(data.seq) && data.seq > 0) s.seq = Math.floor(data.seq);

    if (Array.isArray(data.players)) {
      data.players.forEach(function (p) {
        if (p && typeof p.id === 'string') {
          s.players.push({ id: p.id, name: typeof p.name === 'string' ? p.name : '' });
        }
      });
    }
    var ids = {};
    s.players.forEach(function (p) { ids[p.id] = 1; });

    if (Array.isArray(data.rounds)) {
      data.rounds.forEach(function (r) {
        if (!r || typeof r !== 'object') return;
        var scores = {};
        if (r.scores && typeof r.scores === 'object') {
          Object.keys(r.scores).forEach(function (k) {
            if (ids[k] && isFinite(r.scores[k])) scores[k] = Number(r.scores[k]);
          });
        }
        s.rounds.push({ id: typeof r.id === 'string' ? r.id : nextIdFor(s, 'r'), scores: scores });
      });
    }
    // guarantee seq is beyond any existing numeric id to avoid collisions
    var maxSeq = s.seq;
    s.players.concat(s.rounds).forEach(function (o) {
      var m = /(\d+)$/.exec(o.id);
      if (m) maxSeq = Math.max(maxSeq, parseInt(m[1], 10) + 1);
    });
    s.seq = maxSeq;
    return s;
  }

  // used only during validate() before `state` is assigned
  function nextIdFor(s, prefix) {
    var id = prefix + s.seq;
    s.seq += 1;
    return id;
  }

  function save() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* storage full or unavailable — the game still works in-memory */
    }
  }

  function addPlayerObj(name) {
    state.players.push({ id: nextId('p'), name: name });
  }

  // -------------------------------------------------------------- compute ---

  function totals() {
    var t = {};
    state.players.forEach(function (p) { t[p.id] = 0; });
    state.rounds.forEach(function (r) {
      state.players.forEach(function (p) {
        if (isFinite(r.scores[p.id])) t[p.id] += r.scores[p.id];
      });
    });
    return t;
  }

  function compareByMode(a, b) {
    return state.mode === 'low' ? a.total - b.total : b.total - a.total;
  }

  // Ranked standings (independent of the display sort). Ties share a rank.
  function standings(t) {
    var arr = state.players.map(function (p) {
      return { id: p.id, name: p.name, total: t[p.id] || 0 };
    });
    arr.sort(compareByMode);
    var rank = 0, seen = 0, prev = null;
    arr.forEach(function (row) {
      seen += 1;
      if (prev === null || row.total !== prev) { rank = seen; prev = row.total; }
      row.rank = rank;
    });
    return arr;
  }

  function displayOrder(t, rankById) {
    var arr = state.players.map(function (p) {
      return { id: p.id, name: p.name, total: t[p.id] || 0, rank: rankById[p.id] };
    });
    switch (state.sortBy) {
      case 'score-asc': arr.sort(function (a, b) { return a.total - b.total; }); break;
      case 'name-asc': arr.sort(function (a, b) { return cmpName(a, b); }); break;
      case 'name-desc': arr.sort(function (a, b) { return cmpName(b, a); }); break;
      default: arr.sort(function (a, b) { return b.total - a.total; }); // score-desc
    }
    return arr;
  }

  function cmpName(a, b) {
    return String(a.name).toLowerCase().localeCompare(String(b.name).toLowerCase());
  }

  function lastRoundScore(id) {
    if (state.rounds.length === 0) return null;
    var r = state.rounds[state.rounds.length - 1];
    return isFinite(r.scores[id]) ? r.scores[id] : 0;
  }

  function targetWinner(t) {
    if (state.mode !== 'target' || state.rounds.length === 0) return null;
    var best = null;
    state.players.forEach(function (p) {
      var v = t[p.id] || 0;
      if (v >= state.target && (best === null || v > best.total)) {
        best = { id: p.id, name: p.name, total: v };
      }
    });
    return best;
  }

  // ------------------------------------------------------------ rendering ---

  function fmt(n) {
    var r = Math.round(n * 1e6) / 1e6;
    if (Object.is(r, -0)) r = 0;
    return String(r);
  }

  function signed(n) {
    return (n >= 0 ? '+' : '') + fmt(n);
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function playerLabel(p, i) {
    var n = p.name && p.name.trim() ? p.name : 'Player ' + (i + 1);
    return esc(n);
  }

  function renderPlayers() {
    var html = state.players.map(function (p, i) {
      return (
        '<div class="gsc-player-row">' +
          '<span class="gsc-player-index">' + (i + 1) + '</span>' +
          '<input type="text" class="form-input gsc-name-input" data-id="' + p.id + '" ' +
            'value="' + esc(p.name) + '" placeholder="Player ' + (i + 1) + '" maxlength="24" />' +
          '<button type="button" class="gsc-remove" data-remove="' + p.id + '" ' +
            'title="Remove player" aria-label="Remove player">✕</button>' +
        '</div>'
      );
    }).join('');
    els.players.innerHTML = html;
  }

  function renderRoundInputs() {
    if (state.players.length === 0) {
      els.roundInputs.innerHTML =
        '<p class="gsc-hint">Add at least one player above to start scoring.</p>';
      return;
    }
    var html = state.players.map(function (p, i) {
      var val = (p.id in pending) ? pending[p.id] : '';
      return (
        '<div class="gsc-round-row">' +
          '<span class="gsc-round-name" data-name-for="' + p.id + '">' + playerLabel(p, i) + '</span>' +
          '<div class="gsc-stepper">' +
            '<button type="button" class="gsc-step" data-step="-1" data-id="' + p.id + '" aria-label="Subtract 1">−</button>' +
            '<input type="number" step="any" class="form-input gsc-round-input" data-id="' + p.id + '" ' +
              'value="' + esc(val) + '" placeholder="0" inputmode="numeric" />' +
            '<button type="button" class="gsc-step" data-step="1" data-id="' + p.id + '" aria-label="Add 1">＋</button>' +
          '</div>' +
        '</div>'
      );
    }).join('');
    els.roundInputs.innerHTML = html;
  }

  function renderResult() {
    if (state.players.length === 0) {
      els.result.innerHTML =
        '<div class="gsc-empty">👋 Add players and record a round to see the scoreboard.</div>';
      return;
    }

    var t = totals();
    var ranked = standings(t);
    var rankById = {};
    ranked.forEach(function (r) { rankById[r.id] = r.rank; });
    var order = displayOrder(t, rankById);
    var hasRounds = state.rounds.length > 0;
    var leaderId = hasRounds && ranked.length ? ranked[0].id : null;
    var winner = targetWinner(t);

    var html = '';

    // Header + banner
    var heading = state.gameName && state.gameName.trim()
      ? esc(state.gameName.trim())
      : 'Scoreboard';
    html += '<div class="gsc-result-head">' +
      '<h3>' + heading + '</h3>' +
      '<span class="gsc-rounds-count">' + state.rounds.length +
        (state.rounds.length === 1 ? ' round' : ' rounds') + '</span>' +
    '</div>';

    if (winner) {
      html += '<div class="gsc-banner gsc-banner-win">🏆 <strong>' + esc(winner.name || 'A player') +
        '</strong> reached the target (' + fmt(state.target) + ') and wins with ' + fmt(winner.total) + ' points!</div>';
    } else if (hasRounds && leaderId) {
      var lead = ranked[0];
      var tiedLeaders = ranked.filter(function (r) { return r.rank === 1; });
      if (tiedLeaders.length > 1) {
        html += '<div class="gsc-banner">🤝 Tied for the lead at ' + fmt(lead.total) + ' points: ' +
          tiedLeaders.map(function (r) { return '<strong>' + esc(r.name || 'Player') + '</strong>'; }).join(', ') + '</div>';
      } else {
        html += '<div class="gsc-banner">' + (state.mode === 'low' ? '🥇 Lowest score' : '🥇 Leading') +
          ': <strong>' + esc(lead.name || 'Player') + '</strong> with ' + fmt(lead.total) + ' points</div>';
      }
    }

    // Sort controls
    html += '<div class="gsc-sort" role="group" aria-label="Sort players">' +
      sortBtn('score-desc', 'Score ↓') +
      sortBtn('score-asc', 'Score ↑') +
      sortBtn('name-asc', 'Name A–Z') +
      sortBtn('name-desc', 'Name Z–A') +
    '</div>';

    // Leaderboard
    html += '<div class="gsc-board">';
    order.forEach(function (row) {
      var isLeader = row.id === leaderId;
      var delta = hasRounds ? lastRoundScore(row.id) : null;
      var medal = row.rank === 1 ? '🥇' : row.rank === 2 ? '🥈' : row.rank === 3 ? '🥉' : '';
      html += '<div class="gsc-row' + (isLeader ? ' gsc-leader' : '') + '">' +
        '<div class="gsc-rank">' + (medal || ('#' + row.rank)) + '</div>' +
        '<div class="gsc-name">' + esc(row.name && row.name.trim() ? row.name : 'Player') +
          (isLeader ? ' <span class="gsc-crown" title="Current leader">👑</span>' : '') + '</div>' +
        '<div class="gsc-total">' + fmt(row.total) +
          (delta !== null && delta !== 0 ? ' <span class="gsc-delta">' + signed(delta) + '</span>' : '') +
        '</div>';
      if (state.mode === 'target') {
        var pct = state.target > 0 ? Math.max(0, Math.min(100, (row.total / state.target) * 100)) : 0;
        html += '<div class="gsc-progress"><div class="gsc-progress-bar" style="width:' + pct + '%"></div></div>';
      }
      html += '</div>';
    });
    html += '</div>';

    // Actions
    html += '<div class="gsc-result-actions">' +
      '<button type="button" class="btn-action" data-copy="1">📋 Copy standings</button>' +
    '</div>';

    // History
    if (hasRounds) {
      html += renderHistory(t);
    }

    els.result.innerHTML = html;
  }

  function sortBtn(value, label) {
    var active = state.sortBy === value ? ' active' : '';
    return '<button type="button" class="gsc-sort-btn' + active + '" data-sort="' + value + '"' +
      (active ? ' aria-pressed="true"' : ' aria-pressed="false"') + '>' + label + '</button>';
  }

  function renderHistory(t) {
    var html = '<div class="gsc-history">';
    html += '<h4>Round History</h4>';
    html += '<div class="gsc-history-scroll"><table class="gsc-history-table"><thead><tr>' +
      '<th>Round</th>';
    state.players.forEach(function (p, i) {
      html += '<th data-name-for="' + p.id + '">' + playerLabel(p, i) + '</th>';
    });
    html += '<th aria-label="Delete round"></th></tr></thead><tbody>';

    // most recent round first
    for (var i = state.rounds.length - 1; i >= 0; i--) {
      var r = state.rounds[i];
      html += '<tr><td class="gsc-round-num">#' + (i + 1) + '</td>';
      state.players.forEach(function (p) {
        var v = isFinite(r.scores[p.id]) ? r.scores[p.id] : 0;
        html += '<td>' + fmt(v) + '</td>';
      });
      html += '<td><button type="button" class="gsc-del" data-del-round="' + r.id + '" ' +
        'title="Delete this round" aria-label="Delete round ' + (i + 1) + '">✕</button></td></tr>';
    }
    // totals footer
    html += '</tbody><tfoot><tr><td><strong>Total</strong></td>';
    state.players.forEach(function (p) {
      html += '<td><strong>' + fmt(t[p.id] || 0) + '</strong></td>';
    });
    html += '<td></td></tr></tfoot></table></div></div>';
    return html;
  }

  // ------------------------------------------------------------- mutation ---

  function recordRound() {
    if (state.players.length === 0) return;
    var scores = {};
    state.players.forEach(function (p) {
      scores[p.id] = (p.id in pending) ? pending[p.id] : 0;
    });
    state.rounds.push({ id: nextId('r'), scores: scores });
    pending = {};
    save();
    renderRoundInputs();
    renderResult();
    els.result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function undoRound() {
    if (state.rounds.length === 0) return;
    state.rounds.pop();
    save();
    renderResult();
  }

  function deleteRound(id) {
    state.rounds = state.rounds.filter(function (r) { return r.id !== id; });
    save();
    renderResult();
  }

  function addPlayer() {
    addPlayerObj('Player ' + (state.players.length + 1));
    save();
    renderPlayers();
    renderRoundInputs();
    renderResult();
    // focus the newly added name input for quick typing
    var inputs = els.players.querySelectorAll('.gsc-name-input');
    if (inputs.length) inputs[inputs.length - 1].select();
  }

  function removePlayer(id) {
    state.players = state.players.filter(function (p) { return p.id !== id; });
    delete pending[id];
    // drop that player's scores from every round to keep storage tidy
    state.rounds.forEach(function (r) { delete r.scores[id]; });
    save();
    renderPlayers();
    renderRoundInputs();
    renderResult();
  }

  function resetGame() {
    var ok = window.confirm('Start a new game? This clears all players and scores.');
    if (!ok) return;
    state = defaultState();
    pending = {};
    seedPlayers();
    save();
    syncSettingsInputs();
    renderPlayers();
    renderRoundInputs();
    renderResult();
  }

  function updateNameLabels(id, name) {
    var nodes = els.result.querySelectorAll('[data-name-for="' + id + '"]');
    for (var i = 0; i < nodes.length; i++) nodes[i].textContent = name && name.trim() ? name : 'Player';
    var rnodes = els.roundInputs.querySelectorAll('[data-name-for="' + id + '"]');
    for (var j = 0; j < rnodes.length; j++) rnodes[j].textContent = name && name.trim() ? name : 'Player';
  }

  function copyStandings() {
    var t = totals();
    var ranked = standings(t);
    var lines = [];
    if (state.gameName && state.gameName.trim()) lines.push(state.gameName.trim());
    lines.push('Scores after ' + state.rounds.length + (state.rounds.length === 1 ? ' round' : ' rounds') + ':');
    ranked.forEach(function (r) {
      lines.push(r.rank + '. ' + (r.name && r.name.trim() ? r.name : 'Player') + ' — ' + fmt(r.total));
    });
    var text = lines.join('\n');
    var btn = els.result.querySelector('[data-copy]');
    function ok() { if (btn) { var o = btn.innerHTML; btn.innerHTML = '✓ Copied'; setTimeout(function () { btn.innerHTML = o; }, 1500); } }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(ok, function () { fallbackCopy(text, ok); });
    } else {
      fallbackCopy(text, ok);
    }
  }

  function fallbackCopy(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { /* ignore */ }
    document.body.removeChild(ta);
  }

  // ---------------------------------------------------------------- events ---

  function cacheElements() {
    els = {
      gameName: document.getElementById('gsc-game-name'),
      mode: document.getElementById('gsc-mode'),
      target: document.getElementById('gsc-target'),
      targetGroup: document.getElementById('gsc-target-group'),
      modeHelp: document.getElementById('gsc-mode-help'),
      players: document.getElementById('gsc-players'),
      addPlayer: document.getElementById('gsc-add-player'),
      roundInputs: document.getElementById('gsc-round-inputs'),
      record: document.getElementById('gsc-record'),
      undo: document.getElementById('gsc-undo'),
      reset: document.getElementById('gsc-reset'),
      result: document.getElementById('game-score-calculator-result')
    };
  }

  function syncSettingsInputs() {
    els.gameName.value = state.gameName || '';
    els.mode.value = state.mode;
    els.target.value = state.target;
    els.targetGroup.classList.toggle('hidden', state.mode !== 'target');
    els.modeHelp.textContent = MODE_HELP[state.mode];
  }

  function attachEvents() {
    els.gameName.addEventListener('input', function () {
      state.gameName = els.gameName.value.slice(0, 60);
      save();
      var head = els.result.querySelector('.gsc-result-head h3');
      if (head) head.textContent = state.gameName.trim() ? state.gameName.trim() : 'Scoreboard';
    });

    els.mode.addEventListener('change', function () {
      if (VALID_MODES[els.mode.value]) state.mode = els.mode.value;
      els.targetGroup.classList.toggle('hidden', state.mode !== 'target');
      els.modeHelp.textContent = MODE_HELP[state.mode];
      save();
      renderResult();
    });

    els.target.addEventListener('input', function () {
      var v = parseFloat(els.target.value);
      if (isFinite(v) && v > 0) { state.target = v; save(); renderResult(); }
    });

    // player name edits + removal (delegated)
    els.players.addEventListener('input', function (e) {
      var input = e.target.closest ? e.target.closest('.gsc-name-input') : null;
      if (!input) return;
      var id = input.getAttribute('data-id');
      var p = findPlayer(id);
      if (!p) return;
      p.name = input.value;
      save();
      updateNameLabels(id, p.name);
    });
    els.players.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('[data-remove]') : null;
      if (!btn) return;
      removePlayer(btn.getAttribute('data-remove'));
    });

    // round entry: typing + steppers (delegated)
    els.roundInputs.addEventListener('input', function (e) {
      var input = e.target.closest ? e.target.closest('.gsc-round-input') : null;
      if (!input) return;
      var id = input.getAttribute('data-id');
      var raw = input.value.trim();
      if (raw === '' || raw === '-' || raw === '+') { delete pending[id]; return; }
      var v = parseFloat(raw);
      if (isFinite(v)) pending[id] = v; else delete pending[id];
    });
    els.roundInputs.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); recordRound(); }
    });
    els.roundInputs.addEventListener('click', function (e) {
      var step = e.target.closest ? e.target.closest('.gsc-step') : null;
      if (!step) return;
      var id = step.getAttribute('data-id');
      var by = parseFloat(step.getAttribute('data-step'));
      pending[id] = ((pending[id] || 0) + by);
      var input = els.roundInputs.querySelector('.gsc-round-input[data-id="' + id + '"]');
      if (input) input.value = fmt(pending[id]);
    });

    els.addPlayer.addEventListener('click', addPlayer);
    els.record.addEventListener('click', recordRound);
    els.undo.addEventListener('click', undoRound);
    els.reset.addEventListener('click', resetGame);

    // result area: sort, delete round, copy (delegated)
    els.result.addEventListener('click', function (e) {
      var sortBtnEl = e.target.closest ? e.target.closest('[data-sort]') : null;
      if (sortBtnEl) {
        var v = sortBtnEl.getAttribute('data-sort');
        if (VALID_SORTS[v]) { state.sortBy = v; save(); renderResult(); }
        return;
      }
      var del = e.target.closest ? e.target.closest('[data-del-round]') : null;
      if (del) { deleteRound(del.getAttribute('data-del-round')); return; }
      var copy = e.target.closest ? e.target.closest('[data-copy]') : null;
      if (copy) { copyStandings(); return; }
    });
  }

  function findPlayer(id) {
    for (var i = 0; i < state.players.length; i++) {
      if (state.players[i].id === id) return state.players[i];
    }
    return null;
  }
}());
