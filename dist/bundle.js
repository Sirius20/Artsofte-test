/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/SCSS/main.scss":
/*!****************************!*\
  !*** ./src/SCSS/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/JS/history.js":
/*!***************************!*\
  !*** ./src/JS/history.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderHeadTr": () => /* binding */ renderHeadTr,
/* harmony export */   "renderHistoryTr": () => /* binding */ renderHistoryTr,
/* harmony export */   "buttonListeners": () => /* binding */ buttonListeners
/* harmony export */ });
/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.js */ "./src/JS/main.js");
/* harmony import */ var _transfer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transfer.js */ "./src/JS/transfer.js");





function renderHeadTr(table) {
    const headTr = document.createElement('tr');
    headTr.innerHTML = `
        <th>№</th>
        <th>Карта плательщика</th>
        <th>Карта получателя</th>
        <th>Сумма</th>
        <th>Дата выполнения</th>
        <th>Действие</th>        
    `;
    table.append(headTr);
}

function renderHistoryTr(table, page) {
    for (let i = 0; i < _main_js__WEBPACK_IMPORTED_MODULE_0__.LS.length; i++) {
        const historyData = JSON.parse(_main_js__WEBPACK_IMPORTED_MODULE_0__.LS.getItem(_main_js__WEBPACK_IMPORTED_MODULE_0__.LS.key(0 + i)));
        const element = document.createElement('tr');
        element.setAttribute('data-id', historyData.id);
        element.innerHTML = `
            <td>${1 + i}</td>
            <td>${hidingNumber(historyData.cardPay)}</td>
            <td>${hidingNumber(historyData.cardRecipient)}</td>
            <td>${historyData.sum}</td>
            <td>${historyData.date}</td>
            <td>
                <button class="btn btn-repeat">Повторить</button>
                <button class="btn btn-delete">Удалить</button>
            </td>
        `;
        table.append(element);
    }
    page.append(table);
}

function buttonListeners(table, pageH, pageT, form) {
    table.addEventListener('click', (evt) => {
        const t = evt.target;
        const trId = t.closest('tr').dataset.id;
        if (t.classList.contains('btn-delete')) {
            t.closest('tr').remove();
            _main_js__WEBPACK_IMPORTED_MODULE_0__.LS.removeItem(trId);
        } else if (t.classList.contains('btn-repeat')) {
            (0,_main_js__WEBPACK_IMPORTED_MODULE_0__.toggleActive)(pageH);
            (0,_transfer_js__WEBPACK_IMPORTED_MODULE_1__.renderTransfer)(pageT);
            const form = document.querySelector('form');
            const trans = JSON.parse(_main_js__WEBPACK_IMPORTED_MODULE_0__.LS.getItem(trId));
            form.cardPay.value = trans.cardPay;
            form.cardName.value = trans.cardName;
            form.cardRecipient.value = trans.cardRecipient;
            form.sum.value = trans.sum;
            form.month.value = trans.month;
            form.year.value = trans.year;
        }
    });
}

function hidingNumber(num) {
    const hideNum = num.slice(0, 4) + ' **** **** ' + num.slice(-4);
    return hideNum;
}

/***/ }),

/***/ "./src/JS/main.js":
/*!************************!*\
  !*** ./src/JS/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LS": () => /* binding */ LS,
/* harmony export */   "toggleActive": () => /* binding */ toggleActive,
/* harmony export */   "formListeners": () => /* binding */ formListeners
/* harmony export */ });
/* harmony import */ var _transfer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transfer.js */ "./src/JS/transfer.js");
/* harmony import */ var _history_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./history.js */ "./src/JS/history.js");
/* harmony import */ var _utilits_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilits.js */ "./src/JS/utilits.js");





const body = document.querySelector('body');
const LS = localStorage;

function renderPage() {
    body.innerHTML = `
    <h1>Перевод с карты на карту</h1>
    <nav class="navigations">
        <ul class="navigations-list">
            <li class="navigations-item transfer-button active-page"><button>Создать перевод</button></li>
            <li class="navigations-item history-button"><button>История переводов</button></li>
        </ul>
    </nav>
    <main>
        <div class="container">
            <div class="transfer">

            </div>
            <div class="history invisible">
            </div>
        </div>
    </main>
    `;
}

renderPage();

const transfer = document.querySelector('.transfer');
const historyPage = document.querySelector('.history');
const historyButton = document.querySelector('.history-button');
const transferButton = document.querySelector('.transfer-button');

(0,_transfer_js__WEBPACK_IMPORTED_MODULE_0__.renderTransfer)(transfer);

function toggleActive(page) {
    transferButton.classList.toggle('active-page');
    historyButton.classList.toggle('active-page');
    historyPage.classList.toggle('invisible');
    transfer.classList.toggle('invisible');
    page.innerHTML = '';
}

function formListeners() {
    transferButton.addEventListener('click', () => {
        if (!transferButton.classList.contains('active-page')) {
            toggleActive(historyPage);
            (0,_transfer_js__WEBPACK_IMPORTED_MODULE_0__.renderTransfer)(transfer);
        }
    });
    const form = document.querySelector('form');
    const sum = form.querySelector('#sum');
    const cardPay = form.querySelector('#cardPay');
    const cardRecipient = form.querySelector('#cardRecipient');
    const cardName = form.querySelector('#cardName');

    cardPay.addEventListener('input', () => {
    _utilits_js__WEBPACK_IMPORTED_MODULE_2__.formatCardNumber(cardPay);
    });

    cardRecipient.addEventListener('input', () => {
        _utilits_js__WEBPACK_IMPORTED_MODULE_2__.formatCardNumber(cardRecipient);
    });

    cardName.addEventListener('input', () => {
        cardName.value = cardName.value.replace(/\d/g, '');
    });

    sum.addEventListener('change', () => {
        if (sum.value <= 0) {
            sum.setCustomValidity('Неверное значение');
        } else {
            sum.setCustomValidity('');
        }
    });
}

function historyListeners() {
    historyButton.addEventListener('click', () => {
        if (!historyButton.classList.contains('active-page')) {
            toggleActive(transfer); 
            const table = document.createElement('table');

            (0,_history_js__WEBPACK_IMPORTED_MODULE_1__.renderHeadTr)(table);
            (0,_history_js__WEBPACK_IMPORTED_MODULE_1__.renderHistoryTr)(table, historyPage);
            
        }
        const table = historyPage.querySelector('table');
        (0,_history_js__WEBPACK_IMPORTED_MODULE_1__.buttonListeners)(table, historyPage, transfer);
    });
}

historyListeners();

/***/ }),

/***/ "./src/JS/transfer.js":
/*!****************************!*\
  !*** ./src/JS/transfer.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderTransfer": () => /* binding */ renderTransfer
/* harmony export */ });
/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.js */ "./src/JS/main.js");
/* harmony import */ var _utilits_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilits.js */ "./src/JS/utilits.js");




function renderTransfer(parent) {
    parent.innerHTML = `
        <form action="#">
            <div class="card-wrap">
                <div class="card card-pay">
                    <h2>Карта отправителя</h2>
                    <div class="card-number">
                        <input type="text" name="cardPay" id="cardPay" placeholder="Номер карты" maxlength="19" required>
                    </div>
                    <div class="card-discription">
                        <label for="cardName">Имя владельца</label>
                        <label for="month" for="year">Активна до</label>
                    </div>
                    <div class="card-date">
                        <input type="text" name="cardName" id="cardName" required>
                        <div>
                            <select name="month" id="month" required>
                                <option selected></option>
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                                <option value="06">06</option>
                                <option value="07">07</option>
                                <option value="08">08</option>
                                <option value="09">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                            <select name="year" id="year" required>
                                <option selected></option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="card card-recipient">
                    <h2>Карта получателя</h2>
                    <div class="card-number">
                        <input type="text" name="cardRecipient" id="cardRecipient" placeholder="Номер карты" maxlength="19" required>
                    </div>
                </div>
            </div>
            <div class="transfer-wrap">
                <input type="number" name="sum" id="sum" placeholder="Сумма" required>
                <button class="btn btn-submit">Перевести</button>
            </div>
        </form>
    `;
    (0,_utilits_js__WEBPACK_IMPORTED_MODULE_1__.getForm)(_main_js__WEBPACK_IMPORTED_MODULE_0__.LS);
    (0,_main_js__WEBPACK_IMPORTED_MODULE_0__.formListeners)();
}

/***/ }),

/***/ "./src/JS/utilits.js":
/*!***************************!*\
  !*** ./src/JS/utilits.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDate": () => /* binding */ getDate,
/* harmony export */   "renderKeys": () => /* binding */ renderKeys,
/* harmony export */   "formatCardNumber": () => /* binding */ formatCardNumber,
/* harmony export */   "getForm": () => /* binding */ getForm
/* harmony export */ });


function getDate() {
    const now = new Date();
    return `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`;
}

function renderKeys(obj) {
    if (obj.length == 0) {
      return 0;
    } else {
      const newArr = Array.from(obj);
      const newKey = Math.max(...newArr);
      return newKey;
    }
}

function formatCardNumber(inp) {
    if (inp.value.length < 16) {
        inp.setCustomValidity('Введены не все символы');
    } else {
        inp.setCustomValidity('');
    }
    let cardCode = inp.value.replace(/\D/g, '').substring(0, 16);
    cardCode = cardCode != '' ? cardCode.match(/.{1,4}/g).join(' ') : '';
    inp.value = cardCode;
}

function getForm(obj) {
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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/JS/main.js");
/******/ 	__webpack_require__("./src/SCSS/main.scss");
/******/ })()
;
//# sourceMappingURL=bundle.js.map