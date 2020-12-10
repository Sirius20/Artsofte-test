'use strict';
import {renderTransfer} from './transfer.js';
import {renderHeadTr, renderHistoryTr, buttonListeners} from './history.js';
import * as data from './utilits.js';

const body = document.querySelector('body');
export const LS = localStorage;

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

renderTransfer(transfer);

export function toggleActive(page) {
    transferButton.classList.toggle('active-page');
    historyButton.classList.toggle('active-page');
    historyPage.classList.toggle('invisible');
    transfer.classList.toggle('invisible');
    page.innerHTML = '';
}

export function formListeners() {
    transferButton.addEventListener('click', () => {
        if (!transferButton.classList.contains('active-page')) {
            toggleActive(historyPage);
            renderTransfer(transfer);
        }
    });
    const form = document.querySelector('form');
    const sum = form.querySelector('#sum');
    const cardPay = form.querySelector('#cardPay');
    const cardRecipient = form.querySelector('#cardRecipient');
    const cardName = form.querySelector('#cardName');

    cardPay.addEventListener('input', () => {
    data.formatCardNumber(cardPay);
    });

    cardRecipient.addEventListener('input', () => {
        data.formatCardNumber(cardRecipient);
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

            renderHeadTr(table);
            renderHistoryTr(table, historyPage);
            
        }
        const table = historyPage.querySelector('table');
        buttonListeners(table, historyPage, transfer);
    });
}

historyListeners();