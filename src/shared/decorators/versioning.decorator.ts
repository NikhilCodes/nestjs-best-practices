import { applyDecorators } from '@nestjs/common';

export function Version(version: number | number[]) {
  return applyDecorators(
    Reflect.metadata(
      'module:version',
      typeof version === 'number' ? [version] : version,
    ),
  );
}
