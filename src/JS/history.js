'use strict';

import {LS, toggleActive} from './main.js';
import {renderTransfer} from './transfer.js';

export function renderHeadTr(table) {
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

export function renderHistoryTr(table, page) {
    for (let i = 0; i < LS.length; i++) {
        const historyData = JSON.parse(LS.getItem(LS.key(0 + i)));
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

export function buttonListeners(table, pageH, pageT, form) {
    table.addEventListener('click', (evt) => {
        const t = evt.target;
        const trId = t.closest('tr').dataset.id;
        if (t.classList.contains('btn-delete')) {
            t.closest('tr').remove();
            LS.removeItem(trId);
        } else if (t.classList.contains('btn-repeat')) {
            toggleActive(pageH);
            renderTransfer(pageT);
            const form = document.querySelector('form');
            const trans = JSON.parse(LS.getItem(trId));
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