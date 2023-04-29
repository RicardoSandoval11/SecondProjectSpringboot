import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { appApi } from "../api/appApi";
import { 
        onLoadNumberOfMessages, 
        onLoadingUserMessages,
        onRemoveMessageSuccess,
        onRemoveMessageFailed,
        onClearMessages } from "../store/messages/messageSlice";


export const useMessageStore = () => {

    const dispatch = useDispatch();


    const startLoadingNumberOfMessages = async() => {

        try {

            
            const { data } = await appApi.get('/api/messages/get-number-messages',{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token'),
                    'username': localStorage.getItem('username')
                }
            });

            dispatch(onLoadNumberOfMessages(data.messagesNumber));

        } catch (error) {
            const { response } = error;

            console.log(response.data);
        }

    }

    const startLoadingUserMessages = async(page) => {

        try {
            
            const { data } = await appApi.get(`/api/messages/get-messages?page=${page}`,{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token'),
                    'username': localStorage.getItem('username')
                }
            });

            dispatch(onLoadingUserMessages(data.data));

        } catch (error) {
            console.log(error);
        }

    }

    const startRemovingMessage = async(messageId) => {
        try {
            
            const { data } = await appApi.delete('/api/messages/delete-message',{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token'),
                    'username': localStorage.getItem('username'),
                    'messageId': messageId
                }
            });

            dispatch(onRemoveMessageSuccess(data.msg));

        } catch (error) {

            console.log(error);

            dispatch(onRemoveMessageFailed(error.response.data.msg));
        }
    }

    const startClearningMessages = () => {
        dispatch(onClearMessages());
    }

    return {
        // Methods
        startLoadingNumberOfMessages,
        startLoadingUserMessages,
        startRemovingMessage,
        startClearningMessages
    }
}