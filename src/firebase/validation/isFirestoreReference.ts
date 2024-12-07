import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { DocumentReference } from 'firebase/firestore';

export function IsFirestoreReference(
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isFirestoreReference',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          return value instanceof DocumentReference; // Універсальна перевірка
        },
        defaultMessage() {
          return `Property must be a valid Firestore DocumentReference.`;
        },
      },
    });
  };
}
