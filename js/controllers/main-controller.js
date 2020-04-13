'use strict';

/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */

let gCanvas = document.querySelector('#canvas');
let gCtx = gCanvas.getContext('2d');
let isLineDraggable = false;
let gCanvasForDownload;

// eslint-disable-next-line no-unused-vars
function onInit() {
  // eslint-disable-next-line no-undef
  renderGallery();
}

// eslint-disable-next-line no-unused-vars
function renderEditor() {
  gCanvas = document.querySelector('#canvas');
  gCtx = gCanvas.getContext('2d');
  const elGallery = document.querySelector('.gallery');
  const elEditor = document.querySelector('.editor-container');
  const elMemesContainer = document.querySelector('.memes-container');
  elMemesContainer.style.display = 'none';
  elGallery.style.display = 'none';
  elEditor.style.display = 'flex';

  // eslint-disable-next-line no-undef
  renderMeme(getCurrentMeme());
  // eslint-disable-next-line no-undef
  window.onresize = () => renderMeme(getCurrentMeme());
  const elCanvasContainer = document.querySelector('.canvas-container');
  elCanvasContainer.onmousemove = (e) => {
    if (isLineDraggable) {
      // eslint-disable-next-line no-undef
      setCurrentLineCoords(e.offsetX, e.offsetY);
      // eslint-disable-next-line no-undef
      renderMeme(getCurrentMeme());
    }
  };
  elCanvasContainer.onmouseup = () => {
    if (isLineDraggable) {
      isLineDraggable = false;
    }
  };
  elCanvasContainer.ontouchmove = (e) => {
    const offsetX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
    const offsetY = e.touches[0].pageY - e.touches[0].target.offsetTop;
    if (isLineDraggable) {
      // eslint-disable-next-line no-undef
      setCurrentLineCoords(offsetX, offsetY);
      // eslint-disable-next-line no-undef
      renderMeme(getCurrentMeme());
    }
  };
  elCanvasContainer.ontouchend = () => {
    if (isLineDraggable) {
      isLineDraggable = false;
    }
  };
}

function drawImage(img) {
  const elCanvasContainer = document.querySelector('.canvas-container');
  const imgWidth = img.naturalWidth;
  const imgHeight = img.naturalHeight;
  const imgAspectRatio = imgWidth / imgHeight;
  const canvasWidth = elCanvasContainer.offsetWidth;
  const canvasHeight = canvasWidth / imgAspectRatio;
  gCanvas.width = canvasWidth;
  gCanvas.height = canvasHeight;
  gCtx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
}

function _highlightLine(x, y, w, h) {
  gCtx.save();
  gCtx.beginPath();
  gCtx.setLineDash([5, 2]);
  gCtx.strokeStyle = 'white';
  gCtx.rect(x, y, w, h);
  gCtx.stroke();
  gCtx.fillStyle = 'transparent';
  gCtx.fillRect(x, y, w, h);
  gCtx.closePath();
  gCtx.restore();
}

function drawTextLines(lines, selectedLineIdx) {
  if (lines.length < 1) return;
  const elTextInput = document.querySelector('.text-input');
  const canvas = document.querySelector('#canvas');
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  lines.forEach((line, i) => {
    const {
      txt,
      size,
      weight,
      align,
      color,
      stroke,
      fontName,
    } = line;
    let { x, y } = line;
    gCtx.lineWidth = '1';
    gCtx.strokeStyle = stroke;
    gCtx.fillStyle = color;
    gCtx.font = `${weight} ${size}px ${fontName}`;
    gCtx.textAlign = align;
    gCtx.textBaseline = 'bottom';
    if (!x && !y) {
      x = canvasWidth / 2;
      if (i === 0) {
        y = size;
      } else if (i === 1) {
        y = canvasHeight;
      } else {
        y = canvasHeight / 2;
      }
      // eslint-disable-next-line no-undef
      setCurrentLineCoords(x, y);
    }
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
    if (i === selectedLineIdx) {
      elTextInput.value = txt;
      if (!isMobileDevice()) {
        elTextInput.focus();
      }
      gCanvasForDownload = cloneCanvas(gCanvas);
      const txtWidth = gCtx.measureText(txt).width;
      // eslint-disable-next-line no-undef
      setCurrentLineTextWidth(line, txtWidth);
      const highlightX = x - (txtWidth / 2);
      const highlightY = y - size;
      const highlightW = txtWidth;
      const highlightH = size;
      _highlightLine(highlightX, highlightY, highlightW, highlightH);
    }
  });
}

function renderMeme({
  selectedImgId,
  selectedLineIdx,
  lines,
}) {
  const img = document.createElement('img');
  // eslint-disable-next-line no-undef
  img.src = getImageById(selectedImgId).url;
  img.onload = () => {
    drawImage(img);
    drawTextLines(lines, selectedLineIdx);
  };
  const textInput = document.querySelector('.text-input');
  if (!isMobileDevice()) {
    textInput.focus();
  }
}

// eslint-disable-next-line no-unused-vars
function onChangeText(value) {
  // eslint-disable-next-line no-undef
  setSelectedLineText(value);
  // eslint-disable-next-line no-undef
  renderMeme(getCurrentMeme());
}

// eslint-disable-next-line no-unused-vars
function onIncreaseFontSize() {
  // eslint-disable-next-line no-undef
  increaseCurrentLineFontsize();
  // eslint-disable-next-line no-undef
  renderMeme(getCurrentMeme());
}

// eslint-disable-next-line no-unused-vars
function onDecreaseFontSize() {
  // eslint-disable-next-line no-undef
  decreaseCurrentLineFontsize();
  // eslint-disable-next-line no-undef
  renderMeme(getCurrentMeme());
}

// eslint-disable-next-line no-unused-vars
function onAddNewLine() {
  // eslint-disable-next-line no-undef
  addNewLine();
  // eslint-disable-next-line no-undef
  renderMeme(getCurrentMeme());
}

// eslint-disable-next-line no-unused-vars
function onDeleteCurrentLine() {
  // eslint-disable-next-line no-undef
  deleteCurrentLine();
  // eslint-disable-next-line no-undef
  renderMeme(getCurrentMeme());
}

// eslint-disable-next-line no-unused-vars
function onLineUp() {
  // eslint-disable-next-line no-undef
  moveCurrentLineUp();
  // eslint-disable-next-line no-undef
  renderMeme(getCurrentMeme());
}

// eslint-disable-next-line no-unused-vars
function onLineDown() {
  // eslint-disable-next-line no-undef
  moveCurrentLineDown();
  // eslint-disable-next-line no-undef
  renderMeme(getCurrentMeme());
}

// eslint-disable-next-line no-unused-vars
function onSwitchFocus() {
  // eslint-disable-next-line no-undef
  switchFocus();
  // eslint-disable-next-line no-undef
  renderMeme(getCurrentMeme());
}

// eslint-disable-next-line no-unused-vars
function onClickOnCanvas({ offsetX, offsetY }) {
  // eslint-disable-next-line no-undef
  const clickedLine = getLineByCoords(offsetX, offsetY);
  // eslint-disable-next-line no-undef
  selectLine(clickedLine || getActiveLine());
  // eslint-disable-next-line no-undef
  renderMeme(getCurrentMeme());
  isLineDraggable = true;
}

// eslint-disable-next-line no-unused-vars
function onTouchCanvas(e) {
  e.preventDefault();
  const offsetX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
  const offsetY = e.touches[0].pageY - e.touches[0].target.offsetTop;
  // eslint-disable-next-line no-undef
  const touchedLine = getLineByCoords(offsetX, offsetY);
  // eslint-disable-next-line no-undef
  selectLine(touchedLine || getActiveLine());
  // eslint-disable-next-line no-undef
  renderMeme(getCurrentMeme());
  isLineDraggable = true;
}

// eslint-disable-next-line no-unused-vars
function onChangeFontWeight(elButton) {
  if (elButton.innerText === 'Bold') elButton.innerText = 'Normal';
  else elButton.innerText = 'Bold';
  // eslint-disable-next-line no-undef
  changeFontWeight();
  // eslint-disable-next-line no-undef
  renderMeme(getCurrentMeme());
}

// eslint-disable-next-line no-unused-vars
function onSetFont({ value }) {
  // eslint-disable-next-line no-undef
  setFont(value);
  // eslint-disable-next-line no-undef
  renderMeme(getCurrentMeme());
}

// eslint-disable-next-line no-unused-vars
function onSetColor({ value }) {
  // eslint-disable-next-line no-undef
  setColor(value);
  // eslint-disable-next-line no-undef
  renderMeme(getCurrentMeme());
}

// eslint-disable-next-line no-unused-vars
function onSetStrokeColor({ value }) {
  // eslint-disable-next-line no-undef
  setStrokeColor(value);
  // eslint-disable-next-line no-undef
  renderMeme(getCurrentMeme());
}

// eslint-disable-next-line no-unused-vars
function onSave() {
  // eslint-disable-next-line no-undef
  const currentMemeClone = JSON.parse(JSON.stringify(getCurrentMeme()));
  // eslint-disable-next-line no-undef
  saveMemeToStorage(currentMemeClone);
  // eslint-disable-next-line no-undef
  renderMemes();
}

// eslint-disable-next-line no-unused-vars
function onDownload(elLink) {
  const data = gCanvasForDownload.toDataURL();
  elLink.href = data;
  elLink.download = 'my-img.png';
}

// eslint-disable-next-line no-unused-vars
function toggleMenu() {
  const hamburger = document.querySelector('.hamburger');
  hamburger.classList.toggle('is-active');
  document.body.classList.toggle('show-screen');
}

// eslint-disable-next-line no-unused-vars
function closeMenu() {
  const hamburger = document.querySelector('.hamburger');
  hamburger.classList.remove('is-active');
  document.body.classList.remove('show-screen');
}

function isMobileDevice() {
  return (typeof window.orientation !== 'undefined') ||
  (navigator.userAgent.indexOf('IEMobile') !== -1);
}

function cloneCanvas(oldCanvas) {
  const newCanvas = document.createElement('canvas');
  const context = newCanvas.getContext('2d');
  newCanvas.width = oldCanvas.width;
  newCanvas.height = oldCanvas.height;
  context.drawImage(oldCanvas, 0, 0);
  return newCanvas;
}
