import { Answer } from '../structures';
export interface IQuestionMessageContext {
    /**
     * @param message Текст вопроса
     * @param params Параметры отправляемого сообщения
     */
    question: (message: string) => Promise<Answer>;
}
