export default class {
  private readonly statusCode: number;

  constructor(response: Response) {
    this.statusCode = response.status;
  }

  status() { return this.statusCode; }
}
