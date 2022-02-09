export class Book {
  name = "";
  specialization = "";
  price = 0;
  publisher = "";
  created_at = new Date();
  author_id = "";
  owner_id = "";

  constructor({
    name,
    specialization,
    price,
    publisher,
    author_id,
    owner_id,
  }: {
    name: string;
    specialization: string;
    price: number;
    publisher: string;
    author_id: string;
    owner_id: string;
  }) {
    this.name = name;
    this.specialization = specialization;
    this.price = price;
    this.publisher = publisher;
    this.created_at = new Date();
    this.author_id = author_id;
    this.owner_id = owner_id;
  }
}
