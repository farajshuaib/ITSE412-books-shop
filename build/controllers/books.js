"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const FetchBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
const CreateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
const UpdateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
const DeleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
module.exports = { FetchBook, CreateBook, getBookById, DeleteBook, UpdateBook };
//# sourceMappingURL=books.js.map