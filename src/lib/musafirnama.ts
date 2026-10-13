import axios from "axios";

const submitData = async (data) => {
    try {
        const response = await axios.post("https://48zw367s12.execute-api.ap-south-1.amazonaws.com/first/", data);
        return response.data;
    } catch (error) {
        return error
    }
}

export default submitData;