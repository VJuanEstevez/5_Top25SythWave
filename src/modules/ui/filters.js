import { GENRE_LABELS } from '../data/songs.js';

function sortSongs(songs, sort) {
  const list = [...songs];

  if (sort === 'year-asc') {
    list.sort((a, b) => a.year - b.year || a.rank - b.rank);
  } else if (sort === 'year-desc') {
    list.sort((a, b) => b.year - a.year || a.rank - b.rank);
  } else {
    list.sort((a, b) => a.rank - b.rank);
  }

  return list;
}

export function initFilters({ filtersEl, sortEl, statusEl, gridEl, songs, items }) {
  const state = { filter: 'all', sort: 'rank' };
  const genres = [...new Set(songs.map((song) => song.genre))];

  const createChip = (value, label) => {
    const count =
      value === 'all' ? songs.length : songs.filter((song) => song.genre === value).length;

    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = `chip${value === state.filter ? ' is-active' : ''}`;
    chip.dataset.filter = value;
    chip.setAttribute('aria-pressed', String(value === state.filter));

    const countEl = document.createElement('span');
    countEl.className = 'chip__count';
    countEl.textContent = `(${count})`;

    chip.append(label, ' ', countEl);
    return chip;
  };

  filtersEl.append(
    createChip('all', 'Todos'),
    ...genres.map((genre) => createChip(genre, GENRE_LABELS[genre] ?? genre)),
  );

  const apply = () => {
    const ordered = sortSongs(songs, state.sort);
    let visibleCount = 0;

    for (const song of ordered) {
      const card = items.get(song.rank);
      if (!card) continue;

      const visible = state.filter === 'all' || song.genre === state.filter;
      card.classList.toggle('is-hidden', !visible);
      if (visible) visibleCount += 1;

      gridEl.append(card);
    }

    const label =
      state.filter === 'all' ? 'todos los géneros' : (GENRE_LABELS[state.filter] ?? state.filter);
    statusEl.textContent = `Mostrando ${visibleCount} de ${songs.length} canciones · ${label}`;
  };

  filtersEl.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-filter]');
    if (!chip) return;

    state.filter = chip.dataset.filter;

    for (const button of filtersEl.querySelectorAll('.chip')) {
      const active = button === chip;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    }

    apply();
  });

  sortEl.addEventListener('change', () => {
    state.sort = sortEl.value;
    apply();
  });

  apply();
}
