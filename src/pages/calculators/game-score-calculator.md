---
layout: ../../layouts/CalculatorLayout.astro
calcType: gamescore
title: Game Score Calculator
description: A free scoreboard for card and board games. Name your players, add points each round, keep a running total, and rank everyone by score or name.
---

## How to Use This Calculator

1. **Add your players** — Type a name for each person playing. Add or remove players any time.
2. **Pick how you score** — Highest score wins, lowest score wins (golf, Hearts, rummy), or first to a target score.
3. **Record each round** — Enter the points every player earned and press *Record Round*. Totals and the leaderboard update instantly.
4. **Rank the table** — Sort players by score (high or low) or alphabetically by name. Your game saves automatically.

<div class="calculator-form gsc" id="game-score-calculator-form">

  <!-- Game settings -->
  <div class="form-section">
    <h3>Game Setup</h3>
    <div class="form-row gsc-settings">
      <div class="form-group">
        <label for="gsc-game-name">Game name <span class="tooltip" title="Optional — e.g. Family Rummy Night">?</span></label>
        <input type="text" id="gsc-game-name" class="form-input" placeholder="e.g. Rummy Night" maxlength="60" />
      </div>
      <div class="form-group">
        <label for="gsc-mode">Scoring mode</label>
        <select id="gsc-mode" class="form-input">
          <option value="high">Highest score wins</option>
          <option value="low">Lowest score wins</option>
          <option value="target">First to target score</option>
        </select>
      </div>
      <div class="form-group gsc-target-group hidden" id="gsc-target-group">
        <label for="gsc-target">Target score</label>
        <input type="number" id="gsc-target" class="form-input" step="1" min="1" placeholder="100" value="100" />
      </div>
    </div>
    <small class="form-help" id="gsc-mode-help">Highest total wins — great for most board and card games.</small>
  </div>

  <!-- Players -->
  <div class="form-section">
    <h3>Players</h3>
    <div id="gsc-players" class="gsc-players"></div>
    <button type="button" id="gsc-add-player" class="btn btn-secondary gsc-add-player">+ Add Player</button>
  </div>

  <!-- Round entry -->
  <div class="form-section" id="gsc-round-section">
    <h3>Add This Round's Points</h3>
    <small class="form-help">Type the points each player scored this round, then record it. Leave a box blank for 0. Use −/＋ for quick tallying.</small>
    <div id="gsc-round-inputs" class="gsc-round-inputs"></div>
    <div class="gsc-round-actions">
      <button type="button" id="gsc-record" class="btn btn-primary calculate-button">Record Round →</button>
      <button type="button" id="gsc-undo" class="btn btn-secondary">↩ Undo Last Round</button>
      <button type="button" id="gsc-reset" class="btn btn-secondary gsc-reset">Reset Game</button>
    </div>
  </div>

</div>

<div id="game-score-calculator-result" class="calculator-result"></div>

<div class="info-box">
  <h4>🎯 Which scoring mode should I use?</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Highest score wins:</strong> Most games — Scrabble, Yahtzee, Uno (points), Catan, trivia. The biggest total at the end takes it.</li>
    <li><strong>Lowest score wins:</strong> Golf, Hearts, many Rummy and Gin variants, Skull King — you want the <em>fewest</em> points.</li>
    <li><strong>First to target:</strong> Race games that end the moment someone hits a number (e.g. first to 100, 250, or 500). A winner is announced automatically.</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>🃏 Handy tips</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Negative points are allowed</strong> — type a minus sign (e.g. <code>-10</code>) for penalties or lost points.</li>
    <li><strong>Everything saves automatically</strong> in your browser — close the tab and your game is still here when you come back.</li>
    <li><strong>Made a mistake?</strong> Undo the last round, or delete any single round from the history below the leaderboard.</li>
    <li><strong>Sort the leaderboard</strong> by score or name at any time — it only changes the display order, never the totals.</li>
  </ul>
</div>

<style>
  /* ---- setup / players / round entry ---- */
  .gsc .form-section { margin-bottom: 1.75rem; }
  .gsc-settings { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; }
  .gsc-settings .form-group { margin: 0; }

  .gsc-players { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 0.75rem; }
  .gsc-player-row { display: flex; align-items: center; gap: 0.5rem; }
  .gsc-player-index {
    flex: 0 0 auto; width: 1.75rem; height: 1.75rem; display: grid; place-items: center;
    background: var(--color-lighter-blue); color: var(--color-primary-blue);
    border-radius: 50%; font-weight: 700; font-size: 0.85rem;
  }
  .gsc-name-input { flex: 1 1 auto; }
  .gsc-remove {
    flex: 0 0 auto; width: 2.1rem; height: 2.1rem; border-radius: var(--border-radius);
    border: 2px solid var(--color-gray); background: var(--color-white);
    color: var(--color-gray-dark); cursor: pointer; font-size: 0.9rem; line-height: 1;
    transition: all var(--transition-fast);
  }
  .gsc-remove:hover { border-color: var(--color-error); color: var(--color-error); }
  .gsc-add-player { margin-top: 0.25rem; }

  .gsc-round-inputs { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 0.75rem; margin: 0.75rem 0 1rem; }
  .gsc-round-row { display: flex; flex-direction: column; gap: 0.3rem; min-width: 0; }
  .gsc-round-name { font-weight: 600; color: var(--color-primary-blue); font-size: 0.9rem;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .gsc-stepper { display: flex; align-items: stretch; gap: 0.4rem; min-width: 0; }
  .gsc-round-input { flex: 1 1 0; min-width: 0; width: auto; text-align: center; }
  .gsc-step {
    flex: 0 0 auto; width: 2.4rem; border-radius: var(--border-radius);
    border: 2px solid var(--color-primary-blue); background: var(--color-white);
    color: var(--color-primary-blue); font-size: 1.15rem; font-weight: 700; cursor: pointer;
    transition: all var(--transition-fast);
  }
  .gsc-step:hover { background: var(--color-primary-blue); color: #fff; }
  .gsc-hint { color: var(--color-gray-dark); font-style: italic; }

  .gsc-round-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; }
  .gsc-reset { margin-left: auto; }

  /* ---- result / scoreboard ---- */
  .gsc-result-head { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
  .gsc-result-head h3 { color: var(--color-primary-blue); margin: 0; font-size: var(--text-2xl); }
  .gsc-rounds-count { color: var(--color-gray-dark); font-weight: 600; font-size: 0.9rem; }
  .gsc-empty { text-align: center; color: var(--color-gray-dark); padding: 1.5rem; font-size: 1.05rem; }

  .gsc-banner {
    margin: 1rem 0; padding: 0.85rem 1rem; border-radius: var(--border-radius);
    background: var(--color-white); border-left: 4px solid var(--color-primary-blue);
    color: var(--color-gray-dark); font-size: 1rem;
  }
  .gsc-banner-win { border-left-color: var(--color-success); background: var(--color-highlight-green); }

  .gsc-sort { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0; }
  .gsc-sort-btn {
    padding: 0.4rem 0.85rem; border-radius: 20px; border: 2px solid var(--color-gray);
    background: var(--color-white); color: var(--color-gray-dark); font-weight: 600;
    font-size: 0.85rem; cursor: pointer; transition: all var(--transition-fast); font-family: var(--font-body);
  }
  .gsc-sort-btn:hover { border-color: var(--color-primary-blue); color: var(--color-primary-blue); }
  .gsc-sort-btn.active { background: var(--color-primary-blue); border-color: var(--color-primary-blue); color: #fff; }

  .gsc-board { display: flex; flex-direction: column; gap: 0.5rem; }
  .gsc-row {
    display: grid; grid-template-columns: 3rem 1fr auto; align-items: center; gap: 0.75rem;
    padding: 0.75rem 1rem; background: var(--color-white); border-radius: var(--border-radius);
    border: 2px solid var(--color-gray); transition: all var(--transition-fast);
  }
  .gsc-row.gsc-leader { border-color: var(--color-accent-orange); box-shadow: var(--shadow-md); }
  .gsc-rank { font-size: 1.1rem; font-weight: 700; color: var(--color-gray-dark); text-align: center; }
  .gsc-name { font-weight: 600; color: var(--color-primary-blue); overflow: hidden; text-overflow: ellipsis; }
  .gsc-total { font-size: 1.5rem; font-weight: 800; color: var(--color-accent-orange); font-family: var(--font-primary); text-align: right; white-space: nowrap; }
  .gsc-delta { font-size: 0.8rem; font-weight: 600; color: var(--color-gray-dark); }
  .gsc-crown { font-size: 0.95rem; }
  .gsc-progress { grid-column: 1 / -1; height: 6px; border-radius: 3px; background: var(--color-gray-light); overflow: hidden; }
  .gsc-progress-bar { height: 100%; background: var(--color-accent-orange); transition: width var(--transition-base); }

  .gsc-result-actions { display: flex; justify-content: flex-end; margin: 1rem 0 0; }

  .gsc-history { margin-top: 1.75rem; }
  .gsc-history h4 { color: var(--color-primary-blue); margin-bottom: 0.75rem; }
  .gsc-history-scroll { overflow-x: auto; }
  .gsc-history-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; min-width: 320px; }
  .gsc-history-table th, .gsc-history-table td { padding: 0.5rem 0.65rem; text-align: center; border-bottom: 1px solid var(--color-gray); white-space: nowrap; }
  .gsc-history-table thead th { color: var(--color-primary-blue); font-weight: 700; }
  .gsc-history-table tfoot td { border-top: 2px solid var(--color-gray); border-bottom: none; color: var(--color-primary-blue); }
  .gsc-round-num { color: var(--color-gray-dark); font-weight: 600; }
  .gsc-del {
    width: 1.7rem; height: 1.7rem; border-radius: var(--border-radius); border: 1px solid var(--color-gray);
    background: var(--color-white); color: var(--color-gray-dark); cursor: pointer; font-size: 0.75rem;
    line-height: 1; transition: all var(--transition-fast);
  }
  .gsc-del:hover { border-color: var(--color-error); color: var(--color-error); }

  @media (max-width: 600px) {
    .gsc-round-actions .btn { width: 100%; }
    .gsc-reset { margin-left: 0; }
    .gsc-total { font-size: 1.25rem; }
  }
</style>

<script src="/scripts/calculators/game-score-calculator.js"></script>
