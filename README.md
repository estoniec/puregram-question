# PUREGRAM-QUESTION
### Описание
Небольшой модуль для системы "Вопрос-Ответ".

Интегрируется в цепь *middleware* puregram

КОПИЯ VK-IO-QUESTION (https://www.npmjs.com/package/vk-io-question)

[![npm package](https://nodei.co/npm/puregram-question.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/puregram-question/)

### Установка
**npm**
```bash
npm i -S puregram-question
```

**yarn**
```bash
yarn add puregram-question
```

### Использование
JavaScript

```js
const { Telegram } = require('puregram')

const { QuestionManager } = require('puregram-question');

const telegram = Telegram.fromToken(process.env.TOKEN)

const questionManager = new QuestionManager();

telegram.updates.use(questionManager.middleware);

telegram.updates.on('message', (msg) => {
    const answer = await msg.question(
        'Согласны-ли Вы на обработку персональных данных?'
    );

    if (!/да|yes|согласен|конечно/i.test(answer.text)) {
        await msg.send('Тогда, мы не можем совершить регистрацию');

        return;
    }

    await msg.send('Отлично, тогда продолжим');

    const age = await msg.question('Введите Ваш возраст');
    const email = await msg.question('Введите Ваш имейл');
    const phone = await msg.question('Введите Ваш номер телефона');

    await msg.send(
        `Возраст: ${age.text}\nЭл. адрес: ${email.text}\nТелефон: ${phone.text}`
    );
});

telegram.updates.startPolling()
```

Метод отправки вопроса

```js
const answer = await msg.question(message);
```

|Параметр|Тип|Описание|
|-|-|-|
|message|string|Задаваемый вопрос|

Ответ

|Параметр|Тип|Описание|
|-|-|-|
|answer|Promise\<Answer\>|Основной объект ответа|
|answer.text|string \| null|Текст сообщения|
|answer.createdAt|number|Время, когда был дан ответ|
