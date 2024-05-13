class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }

  public stringify(): string {
    return JSON.stringify({ message: this.message, status: this.status });
  }

  public parse(message: string): { message: string; status: number } {
    return JSON.parse(message);
  }
}

export default CustomError;
