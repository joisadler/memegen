'use strict';

// eslint-disable-next-line no-undef, no-use-before-define
const gMemes = getMemesFromStorage() ? getMemesFromStorage() : getDefaultMemes();

let gMeme = {
  selectedImgId: 3,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'Your text',
      size: 30,
      align: 'center',
      weight: 'bold',
      color: 'white',
      stroke: 'black',
      fontName: 'Impact',
      x: null,
      y: null,
      textWidth: 0,
    },
  ],
};

function getMemesFromStorage() {
  // eslint-disable-next-line no-undef
  return loadFromStorage('memes');
}

// eslint-disable-next-line no-unused-vars
function saveMemeToStorage(meme) {
  gMemes.push(meme);
  // eslint-disable-next-line no-undef
  saveToStorage('memes', gMemes);
}

// eslint-disable-next-line no-unused-vars
function getMemesForDisplay() {
  // eslint-disable-next-line no-undef
  return getMemesFromStorage() ? getMemesFromStorage() : getDefaultMemes();
}

// eslint-disable-next-line no-unused-vars
function getCurrentMeme() {
  return gMeme;
}

// eslint-disable-next-line no-unused-vars
function setCurrentMeme(meme) {
  gMeme = meme;
}

// eslint-disable-next-line no-unused-vars
function setSelectedLineText(txt) {
  const idx = gMeme.selectedLineIdx;
  gMeme.lines[idx].txt = txt;
}

// eslint-disable-next-line no-unused-vars
function setSelectedImgId(id) {
  gMeme.selectedImgId = +id;
}

// eslint-disable-next-line no-unused-vars
function increaseCurrentLineFontsize() {
  const currentLineIdx = gMeme.selectedLineIdx;
  const currentLine = gMeme.lines[currentLineIdx];
  currentLine.size++;
}

// eslint-disable-next-line no-unused-vars
function decreaseCurrentLineFontsize() {
  const currentLineIdx = gMeme.selectedLineIdx;
  const currentLine = gMeme.lines[currentLineIdx];
  currentLine.size--;
}

// eslint-disable-next-line no-unused-vars
function addNewLine() {
  gMeme.lines.push({
    txt: 'Your text',
    size: 30,
    align: 'center',
    weight: 'bold',
    color: 'white',
    stroke: 'black',
    fontName: 'Impact',
    x: null,
    y: null,
    textWidth: 0,
  });
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function getActiveLine() {
  return gMeme.lines[gMeme.selectedLineIdx];
}

// eslint-disable-next-line no-unused-vars
function deleteCurrentLine() {
  const currentLineIdx = gMeme.selectedLineIdx;
  gMeme.lines.splice(currentLineIdx, 1);
  gMeme.selectedLineIdx--;
}

// eslint-disable-next-line no-unused-vars
function setCurrentLineCoords(x, y) {
  const currentLine = getActiveLine();
  currentLine.x = x;
  currentLine.y = y;
}

// eslint-disable-next-line no-unused-vars
function setCurrentLineTextWidth(line, textWidth) {
  const currentLineIdx = gMeme.lines.indexOf(line);
  const currentLine = gMeme.lines[currentLineIdx];
  currentLine.textWidth = textWidth;
}

// eslint-disable-next-line no-unused-vars
function moveCurrentLineUp() {
  const currentLine = getActiveLine();
  currentLine.y++;
}

// eslint-disable-next-line no-unused-vars
function moveCurrentLineDown() {
  const currentLine = getActiveLine();
  currentLine.y--;
}

// eslint-disable-next-line no-unused-vars
function switchFocus() {
  if (gMeme.lines.length === 0) return;
  if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
    gMeme.selectedLineIdx = 0;
  } else {
    gMeme.selectedLineIdx++;
  }
}

// eslint-disable-next-line no-unused-vars
function selectLine(line) {
  const idx = gMeme.lines.indexOf(line);
  gMeme.selectedLineIdx = idx;
}

// eslint-disable-next-line no-unused-vars
function getLineByCoords(offsetX, offsetY) {
  const clickedLine = gMeme.lines.find((line) => {
    const startX = line.x - (line.textWidth / 2);
    const startY = line.y - line.size;
    const endX = startX + line.textWidth;
    const endY = line.y;
    return offsetX > startX
          && offsetX < endX
          && offsetY > startY
          && offsetY < endY;
  });
  return clickedLine;
}

// eslint-disable-next-line no-unused-vars
function changeFontWeight() {
  const currentLine = getActiveLine();
  if (currentLine.weight === 'normal') currentLine.weight = 'bold';
  else currentLine.weight = 'normal';
}

// eslint-disable-next-line no-unused-vars
function setFont(value) {
  const currentLine = getActiveLine();
  currentLine.fontName = value;
}

// eslint-disable-next-line no-unused-vars
function setColor(value) {
  const currentLine = getActiveLine();
  currentLine.color = value;
}

// eslint-disable-next-line no-unused-vars
function setStrokeColor(value) {
  const currentLine = getActiveLine();
  currentLine.stroke = value;
}
