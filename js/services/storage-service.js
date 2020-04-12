'use strict';

/* eslint-disable no-unused-vars */

function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function loadFromStorage(key) {
  const val = localStorage.getItem(key);
  return JSON.parse(val);
}
