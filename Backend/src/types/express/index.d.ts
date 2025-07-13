// throws a TypeScript error, because TypeScript doesn't know req.user exists on Express.Request
// so,
import { UserDocument } from "../user.types"; // adjust path if needed

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument; // mark optional
    }
  }
}


