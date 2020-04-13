'use strict';

const gImages = [
  {
    id: 1,
    url: 'img/2.jpg',
    keywords: ['happy'],
  },
  {
    id: 2,
    url: 'img/003.jpg',
    keywords: ['trump', 'man', 'finger', 'angry'],
  },
  {
    id: 3,
    url: 'img/004.jpg',
    keywords: ['puppies', 'cute'],
  },
  {
    id: 4,
    url: 'img/005.jpg',
    keywords: ['sleep', 'cute'],
  },
  {
    id: 5,
    url: 'img/5.jpg',
    keywords: ['boy', 'strong', 'funny'],
  },
  {
    id: 6,
    url: 'img/006.jpg',
    keywords: ['cat', 'sleep', 'cute'],
  },
  {
    id: 7,
    url: 'img/8.jpg',
    keywords: ['lets talk', 'man', 'funny'],
  },
  {
    id: 8,
    url: 'img/9.jpg',
    keywords: ['evil', 'boy', 'laughing', 'funny'],
  },
  {
    id: 9,
    url: 'img/12.jpg',
    keywords: ['you', 'man', 'funny'],
  },
  {
    id: 10,
    url: 'img/19.jpg',
    keywords: ['wtf', 'man', 'funny'],
  },
  {
    id: 11,
    url: 'img/Ancient-Aliens.jpg',
    keywords: ['aliens', 'man', 'funny'],
  },
  {
    id: 12,
    url: 'img/drevil.jpg',
    keywords: ['evil', 'man', 'funny'],
  },
  {
    id: 13,
    url: 'img/img2.jpg',
    keywords: ['funny', 'african', 'boys', 'boy', 'dance'],
  },
  {
    id: 14,
    url: 'img/img4.jpg',
    keywords: ['trump', 'finger', 'angry', 'man'],
  },
  {
    id: 15,
    url: 'img/img5.jpg',
    keywords: ['surpriced', 'boy', 'funny'],
  },
  {
    id: 16,
    url: 'img/img6.jpg',
    keywords: ['gym', 'dog', 'funny'],
  },
  {
    id: 17,
    url: 'img/img11.jpg',
    keywords: ['obama', 'laughing', 'funny'],
  },
  {
    id: 18,
    url: 'img/img12.jpg',
    keywords: ['man', 'basketball', 'kiss'],
  },
  {
    id: 19,
    url: 'img/leo.jpg',
    keywords: ['man', 'leo', 'dicaprio', 'cheers'],
  },
  {
    id: 20,
    url: 'img/meme1.jpg',
    keywords: ['man', 'morpheus', 'what if i told you'],
  },
  {
    id: 21,
    url: 'img/One-Does-Not-Simply.jpg',
    keywords: ['man', 'boromir', 'sean bean', 'one does not simply'],
  },
  {
    id: 22,
    url: 'img/Oprah-You-Get-A.jpg',
    keywords: ['woman', 'oprah'],
  },
  {
    id: 23,
    url: 'img/patrick.jpg',
    keywords: ['man', 'patrick', 'star trek', 'funny'],
  },
  {
    id: 24,
    url: 'img/putin.jpg',
    keywords: ['man', 'putin'],
  },
  {
    id: 25,
    url: 'img/X-Everywhere.jpg',
    keywords: ['everywhere', 'toys'],
  },
];

// eslint-disable-next-line no-unused-vars
function getImageById(id) {
  return gImages
    .find(img => img.id === id);
}

function getImagesForDisplay() {
  return gImages;
}

function getImagesByKeyword(txt) {
  if (!txt) return gImages;
  return gImages.filter(img => img.keywords.includes(txt));
}
