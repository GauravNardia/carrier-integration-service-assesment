export abstract class BaseError extends Error {
    abstract readonly code: string;
    readonly retryable: boolean;

    protected constructor(message: string, retryable = false) {
      super(message);
      this.retryable = retryable;
    }

}