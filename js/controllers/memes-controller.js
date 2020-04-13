/* eslint-disable no-use-before-define */

'use strict';

let canvas;
let ctx;
const dataURLs = [];

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
  memes.forEach((meme, i) => memeToURL(meme, i));
  setTimeout(() => {
    memes.forEach((meme, i) => {
      renderMemePreview(meme, i);
    });
  }, 1000);
}

function renderMemePreview(meme, i) {
  const elMemes = document.querySelector('.memes');
  const memeHTML = `
  <img src="${dataURLs[i]}" onclick='onEditMeme(${JSON.stringify(meme)})'>
  `;
  elMemes.innerHTML += memeHTML;
}

function memeToURL(meme, i) {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  const {
    selectedImgId,
    lines,
  } = meme;
  const img = document.createElement('img');
  // eslint-disable-next-line no-undef
  img.src = getImageById(selectedImgId).url;
  img.onload = () => {
    drawImg(img);
    drawLines(lines);
    const dataURL = canvas.toDataURL();
    dataURLs[i] = dataURL;
  };
}

function drawImg(img) {
  const imgWidth = img.naturalWidth;
  const imgHeight = img.naturalHeight;
  const imgAspectRatio = imgWidth / imgHeight;
  const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  let canvasWidth = vh * 0.6;
  // eslint-disable-next-line no-undef
  if (isMobileDevice()) {
    canvasWidth = vw - 32;
  }
  const canvasHeight = canvasWidth / imgAspectRatio;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
}

function drawLines(lines) {
  if (lines.length < 1) return;
  lines.forEach((line) => {
    const {
      txt,
      size,
      weight,
      align,
      color,
      stroke,
      fontName,
      x,
      y,
    } = line;
    ctx.lineWidth = '1';
    ctx.strokeStyle = stroke;
    ctx.fillStyle = color;
    ctx.font = `${weight} ${size}px ${fontName}`;
    ctx.textAlign = align;
    ctx.textBaseline = 'bottom';
    ctx.fillText(txt, x, y);
    ctx.strokeText(txt, x, y);
  });
}

// eslint-disable-next-line no-unused-vars
function onEditMeme(meme) {
  // eslint-disable-next-line no-undef
  setCurrentMeme(meme);
  // eslint-disable-next-line no-undef
  renderEditor();
}
