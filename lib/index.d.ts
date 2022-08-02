import { Middleware } from 'middleware-io';
import { IQuestionMessageContext } from './interfaces';
declare class QuestionManager {
    private questions;
    private answerTimeLimit;
    get [Symbol.toStringTag](): string;
    constructor();
    /**
     * Middleware-функция - является основным функционалом.
     */
    get middleware(): Middleware<IQuestionMessageContext>;
}
export * from './interfaces';
export * from './structures';
export { QuestionManager };
export default QuestionManager;
