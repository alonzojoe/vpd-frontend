interface Field {
    payload: string;
    message: string;
    tab: number;
}

interface FormData {
    [key: string]: any;
}

interface Result {
    errors: number;
    tab: number;
}

export class GlobalValidator {
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

    validateFields(toast: any, formData: FormData, watched: number, maxTabs: number): { errors: number, tab: number } {
        let result: Result = {
            errors: 0,
            tab: maxTabs
        };

        this.requiredFields.every((r) => {
            if (formData[r.payload].trim().length === 0) {
                result.errors++;
                result.tab = r.tab;
                if (watched !== 1) {
                    toast.add({ severity: 'error', summary: 'Field Required:', detail: `${r.message}`, life: 3000 });
                }
                return false;
            }
            return true;
        });

        return result;
    }
}
