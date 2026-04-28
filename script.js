function initGallery(galleryImages) {
  const grid = document.getElementById("galleryGrid");
  const gallerySection = document.querySelector(".gallery");

  if (!grid) return;

  const placeholder = grid.querySelector(".loading-placeholder");
  if (placeholder) placeholder.remove();

  if (!galleryImages || galleryImages.length === 0) {
    if (gallerySection) gallerySection.style.display = "none";
    return;
  }

  let expanded = false;
  const visibleCount = 9;

  // MORE 버튼 (HTML에 없어도 JS가 생성)
  const moreBtn = document.createElement("button");
  moreBtn.className = "gallery__more";

  function render() {
    grid.innerHTML = "";

    const imagesToShow = expanded
      ? galleryImages
      : galleryImages.slice(0, visibleCount);

    imagesToShow.forEach((src, i) => {
      const div = document.createElement("div");
      div.className = "gallery__item animate-item";
      div.setAttribute("data-animate", "scale-in");

      div.innerHTML = `<img src="${src}" alt="갤러리 사진 ${i + 1}" loading="lazy">`;

      div.addEventListener("click", () => {
        openPhotoModal(galleryImages, i);
      });

      grid.appendChild(div);
    });

    moreBtn.textContent = expanded ? "접기 ▲" : "더보기 ▼";
  }

  moreBtn.addEventListener("click", () => {
    expanded = !expanded;
    render();
  });

  render();

  // 9장 이상일 때만 버튼 추가
  if (galleryImages.length > visibleCount) {
    gallerySection.appendChild(moreBtn);
  }
}
