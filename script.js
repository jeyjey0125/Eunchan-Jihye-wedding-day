/* ═══════════════════════════════════════════
   Gallery Section (9장 + MORE + modal 연결)
   ═══════════════════════════════════════════ */

function initGallery(galleryImages) {
  const grid = $('#galleryGrid');

  const placeholder = grid.querySelector('.loading-placeholder');
  if (placeholder) placeholder.remove();

  if (galleryImages.length === 0) {
    const gallerySection = $('#gallery');
    if (gallerySection) gallerySection.style.display = 'none';
    return;
  }

  let expanded = false;
  const visibleCount = 9;

  // MORE 버튼
  const moreBtn = document.createElement('button');
  moreBtn.className = 'gallery__more';

  function render() {
    grid.innerHTML = '';

    const imagesToShow = expanded
      ? galleryImages
      : galleryImages.slice(0, visibleCount);

    imagesToShow.forEach((src, i) => {
      const div = document.createElement('div');
      div.className = 'gallery__item animate-item';
      div.setAttribute('data-animate', 'scale-in');

      div.innerHTML = `<img src="${src}" alt="갤러리 사진 ${i + 1}" loading="lazy">`;

      div.addEventListener('click', () => openPhotoModal(galleryImages, i));

      grid.appendChild(div);
    });

    moreBtn.textContent = expanded ? 'LESS ▲' : 'MORE ▼';
  }

  moreBtn.addEventListener('click', () => {
    expanded = !expanded;
    render();
  });

  render();

  if (galleryImages.length > visibleCount) {
    grid.parentNode.appendChild(moreBtn);
  }
}

/* ═══════════════════════════════════════════
   이미지 저장 기본 방지 (우클릭/드래그)
   ═══════════════════════════════════════════ */

document.addEventListener('contextmenu', function (e) {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
  }
});

document.addEventListener('dragstart', function (e) {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
  }
});
