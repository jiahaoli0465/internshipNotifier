import "express";

declare global {
  namespace Express {
    interface Request {
      oidc?: {
        isAuthenticated(): boolean;
        user?: {
          sub: string;
          name: string;
          email: string;
        };
      };
    }
  }
}
