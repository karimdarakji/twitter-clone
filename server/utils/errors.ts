export default class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

class NotFoundError extends CustomError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

class ForbiddenError extends CustomError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

class ValidationError extends CustomError {
  constructor(message = "There was a validation error") {
    super(message, 400);
  }
}

export { NotFoundError, ForbiddenError, UnauthorizedError, ValidationError };