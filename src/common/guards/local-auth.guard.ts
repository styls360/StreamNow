import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { appConfig } from '../../configs';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(appConfig.auth.publicKey, [
            context.getHandler(),
            context.getClass()
        ]);

        if (isPublic) return true; // Allow access to public routes without JWT validation
        return super.canActivate(context);
    }
}
