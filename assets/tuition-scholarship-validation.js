(() => {
  'use strict';

  function validateTuition(feeText, semesterText, otherText) {
    if (!feeText.trim()) return 'Enter tuition per semester. Use 0 if tuition is free.';
    if (!semesterText.trim()) return 'Enter the number of semesters.';
    const fee = Number(feeText);
    const semesters = Number(semesterText);
    const other = otherText.trim() === '' ? 0 : Number(otherText);
    if (!Number.isFinite(fee) || fee < 0) return 'Tuition per semester must be a non-negative number.';
    if (!Number.isInteger(semesters) || semesters < 1) return 'The number of semesters must be a whole number greater than zero.';
    if (!Number.isFinite(other) || other < 0) return 'Other costs must be a non-negative number.';
    return '';
  }

  function validateScholarship(entries) {
    let totalWeight = 0;
    let used = 0;
    for (const entry of entries) {
      const scoreText = String(entry.score ?? '').trim();
      const weightText = String(entry.weight ?? '').trim();
      if (scoreText === '' && weightText === '') continue;
      if (scoreText === '' || weightText === '') {
        return entry.name + ': enter both the score and weight, or leave both blank.';
      }
      const score = Number(scoreText);
      const weight = Number(weightText);
      if (!Number.isFinite(score) || score < 0 || score > 100) {
        return entry.name + ': score must be between 0 and 100.';
      }
      if (!Number.isFinite(weight) || weight <= 0 || weight > 100) {
        return entry.name + ': weight must be greater than 0 and no more than 100.';
      }
      totalWeight += weight;
      used++;
    }
    if (!used) return 'Enter at least one score and its weight.';
    if (Math.abs(totalWeight - 100) > 0.01) {
      return 'The weights must total 100%. Current total: ' + Number(totalWeight.toFixed(2)) + '%.';
    }
    return '';
  }

  function showError(result, message) {
    const heading = document.createElement('strong');
    heading.textContent = 'Please check your entries';
    const detail = document.createElement('p');
    detail.textContent = message;
    result.replaceChildren(heading, detail);
    result.classList.remove('hidden');
  }

  if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('calc');
    const result = document.getElementById('result');
    if (!button || !result) return;
    const page = document.body.dataset.tool;
    const previousHandler = button.onclick;

    if (page === 'tuition') {
      button.onclick = function(event) {
        const message = validateTuition(
          document.getElementById('fee').value,
          document.getElementById('semesters').value,
          document.getElementById('other').value
        );
        if (message) { showError(result, message); return; }
        if (typeof previousHandler === 'function') previousHandler.call(this, event);
      };
    }

    if (page === 'scholarship') {
      button.onclick = function(event) {
        const entries = [
          {name:'Academic criterion', score:document.getElementById('a').value, weight:document.getElementById('wa').value},
          {name:'Test criterion', score:document.getElementById('b').value, weight:document.getElementById('wb').value},
          {name:'Other criterion', score:document.getElementById('c').value, weight:document.getElementById('wc').value}
        ];
        const message = validateScholarship(entries);
        if (message) { showError(result, message); return; }
        if (typeof previousHandler === 'function') previousHandler.call(this, event);
      };
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {validateTuition, validateScholarship};
  }
})();