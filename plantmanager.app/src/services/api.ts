import axios from "axios";

const apiUrl = 'http://192.168.0.70:5000/api/v1/';
	
export const ApiService = {
    getFileData: async (fileName: string) => {
        try {
            console.log(`${apiUrl}${fileName}`)
            const response = await axios.get(`${apiUrl}${fileName}`);
            return response.data;
        } catch (error) { console.log("errorrrr", error); return null; }
    }
};

export default ApiService;