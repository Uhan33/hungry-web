export class ReviewError extends Error {
  constructor(message) {
    super(message);
    this.name = "ReviewError";
    this.message = message; 
  }
}