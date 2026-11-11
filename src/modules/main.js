import { HONORABLE_MENTIONS, SONGS } from './data/songs.js';
import { initReveal } from './effects/reveal.js';
import { initFilters } from './ui/filters.js';
import { initNav } from './ui/nav.js';
import { renderGrid, renderMentions, renderPodium, renderTicker } from './ui/render.js';
import { initVideos } from './ui/video.js';

const podiumEl = document.querySelector('[data-podium]');
const gridEl = document.querySelector('[data-grid]');
const tickerTrackEl = document.querySelector('[data-ticker-track]');
const mentionsEl = document.querySelector('[data-mentions]');
const filtersEl = document.querySelector('[data-filters]');
const sortEl = document.querySelector('[data-sort]');
const statusEl = document.querySelector('[data-status]');

if (podiumEl && gridEl && tickerTrackEl && mentionsEl && filtersEl && sortEl && statusEl) {
  const podiumSongs = SONGS.slice(0, 3);
  const rankingSongs = SONGS.slice(3);

  renderTicker(tickerTrackEl, SONGS);
  renderPodium(podiumEl, podiumSongs);
  const items = renderGrid(gridEl, rankingSongs);
  renderMentions(mentionsEl, HONORABLE_MENTIONS);

  initVideos(document.body);
  initFilters({ filtersEl, sortEl, statusEl, gridEl, songs: rankingSongs, items });
  initNav();
  initReveal();
}
