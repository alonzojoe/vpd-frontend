interface Field {
    payload: string;
    messsage: string;
}

interface FormData {
    [key: string]: string
}

export class GlovalValidator {
    private validationStatus: { [key: string]: boolean };
    private requiredFields: Field[];

    constructor(fields: string[], requiredFields: Field[]) {
        this.validationStatus = {};

        fields.forEach(field => {
            this.validationStatus[field] = true;
        });

        this.requiredFields = requiredFields;
    }

    validateChecker(formData: FormData): void {
        for (const field of Object.keys(this.validationStatus)) {
            if (formData[field].trim().length === 0) {
                this.validationStatus[field] = false;
            } else {
                this.validationStatus[field] = true;
            }
        }
    }

    validateFields(formData: FormData): number {
        let errors = 0;

        this.requiredFields.every((r) => {
            if (formData[r.payload].trim().length === 0) {
                errors++;
                return false;
            }
            return true;
        });

        return errors;
    }
}
