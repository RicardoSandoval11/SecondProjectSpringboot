import { useDispatch } from "react-redux";
import { appApi } from "../api/appApi"
import { 
    onLoadingLastCreatedProperties,
    onLoadingLastCreatedDepartments,
    onLoadingLastCreatedOther,
    onLoadingPropertyDetails,
    onLoadingAllProperties,
    onLoadingPropertiesByCategory,
    onSendMessage,
    onSendMessageFailed,
    onClearmessages,
    onLoadUserProperties,
    onSucessRemoveProperty,
    onFailedRemoveProperty,
    onCreatePropertySuccess,
    onCreatePropertyFailed,
    onUpdatePropertySuccess,
    onUpdatePropertyFailed,
    onChecking } from "../store/properties/propertiesSlice";



export const usePropertiesStore = () => {

    const dispatch = useDispatch();

    const startLoadingLastCreatedProperties = async() => {

        try {
            const { data } = await appApi.get('/api/properties/get-last-four-properties');
    
            dispatch(onLoadingLastCreatedProperties(data));
        } catch (error) {
            console.log(error);
        }


    };

    const startLoadingLastCreatedDepartments = async() => {

        try {
            const { data } = await appApi.get('/api/properties/get-last-four-departments');
    
            dispatch(onLoadingLastCreatedDepartments(data));
        } catch (error) {
            console.log(error);
        }


    };

    const startLoadingLastCreatedOther = async() => {

        try {
            const { data } = await appApi.get('/api/properties/get-last-four-other');
    
            dispatch(onLoadingLastCreatedOther(data));
        } catch (error) {
            console.log(error);
        }


    };

    const startLoadingPropertyDetails = async(propertyId) => {

        try {

            const { data } = await appApi.get(`/api/properties/details/${propertyId}`);

            dispatch(onLoadingPropertyDetails(data));
            
        } catch (error) {
            console.log(error);
        }
    }

    const startLoadingFilteredProperties = async(kword, categoryId, priceId, startDate, endDate, page) => {

        let response;

        if(startDate != null){
            const date = new Date(startDate);
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const day = ('0' + date.getDate()).slice(-2);

            startDate = `${year}-${month}-${day}`;
        }

        if(endDate != null){
            const date = new Date(endDate);
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const day = ('0' + date.getDate()).slice(-2);

            endDate = `${year}-${month}-${day}`;
        }

        try {
            
            if(kword == '' || categoryId == '' || priceId == '' || startDate ==null || endDate == null){

                response = await appApi.get(`/api/properties/list-all?page=${page}`);

            }else{
                response = await appApi.get(`/api/properties/all?kword=${kword}&categoryId=${categoryId}&priceId=${priceId}&startDate=${startDate}&endDate=${endDate}&page=${page}`);
            }

            const { data } = response;

            dispatch(onLoadingAllProperties(data));

        } catch (error) {
            console.log(error);
        }
    }

    const startLoadingPropertiesByCategory = async(categoryId, page) => {

        try {
            
            const { data } = await appApi.get(`/api/properties/filter-category/${categoryId}?page=${page}`);
            dispatch(onLoadingPropertiesByCategory(data));

        } catch (error) {
            console.log(error);
        }

    }

    const startSendingMessage = async(receiverId, propertyId, message) => {
        
        try {

            // get required data to register a new message

            const {data} = await appApi.post('/api/messages/save-new-message',  JSON.stringify({
                'receiverId' : receiverId,
                'senderUsername' : localStorage.getItem('username'),
                'propertyId' : propertyId,
                'message' : message
            }),{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });

            dispatch(onSendMessage(data));

        } catch (error) {

            dispatch(onSendMessageFailed(error.response.data));
        }
    }

    const startClearingMessages = () => {
        dispatch(onClearmessages());
    }

    const startLoadingUserProperties = async(page) => {
        try {

            const { data } = await appApi.get(`/api/properties/my-properties?page=${page}`,{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token'),
                    'username': localStorage.getItem('username')
                }
            });

            dispatch(onLoadUserProperties(data));

        } catch (error) {
            console.log(error);
        }
    }

    const startRemovingproperty = async(propertyId) => {
        try {
            
            const { data } = await appApi.delete('/api/properties/delete-property',{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token'),
                    'propertyId':propertyId,
                    'username': localStorage.getItem('username')
                }
            });

            dispatch(onSucessRemoveProperty(data.msg));

        } catch (error) {
            const {response} = error;

            dispatch(onFailedRemoveProperty(response.data.msg));
        }
    }

    const startChecking = () => {
        dispatch(onChecking());
    }

    const startUpdatingProperty = async(propertydata) => {

        try {
            const { data } = await appApi.put('/api/properties/update', propertydata,{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            })

            dispatch(onUpdatePropertySuccess(data.msg));

        } catch (error) {
            dispatch(onUpdatePropertyFailed(error.response.data.msg));
        }
    }

    const obtainImageData = async(imageUrl, imageName) => {

        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], imageName, { type: blob.type });
        return file;
    }

    const startCreatingProperty = async(newProperty) => {

        try {
            const { data } = await appApi.post('/api/properties/create-property', newProperty,{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            })

            dispatch(onCreatePropertySuccess(data.msg));

        } catch (error) {
            console.log(error);
            dispatch(onCreatePropertyFailed(error.response.data.msg));
        }

    }

    const startExportingUserData = async() => {

        const username = localStorage.getItem('username');

        try {
            const response = await appApi.get(`/api/properties/export-data/${username}`,{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token'),
                },
                responseType: 'blob'
            });

            const fileUrl = window.URL.createObjectURL(response.data);

            window.open(fileUrl, '_blank').setAttribute('download', 'data.pdf');

            window.URL.revokeObjectURL(fileUrl);

        } catch (error) {
            console.log(error);
        }
    }

    return {
        startLoadingLastCreatedProperties,
        startLoadingLastCreatedDepartments,
        startLoadingLastCreatedOther,
        startLoadingPropertyDetails,
        startLoadingFilteredProperties,
        startLoadingPropertiesByCategory,
        startSendingMessage,
        startClearingMessages,
        startLoadingUserProperties,
        startRemovingproperty,
        startChecking,
        startUpdatingProperty,
        obtainImageData,
        startCreatingProperty,
        startExportingUserData
    }
}