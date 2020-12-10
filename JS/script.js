'use strict';

// const container = document.querySelector('.container');
// const transfer = container.querySelector('.transfer');
// const historyPage = container.querySelector('.history');
// const form = transfer.querySelector('form');
// const historyButton = document.querySelector('.history-button');
// const transferButton = document.querySelector('.transfer-button');
// const sum = form.querySelector('#sum');
// const cardPay = form.querySelector('#cardPay');
// const cardRecipient = form.querySelector('#cardRecipient');

// const LS = localStorage;

// function getDate() {
//     const now = new Date();
//     return `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`;
// }

// function renderKeys(obj) {
//     if (obj.length == 0) {
//         return 0;
//     } else {
//         const newArr = Array.from(obj);
//         const newKey = Math.max(...newArr);
//         return newKey;
//     }
// }

// function getForm() {
//     form.addEventListener('submit', (e) => {
//         e.preventDefault();
//         const formData = new FormData(form);
//         formData.append('date', getDate());
//         formData.append('id', renderKeys(Object.keys(LS)) + 1);
//         console.log(Object.keys(LS));
//         const json = JSON.stringify(Object.fromEntries(formData.entries()));
//         LS.setItem(renderKeys(Object.keys(LS)) + 1, json);
//         form.reset();
//     });
// }

// historyButton.addEventListener('click', () => {
//     if (!historyButton.classList.contains('active-page')) {
//         toggleActive(transfer); 
//         const table = document.createElement('table');

//         renderHeadTr(table);
//         renderHistoryTr(table);
//     }
//     const table = historyPage.querySelector('table');
//     buttonListeners(table);
// });

// transferButton.addEventListener('click', () => {
//     if (!transferButton.classList.contains('active-page')) {
//         toggleActive(historyPage);
//         renderTransfer();
//     }
// });

// function renderTransfer() {
//     transfer.innerHTML = `
//             <form action="#">
//                 <div class="card-wrap">
//                     <div class="card card-pay">
//                         <h2>Карта отправителя</h2>
//                         <div class="card-number">
//                             <input type="text" name="cardPay" id="cardPay" placeholder="Номер карты" maxlength="19" required>
//                         </div>
//                         <div class="card-discription">
//                             <label for="cardName">Имя владельца</label>
//                             <label for="month" for="year">Активна до</label>
//                         </div>
//                         <div class="card-date">
//                             <input type="text" name="cardName" id="cardName" required>
//                             <div>
//                                 <select name="month" id="month" required>
//                                     <option selected></option>
//                                     <option value="01">01</option>
//                                     <option value="02">02</option>
//                                     <option value="03">03</option>
//                                     <option value="04">04</option>
//                                     <option value="05">05</option>
//                                     <option value="06">06</option>
//                                     <option value="07">07</option>
//                                     <option value="08">08</option>
//                                     <option value="09">09</option>
//                                     <option value="10">10</option>
//                                     <option value="11">11</option>
//                                     <option value="12">12</option>
//                                 </select>
//                                 <select name="year" id="year" required>
//                                     <option selected></option>
//                                     <option value="2020">2020</option>
//                                     <option value="2021">2021</option>
//                                     <option value="2022">2022</option>
//                                     <option value="2023">2023</option>
//                                     <option value="2024">2024</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="card card-recipient">
//                         <h2>Карта получателя</h2>
//                         <div class="card-number">
//                             <input type="text" name="cardRecipient" id="cardRecipient" placeholder="Номер карты" maxlength="19" required>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="transfer-wrap">
//                     <input type="number" name="sum" id="sum" placeholder="Сумма" required>
//                     <button class="btn btn-submit">Перевести</button>
//                 </div>
//             </form>
//         `;
// }

// cardPay.addEventListener('input', () => {
//     formatCardNumber(cardPay);
// });

// cardRecipient.addEventListener('input', () => {
//     formatCardNumber(cardRecipient);
// });

// sum.addEventListener('change', () => {
//     if (sum.value <= 0) {
//         sum.setCustomValidity('Неверное значение');
//         console.log(sum.value);
//     } else {
//         sum.setCustomValidity('');
//     }
// });

// function renderHeadTr(parent) {
//     const headTr = document.createElement('tr');
//     headTr.innerHTML = `
//         <th>№</th>
//         <th>Карта плательщика</th>
//         <th>Карта получателя</th>
//         <th>Сумма</th>
//         <th>Дата выполнения</th>
//         <th>Действие</th>        
//     `;
//     parent.append(headTr);
// }

// function renderHistoryTr(parent) {
//     for (let i = 0; i < LS.length; i++) {
//         const historyData = JSON.parse(LS.getItem(LS.key(0 + i)));
//         const element = document.createElement('tr');
//         element.setAttribute('data-id', historyData.id);
//         element.innerHTML = `
//             <td>${1 + i}</td>
//             <td>${hidingNumber(historyData.cardPay)}</td>
//             <td>${hidingNumber(historyData.cardRecipient)}</td>
//             <td>${historyData.sum}</td>
//             <td>${historyData.date}</td>
//             <td>
//                 <button class="btn btn-repeat">Повторить</button>
//                 <button class="btn btn-delete">Удалить</button>
//             </td>
//         `;
//         parent.append(element);
//     }
//     historyPage.append(parent);
// }

// function toggleActive(page) {
//     transferButton.classList.toggle('active-page');
//     historyButton.classList.toggle('active-page');
//     historyPage.classList.toggle('invisible');
//     transfer.classList.toggle('invisible');
//     page.innerHTML = '';
// }

// function buttonListeners(parent) {
//     parent.addEventListener('click', (evt) => {
//         const t = evt.target;
//         const trId = t.closest('tr').dataset.id;
//         if (t.classList.contains('btn-delete')) {
//             t.closest('tr').remove();
//             LS.removeItem(trId);
//         } else if (t.classList.contains('btn-repeat')) {
//             toggleActive(historyPage);
//             renderTransfer();
//             const trans = JSON.parse(LS.getItem(trId));
//             form.cardPay.value = trans.cardPay;
//             form.cardName.value = trans.cardName;
//             form.cardRecipient.value = trans.cardRecipient;
//             form.sum.value = trans.sum;
//             form.month.value = trans.month;
//             form.year.value = trans.year;
//         }
//     });
// }

// function hidingNumber(num) {
//     const hideNum = num.slice(0, 4) + ' **** **** ' + num.slice(-4);
//     return hideNum;
// }

// function formatCardNumber(inp) {
//     if (inp.value.length < 16) {
//         inp.setCustomValidity('Введены не все символы');
//     } else {
//         inp.setCustomValidity('');
//     }
//     let cardCode = inp.value.replace(/[^\d]/g, '').substring(0, 16);
//     cardCode = cardCode != '' ? cardCode.match(/.{1,4}/g).join(' ') : '';
//     inp.value = cardCode;
// }

getForm();
renderTransfer();