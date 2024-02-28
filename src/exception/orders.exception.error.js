export class OrdersError extends Error {
  constructor(message) {
    super(message);
    this.name = "OrdersError";
    this.message = message; 
  }
}