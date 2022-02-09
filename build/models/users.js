"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor({ name, email, password, rule, }) {
        this.name = "";
        this.email = "";
        this.password = "";
        this.rule = "Customer";
        this.name = name;
        this.email = email;
        this.password = password;
        this.rule = rule || "Customer";
    }
}
exports.User = User;
//# sourceMappingURL=users.js.map