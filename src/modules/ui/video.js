let activeContainer = null;

function stop(container) {
  const iframe = container.querySelector('iframe');
  if (iframe) iframe.remove();

  const button = container.querySelector('[data-play]');
  if (button) button.hidden = false;

  delete container.dataset.playing;

  if (activeContainer === container) {
    activeContainer = null;
  }
}

function play(container) {
  if (activeContainer && activeContainer !== container) {
    stop(activeContainer);
  }

  if (container.dataset.playing === 'true') {
    stop(container);
    return;
  }

  const button = container.querySelector('[data-play]');
  if (!button) return;

  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${container.dataset.id}?autoplay=1&rel=0`;
  iframe.title = `Videoclip: ${container.dataset.videoTitle ?? ''}`;
  iframe.allow =
    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.allowFullscreen = true;

  container.append(iframe);
  button.hidden = true;
  container.dataset.playing = 'true';
  activeContainer = container;
}

export function initVideos(root) {
  root.addEventListener('click', (event) => {
    const button = event.target.closest('[data-play]');
    if (!button) return;

    const container = button.closest('[data-video]');
    if (!container) return;

    play(container);
  });
}
