import Iterator from "./Iterator";

export default class FilterIterator<T> implements Iterator<T> {
    private nextItem: T | undefined;
    private done = false;

    constructor(
        private readonly predicate: (T) => boolean,
        private readonly iterator: Iterator<T>
    ) {}

    hasNext(): boolean {
        this.processNext();
        return !this.done;
    }

    next(): T {
        this.processNext();
        const result = this.nextItem!;
        this.nextItem = undefined;
        return result;
    }

    private processNext() {
        if (this.done || this.nextItem !== undefined) {
            return;
        }
        while (this.iterator.hasNext()) {
            const item = this.iterator.next();
            if (this.predicate(item)) {
                this.nextItem = item;
                return;
            }
        }
        this.done = true;
    }
}