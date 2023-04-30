import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const token = authHeader.split(' ')[1]; // Extract the token from the header
      try {
        const decoded = await this.jwtService.verifyAsync(token); // Decode the JWT token
        req['userId'] = decoded.sub; // Attach the user id to the request object
      } catch (err) {
        // Token is invalid or expired, you can handle this case if needed
      }
    }

    next();
  }
}
