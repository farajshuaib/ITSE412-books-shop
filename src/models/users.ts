
export class User {
  name: string = "";
  email: string = "";
  password: string = "";
  rule?: "StoreManager" | "StoreEmployee" | "Customer" = "Customer";

  constructor({
    name,
    email,
    password,
    rule,
  }: {
    name: string;
    email: string;
    password: string;
    rule?: "StoreManager" | "StoreEmployee" | "Customer";
  }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.rule = rule || "Customer";
  }
}

