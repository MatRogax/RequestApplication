import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';


export function IsCpf(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isCpf',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {

                    if (typeof value !== 'string') return false;
                    value = value.replace(/\D/g, ''); 
                    if (value.length !== 11) return false; 

                    let sum = 0;
                    let remainder;
                    for (let i = 1; i <= 9; i++) {
                        sum += parseInt(value.charAt(i - 1)) * (11 - i);
                    }
                    remainder = (sum * 10) % 11;
                    if (remainder === 10 || remainder === 11) {
                        remainder = 0;
                    }
                    if (remainder !== parseInt(value.charAt(9))) {
                        return false;
                    }

                    sum = 0;
                    for (let i = 1; i <= 10; i++) {
                        sum += parseInt(value.charAt(i - 1)) * (12 - i);
                    }
                    remainder = (sum * 10) % 11;
                    if (remainder === 10 || remainder === 11) {
                        remainder = 0;
                    }
                    return remainder === parseInt(value.charAt(10));
                },
                defaultMessage(args: ValidationArguments) {
                    return 'CPF inválido!';
                },
            },
        });
    };
}
