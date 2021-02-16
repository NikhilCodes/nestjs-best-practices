import { applyDecorators, SetMetadata } from '@nestjs/common';

export const VERSION_METADATA_KEY = 'method:version';
export const DEPRECATED_VERSION_METADATA_KEY = 'method:deprecate-version';

export function Version(version: number | number[]) {
  const versionCleaned = typeof version === 'number' ? [version] : version;
  return applyDecorators(
    Reflect.metadata(VERSION_METADATA_KEY, versionCleaned),
  );
}

export function Deprecate(version: number) {
  return applyDecorators(SetMetadata(DEPRECATED_VERSION_METADATA_KEY, version));
}
