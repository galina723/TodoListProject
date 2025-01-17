import CryptoJS from "react-native-crypto-js";


const key = 'abcdef123456';
export class Security {
    static encrypt(data: string) {
        const encryptedString = CryptoJS.AES.encrypt(data, key).toString();
        return encryptedString;
    }

    static decryptedString(data: string) {
        const decryptedString = CryptoJS.AES.decrypt(data, key)
        const decrypt = decryptedString.toString(CryptoJS.enc.Utf8);
        console.log(decrypt);
        return decrypt;
    }
}