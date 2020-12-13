'use strict';
import {formListeners, LS} from './main.js';
import {getForm} from './utilits.js';

export function renderTransfer(parent) {
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
    getForm(LS);
    formListeners();
}