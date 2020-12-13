'use strict';

export function getDate() {
    const now = new Date();
    return `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`;
}

export function renderKeys(obj) {
    if (obj.length == 0) {
      return 0;
    } else {
      const newArr = Array.from(obj);
      const newKey = Math.max(...newArr);
      return newKey;
    }
}

export function formatCardNumber(inp) {
    if (inp.value.length < 16) {
        inp.setCustomValidity('Введены не все символы');
    } else {
        inp.setCustomValidity('');
    }
    let cardCode = inp.value.replace(/\D/g, '').substring(0, 16);
    cardCode = cardCode != '' ? cardCode.match(/.{1,4}/g).join(' ') : '';
    inp.value = cardCode;
}

export function getForm(obj) {
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        formData.append('date', getDate());
        formData.append('id', renderKeys(Object.keys(obj)) + 1);
        const json = JSON.stringify(Object.fromEntries(formData.entries()));
        obj.setItem(renderKeys(Object.keys(obj)) + 1, json);
        form.reset();
    });
}