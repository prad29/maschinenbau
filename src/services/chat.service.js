import apiInstance from "../utils/apiInstance";

// apiInstance
// http://18.198.197.248:5000/ask'

export const askQuestionService = async (body) => {
    return await apiInstance.post("ask",body)
        .then((response) => response.data)
        .catch((error) => {
            throw error
        })
}