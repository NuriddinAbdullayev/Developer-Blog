import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const User = createParamDecorator((key: string | undefined, context: ExecutionContext) => {
  const user = context.switchToHttp().getRequest<{ user?: Record<string, unknown> }>().user;
  return key ? user?.[key] : user;
});
