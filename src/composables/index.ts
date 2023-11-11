import { inject } from 'vue'
import CryptoJS from 'crypto-js'
import Cookies from 'js-cookie';

export function swalMessage(swal,title: String, text: String, icon: String) {
    return swal({
        title: title,
        text: text,
        icon: icon
    })
}

export function swalConfirmation(swal,title: String, text: String, icon: String) {
    return swal({
        title: title,
        text: text,
        icon: icon,
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `Cancel`,
    })
}


export function deCrypto(stringToDecrypt) {

    const key = import.meta.env.VITE_CRYPTO_APP_KEY;

    var encrypted_json = JSON.parse(atob(stringToDecrypt));
    var decrypted = CryptoJS.AES.decrypt(encrypted_json.value, CryptoJS.enc.Base64.parse(key), {
      iv: CryptoJS.enc.Base64.parse(encrypted_json.iv)
    });

    const stringDecrypted = decrypted.toString(CryptoJS.enc.Utf8);
    // for object JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    return stringDecrypted
   
}


export function encryptData(data) {
    const password = import.meta.env.VITE_CRYPTO_SECRET_KEY;

    const encryptedData = CryptoJS.AES.encrypt(data, password).toString();

    return encryptedData;
}

export function NumericOnly(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
    } else {
        return true;
    }
}

// export function decryptData(data) {
//     const password = import.meta.env.VITE_CRYPTO_SECRET_KEY;
//     try {
//         const bytes = CryptoJS.AES.decrypt(data, password);
//         if (bytes.toString()) {
//             const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//             return decryptedData;
//         } else {
//             console.error("Decryption failed. Invalid key / data.");
//         }
//     } catch (error) {
//         // console.error("Error decrypting data:", error);
//         return "Invalid data";
//     }
// }

export function decryptData(data) {
    const password = import.meta.env.VITE_CRYPTO_SECRET_KEY;
    try {
        const bytes = CryptoJS.AES.decrypt(data, password);
        if (bytes.toString()) {
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            return decryptedData;
        } else {
            console.error("Decryption failed. Invalid key / data.");
            return "Invalid data"; // Return an "invalid data" string
        }
    } catch (error) {
        // console.error("Error decrypting data:", error);
        Cookies.remove('auth_token');
        return "Invalid data"; // Return an "invalid data" string
    }
}

export function buildQueryParams(params) {
    const queryParams = [];

    for (const key in params) {
        if (params[key]) {
            queryParams.push(`${key}=${params[key]}`);
        }
        
    }

    return queryParams.join('&');

}

export const trimZeroes = (num) => {
    let stringNumber = num.toString();

    stringNumber = stringNumber.replace(/^0+/, '');

    if (stringNumber === '') {
        return 0; 
    }

    return parseInt(stringNumber);
}

export const tribes = [
    { id: "00001", name: "AETAS" },
    { id: "00002", name: "ATI" },
    { id: "00003", name: "BADJAOS" },
    { id: "00004", name: "BATAK" },
    { id: "00005", name: "BLAAN" },
    { id: "00006", name: "BONTOC" },
    { id: "00007", name: "BUKIDNON" },
    { id: "00008", name: "HIGAONON" },
    { id: "00009", name: "IBALOI" },
    { id: "00010", name: "IGOROT" },
    { id: "00011", name: "ILONGOTS" },
    { id: "00012", name: "ISNAG" },
    { id: "00013", name: "ISNEG" },
    { id: "00014", name: "KALINGA" },
    { id: "00015", name: "KANKANAEY" },
    { id: "00016", name: "LUMAD" },
    { id: "00017", name: "MAMANWA" },
    { id: "00018", name: "MANDAYA" },
    { id: "00019", name: "MANGYAN" },
    { id: "00020", name: "MANOBO" },
    { id: "00021", name: "MANSAKA" },
    { id: "00022", name: "PALAWANO" },
    { id: "00023", name: "PALAWEÑO" },
    { id: "00024", name: "SANGIR" },
    { id: "00025", name: "SUBANEN" },
    { id: "00026", name: "T`BOLI" },
    { id: "00027", name: "TAGABAWA" },
    { id: "00028", name: "TAGAKAULO" },
    { id: "00029", name: "TAGBANWA" },
    { id: "00030", name: "TASADAY" },
    { id: "00031", name: "TINGUIAN" },
    { id: "00032", name: "TUMANDOK" },
    { id: "00033", name: "OTHERS" }
];