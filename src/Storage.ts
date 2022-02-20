import { Storage } from '@capacitor/storage';

const Data = {
    put: async <T extends object | string | number | boolean>(key: string, data: T) => {
        const value = JSON.stringify(data);
        return Storage.set({ key, value });
    },
    get: async <T extends object | string | number | boolean>(key: string) => {
        const result = await Storage.get({ key });
        const { value } = result;
        return value ? JSON.parse(value) as T : value;
    },
    delete: async (key: string) => Storage.remove({ key })
};
export default Data;
