
export class GlovalValidator {
    constructor(fields, requiredFields) {
        this.validationStatus = {}

        fields.foreEach(field => {
            this.validationStatus[field] = true
        })
    }


    validateChecker(formData) {
        for (const field of Object.keys(this.validationStatus)) {
            if (formData[field].trim().length === 0) {
                this.validationStatus[field] = false
            } else {
                this.validationStatus[field] = true
            }
        }
    }

    validateFields(formData) {
        let errors = 0;

        this.requiredFields.every((r) => {
            if (!formData[r].payload) {
                errors++;
                return false;
            }
            return true;
        })

        return errors;
    }

}