import { useDispatch } from "react-redux";
import { appApi } from "../api/appApi";
import { onLoadingPublicDetails,
        onLoadPrivateDetails,
        onLoadPropertiesSoldNumber,
        onSearching,
        onUpdateUserSuccess,
        onUpdateUserFailed,
        onClearMessages } from '../store/users/userSlice';

export const useUserStore = () => {

    const dispatch = useDispatch();

    const startLoadingPublicDetails = async(userId) => {

        try {
            
            const { data } = await appApi.get(`/api/user/get-user-public-details/${userId}`);

            dispatch(onLoadingPublicDetails(data.user));

        } catch (error) {
            console.log(error);
        }

    }

    const startLoadingSoldPropertiesByUser = async(userId) => {

        try {
            
            const { data } = await appApi.get(`/api/properties/number-sold-properties-user/${userId}`);

            dispatch(onLoadPropertiesSoldNumber(data.propertiesNumber));

        } catch (error) {
            console.log(error);
        }

    }

    const startLoadingDashboardUserDetails = async() => {

        try {

            const username = localStorage.getItem('username');
            
            const { data } = await appApi.get(`/api/user/get-user-details/${username}`,{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token')
                }
            });

            dispatch(onLoadPrivateDetails(data.user));

        } catch (error) {
            console.log(error);
        }
    }

    const startChecking = () => {
        dispatch(onSearching());
    }

    const startUpdatingUserDetails = async(userData) => {
        try {
            const { data } = await appApi.put('/api/user/update-user-details', userData,{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            })

            dispatch(onUpdateUserSuccess(data.msg));

        } catch (error) {
            dispatch(onUpdateUserFailed(error.response.data.msg));
        }
    }

    const startClearingMessages = () => {
        dispatch(onClearMessages());
    }

    return {
        // Methods
        startLoadingPublicDetails,
        startLoadingSoldPropertiesByUser,
        startLoadingDashboardUserDetails,
        startChecking,
        startUpdatingUserDetails,
        startClearingMessages
    }
}