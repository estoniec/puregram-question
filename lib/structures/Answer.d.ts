export declare class Answer {
    /**
     * Текст ответного сообщения
     */
    text: string | null;
    /**
     * Время, когда был дан ответ
     */
    createdAt: number;
    constructor({ text }: {
        text: string | null;
    });
    get [Symbol.toStringTag](): string;
}
