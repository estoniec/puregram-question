'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class Answer {
    constructor({ text }) {
        /**
         * Является ли данный ответ, неотвеченным вовремя
         */
        this.text = text;
        this.createdAt = Date.now();
    }
    get [Symbol.toStringTag]() {
        return this.constructor.name;
    }
}

class QuestionManager {
    constructor() {
        this.questions = new Map();
    }
    get [Symbol.toStringTag]() {
        return this.constructor.name;
    }
    /**
     * Middleware-функция - является основным функционалом.
     */
    get middleware() {
        return async (msg, next) => {
            if (!msg.text) {
                throw new TypeError('The message is missing text');
            }
            const currentQuestion = this.questions.get(msg.chat.id);
            if (currentQuestion) {
                currentQuestion.resolve(new Answer({
                    text: msg.text || null,
                }));
                return this.questions.delete(msg.chat.id);
            }
            /**
             * @param message  Отправляемое сообщение (вопрос)
             */
            msg.question = async (message) => {
                if (!message) {
                    throw new TypeError('Parameter `message` is required');
                }
                await msg.send(message);
                return new Promise((resolve) => {
                    const userId = msg.chat.id;
                    this.questions.set(userId, {
                        resolve,
                        startTime: Date.now()
                    });
                });
            };
            await next();
        };
    }
}

exports.Answer = Answer;
exports.QuestionManager = QuestionManager;
exports.default = QuestionManager;
