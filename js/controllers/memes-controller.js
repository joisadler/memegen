/* eslint-disable no-use-before-define */

'use strict';

// eslint-disable-next-line no-unused-vars
function renderMemes() {
  // eslint-disable-next-line no-undef
  closeMenu();
  const elMemesContainer = document.querySelector('.memes-container');
  const elGallery = document.querySelector('.gallery');
  const elEditor = document.querySelector('.editor-container');
  elGallery.style.display = 'none';
  elEditor.style.display = 'none';
  elMemesContainer.style.display = 'flex';

  const elMemes = document.querySelector('.memes');
  elMemes.innerHTML = '';

  // eslint-disable-next-line no-undef
  const memes = getMemesForDisplay();
  memes.forEach((meme) => {
    renderMemePreview(meme);
  });
}

function renderMemePreview(meme) {
  const elMemes = document.querySelector('.memes');
  const memeHTML = `
  <img src="${meme.dataURL}" onclick='onEditMeme(${JSON.stringify(meme)})'>
  `;
  elMemes.innerHTML += memeHTML;
}

// eslint-disable-next-line no-unused-vars
function onEditMeme(meme) {
  // eslint-disable-next-line no-undef
  setCurrentMeme(meme);
  // eslint-disable-next-line no-undef
  renderEditor();
}
