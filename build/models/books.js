"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
class Book {
    constructor({ name, specialization, price, publisher, author_id, owner_id, }) {
        this.name = "";
        this.specialization = "";
        this.price = 0;
        this.publisher = "";
        this.created_at = new Date();
        this.author_id = "";
        this.owner_id = "";
        this.name = name;
        this.specialization = specialization;
        this.price = price;
        this.publisher = publisher;
        this.created_at = new Date();
        this.author_id = author_id;
        this.owner_id = owner_id;
    }
}
exports.Book = Book;
//# sourceMappingURL=books.js.map