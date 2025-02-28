import { ref } from "vue"
import api from "@/api";

export const defaultWorksheet = [
    { wellNo: "A1", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "B1", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "C1", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "D1", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "E1", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "F1", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "G1", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "H1", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "A2", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "B2", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "C2", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "D2", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "E2", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "F2", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "G2", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "H2", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "A3", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "B3", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "C3", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "D3", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "E3", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "F3", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "G3", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "H3", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "A4", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "B4", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "C4", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "D4", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "E4", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "F4", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "G4", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "H4", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "A5", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "B5", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "C5", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "D5", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "E5", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "F5", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "G5", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "H5", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "A6", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "B6", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "C6", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "D6", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "E6", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "F6", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "G6", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "H6", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "A7", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "B7", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "C7", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "D7", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "E7", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "F7", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "G7", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "H7", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "A8", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "B8", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "C8", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "D8", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "E8", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "F8", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "G8", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "H8", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "A9", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "B9", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "C9", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "D9", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "E9", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "F9", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "G9", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "H9", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "A10", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "B10", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "C10", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "D10", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "E10", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "F10", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "G10", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "H10", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "A11", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "B11", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "C11", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "D11", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "E11", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "F11", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "G11", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "H11", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "A12", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "B12", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "C12", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "D12", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "E12", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "F12", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "G12", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "H12", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
];

export const worksheet = ref([
    { wellNo: "A1", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "B1", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "C1", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "D1", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "E1", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "F1", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "G1", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "H1", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "A2", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "B2", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "C2", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "D2", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "E2", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "F2", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "G2", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "H2", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "A3", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "B3", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "C3", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "D3", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "E3", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "F3", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "G3", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "H3", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "A4", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "B4", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "C4", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "D4", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "E4", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "F4", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "G4", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "H4", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "A5", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "B5", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "C5", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "D5", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "E5", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "F5", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "G5", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "H5", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "A6", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "B6", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "C6", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "D6", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "E6", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "F6", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "G6", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "H6", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "A7", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "B7", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "C7", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "D7", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "E7", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "F7", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "G7", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "H7", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "A8", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "B8", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "C8", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "D8", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "E8", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "F8", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "G8", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "H8", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "A9", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "B9", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "C9", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "D9", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "E9", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "F9", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "G9", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "H9", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "A10", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "B10", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "C10", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "D10", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "E10", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "F10", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "G10", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "H10", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "A11", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "B11", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "C11", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "D11", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "E11", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "F11", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "G11", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "H11", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "A12", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "B12", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "C12", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "D12", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "E12", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "F12", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "G12", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
    { wellNo: "H12", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
]);

export const resetWorkSheet = () => {
    worksheet.value = []
    worksheet.value.push(...defaultWorksheet)
}


export const computeRatio = (cal: number, od: number) => {
    const ratio = (od / cal).toFixed(3);
    return +ratio;
};

export const calculateInterpretation = (ratio: number): string => {
    if (ratio < 0.8) {
        return "NEGATIVE";
    } else if (ratio >= 0.8 && ratio < 1.1) {
        return "EQUIVOCAL";
    } else if (ratio >= 1.1) {
        return "POSITIVE";
    } else {
        throw new Error("Invalid ratio value");
    }
};

export const calculateCriteria = (result: number, type: "Calibrator" | "PositiveControl" | "NegativeControl"): string => {
    switch (type) {
        case 'Calibrator':
            return result > 0.140 ? "VALID" : "INVALID"
        case 'PositiveControl':
            return result >= 1.9 && result <= 5.1 ? "VALID" : "INVALID"
        case 'NegativeControl':
            return result >= 0 && result <= 0.7 ? "VALID" : "INVALID"
        default:
            throw new Error('Invalid Criteria Type')
    }
}

export const createAsyncThunk = async () => {
    console.log('create AsyncThunk')
    await api.get('/worksheet').then((response) => {
        return response.data.data
    }).catch((error) => {
        console.log('error', error)
    }).finally(() => {
        console.log('cleanup func')
    })
}

export const actionThunk = async () => {
    console.log('action thunk')
    await api.get('/validated').then((response) => {
        return response.data
    }).catch((error) => {
        console.log(error)
    }).finally(() => {
        console.log('cleanup func')
    })
}

