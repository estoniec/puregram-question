import { Answer } from '../structures';
export interface IQuestion {
    resolve: (value?: any) => void;
    startTime: number;
}
export interface IQuestionMessageContext {
    /**
     * @param message Текст вопроса
     */
    question: (message: string) => Promise<Answer>;
}
