'use strict';

/* eslint-disable no-use-before-define */
// eslint-disable-next-line no-unused-vars
function renderGallery() {
  // eslint-disable-next-line no-undef
  closeMenu();
  const elGallery = document.querySelector('.gallery');
  const elEditor = document.querySelector('.editor-container');
  const elMemesContainer = document.querySelector('.memes-container');
  elEditor.style.display = 'none';
  elMemesContainer.style.display = 'none';
  elGallery.style.display = 'flex';
  const elGalleryImages = document.querySelector('.gallery-images-section');
  // eslint-disable-next-line no-undef
  const images = getImagesForDisplay();
  const imagesHTMLs = images.map(getImageHTML);
  elGalleryImages.innerHTML = imagesHTMLs.join('');
  window.onresize = null;
}

const getImageHTML = (image) => {
  const {
    id,
    url,
  } = image;
  return ` 
    <img
    src="${url}"
    alt="Meme image"
    data-id="${id}"
    onclick="onImgClick(this.dataset)">
  `;
};

// eslint-disable-next-line no-unused-vars
function onSearchImages(txt) {
  const elGalleryImages = document.querySelector('.gallery-images-section');
  elGalleryImages.innerHTML = '';
  // eslint-disable-next-line no-undef
  const images = getImagesByKeyword(txt);
  const imagesHTMLs = images.map(getImageHTML);
  elGalleryImages.innerHTML = imagesHTMLs.join('');
}

// eslint-disable-next-line no-unused-vars
function onImgClick({ id }) {
  // eslint-disable-next-line no-undef
  setSelectedImgId(id);
  // eslint-disable-next-line no-undef
  renderEditor();
}
