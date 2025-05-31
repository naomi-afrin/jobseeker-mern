//import and export all the utility functions

import axios from "axios";

export const handleFileupload = async(uploadFile) => {
    const formData = new FormData();
    formData.append("file",uploadFile);
    formData.append("upload_preset","jobfinder");

    try {
        const res = await axios.post("url",formData);
        return res.data.secure_url;
    }catch (error) {
        console.log(error)
    }
}

export const updateURL =  () => {
    //write
}