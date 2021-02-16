import { METHOD_METADATA, PATH_METADATA } from '@nestjs/common/constants';
import { RequestMethod } from '@nestjs/common/enums';
import { VERSION_METADATA_KEY } from './versioning.decorator';

function prependVersionPrefixToPaths(
  paths: string | string[],
  prefixes: string[],
): string[] {
  const pathCleaned = typeof paths === 'string' ? [paths] : paths;
  const combinedPaths = [];
  pathCleaned.forEach((path) => {
    if (path[0] !== '/' && path !== '') {
      path = '/' + path;
    }

    if (!prefixes) {
      combinedPaths.push(path);
    } else {
      prefixes.forEach((prefix) => {
        combinedPaths.push(`v${prefix}` + path);
      });
    }
  });
  return combinedPaths;
}

export function Get(path: string | string[] = ''): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    const versions: string[] = Reflect.getMetadata(
      VERSION_METADATA_KEY,
      target,
      propertyKey,
    );
    Reflect.defineMetadata(
      PATH_METADATA,
      prependVersionPrefixToPaths(path, versions),
      descriptor.value,
    );
    Reflect.defineMetadata(
      METHOD_METADATA,
      RequestMethod.GET,
      descriptor.value,
    );
    return descriptor;
  };
}

export function Post(path: string | string[] = ''): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    const version = Reflect.getMetadata(
      VERSION_METADATA_KEY,
      target,
      propertyKey,
    );
    Reflect.defineMetadata(
      PATH_METADATA,
      prependVersionPrefixToPaths(path, version),
      descriptor.value,
    );
    Reflect.defineMetadata(
      METHOD_METADATA,
      RequestMethod.POST,
      descriptor.value,
    );
    return descriptor;
  };
}

export function Delete(path: string | string[] = ''): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    const version = Reflect.getMetadata(
      VERSION_METADATA_KEY,
      target,
      propertyKey,
    );
    Reflect.defineMetadata(
      PATH_METADATA,
      prependVersionPrefixToPaths(path, version),
      descriptor.value,
    );
    Reflect.defineMetadata(
      METHOD_METADATA,
      RequestMethod.DELETE,
      descriptor.value,
    );
    return descriptor;
  };
}

export function Put(path: string | string[] = ''): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    const version = Reflect.getMetadata(
      VERSION_METADATA_KEY,
      target,
      propertyKey,
    );
    Reflect.defineMetadata(
      PATH_METADATA,
      prependVersionPrefixToPaths(path, version),
      descriptor.value,
    );
    Reflect.defineMetadata(
      METHOD_METADATA,
      RequestMethod.PUT,
      descriptor.value,
    );
    return descriptor;
  };
}

export function Patch(path: string | string[] = ''): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    const version = Reflect.getMetadata(
      VERSION_METADATA_KEY,
      target,
      propertyKey,
    );
    Reflect.defineMetadata(
      PATH_METADATA,
      prependVersionPrefixToPaths(path, version),
      descriptor.value,
    );
    Reflect.defineMetadata(
      METHOD_METADATA,
      RequestMethod.PATCH,
      descriptor.value,
    );
    return descriptor;
  };
}

export function Options(path: string | string[] = ''): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    const version = Reflect.getMetadata(
      VERSION_METADATA_KEY,
      target,
      propertyKey,
    );
    Reflect.defineMetadata(
      PATH_METADATA,
      prependVersionPrefixToPaths(path, version),
      descriptor.value,
    );
    Reflect.defineMetadata(
      METHOD_METADATA,
      RequestMethod.OPTIONS,
      descriptor.value,
    );
    return descriptor;
  };
}

export function Head(path: string | string[] = ''): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    const version = Reflect.getMetadata(
      VERSION_METADATA_KEY,
      target,
      propertyKey,
    );
    Reflect.defineMetadata(
      PATH_METADATA,
      prependVersionPrefixToPaths(path, version),
      descriptor.value,
    );
    Reflect.defineMetadata(
      METHOD_METADATA,
      RequestMethod.HEAD,
      descriptor.value,
    );
    return descriptor;
  };
}

export function All(path: string | string[] = ''): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    const version = Reflect.getMetadata(
      VERSION_METADATA_KEY,
      target,
      propertyKey,
    );
    Reflect.defineMetadata(
      PATH_METADATA,
      prependVersionPrefixToPaths(path, version),
      descriptor.value,
    );
    Reflect.defineMetadata(
      METHOD_METADATA,
      RequestMethod.ALL,
      descriptor.value,
    );
    return descriptor;
  };
}
