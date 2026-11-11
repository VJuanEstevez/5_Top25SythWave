import { GENRE_LABELS } from '../data/songs.js';

const ACCENTS = ['magenta', 'cyan', 'acid', 'violet'];

function pad(rank) {
  return String(rank).padStart(2, '0');
}

function createCard(song, index) {
  const accent = ACCENTS[(song.rank - 1) % ACCENTS.length];

  const article = document.createElement('article');
  article.className = `card card--accent-${accent}`;
  article.dataset.rank = String(song.rank);
  article.dataset.year = String(song.year);
  article.dataset.genre = song.genre;
  article.setAttribute('data-reveal', '');
  article.style.setProperty('--reveal-index', String(index % 6));

  const media = document.createElement('div');
  media.className = 'card__media';
  media.dataset.video = '';
  media.dataset.id = song.yt;
  media.dataset.videoTitle = `${song.title} — ${song.artist}`;

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'card__play';
  button.dataset.play = '';
  button.setAttribute(
    'aria-label',
    `Reproducir el videoclip de ${song.title}, de ${song.artist}`,
  );

  const thumb = document.createElement('img');
  thumb.src = `https://i.ytimg.com/vi/${song.yt}/hqdefault.jpg`;
  thumb.alt = `Miniatura del videoclip de ${song.title} — ${song.artist}`;
  thumb.loading = 'lazy';
  thumb.width = 480;
  thumb.height = 360;

  const icon = document.createElement('span');
  icon.className = 'card__play-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = '▶';

  button.append(thumb, icon);
  media.append(button);

  const body = document.createElement('div');
  body.className = 'card__body';

  const rank = document.createElement('span');
  rank.className = 'card__rank';
  rank.setAttribute('aria-hidden', 'true');
  rank.textContent = pad(song.rank);

  const meta = document.createElement('p');
  meta.className = 'card__meta';

  const year = document.createElement('span');
  year.className = 'card__year';
  year.textContent = String(song.year);

  const genre = document.createElement('span');
  genre.className = 'card__genre';
  genre.textContent = GENRE_LABELS[song.genre] ?? song.genre;

  meta.append(year, genre);

  const title = document.createElement('h3');
  title.className = 'card__title';
  title.textContent = song.title;

  const artist = document.createElement('p');
  artist.className = 'card__artist';
  artist.textContent = song.artist;

  const blurb = document.createElement('p');
  blurb.className = 'card__blurb';
  blurb.textContent = song.blurb;

  body.append(rank, meta, title, artist, blurb);
  article.append(media, body);

  return article;
}

export function renderPodium(container, songs) {
  const fragment = document.createDocumentFragment();
  songs.forEach((song, index) => fragment.append(createCard(song, index)));
  container.append(fragment);
}

export function renderGrid(container, songs) {
  const items = new Map();
  const fragment = document.createDocumentFragment();
  songs.forEach((song, index) => {
    const card = createCard(song, index);
    items.set(song.rank, card);
    fragment.append(card);
  });
  container.append(fragment);
  return items;
}

export function renderTicker(track, songs) {
  const items = songs.map((song) => {
    const span = document.createElement('span');
    span.className = 'ticker__item';
    span.textContent = `${pad(song.rank)} ${song.title} — ${song.artist}`;
    return span;
  });
  track.append(...items, ...items.map((item) => item.cloneNode(true)));
}

export function renderMentions(container, mentions) {
  const fragment = document.createDocumentFragment();
  for (const mention of mentions) {
    const li = document.createElement('li');
    li.className = 'mention';

    const text = document.createTextNode(`${mention.title} — ${mention.artist} `);

    const year = document.createElement('span');
    year.className = 'mention__year';
    year.textContent = String(mention.year);

    li.append(text, year);
    fragment.append(li);
  }
  container.append(fragment);
}
