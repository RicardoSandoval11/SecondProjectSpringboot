import jwtDecode from "jwt-decode";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { appApi } from "../api/appApi";
import { onChecking, 
        onLogin, 
        onLoginFailed,
        onRegister,
        onRegisterFailed,
        onLogout,
        onCleanMessages,
        onRecoverPasswordRequestSuccess,
        onRecoverPasswordRequestFailed,
        onVerifyCodeUpdatePasswordSuccess,
        onVerifyCodeUpdatePasswordFailed,
        onUpdatePassword,
        onUpdatePasswordFailed } from "../store/authentication/authSlice";


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const startChecking = () => {
        dispatch(onChecking());
    }

    const startLogin = async(username, password) => {
        try {
            
            const { data } = await appApi.post('/api/auth/login',
                {
                    'username': username,
                    'password': password
                });

            localStorage.setItem('token', data.token);

            const decodedToken = await jwtDecode(data.token);

            const { sub } = decodedToken;

            localStorage.setItem('username', sub);

            dispatch(onLogin());
            
            navigate('/');

        } catch (error) {
            console.log(error);
            const { request } = error;
            if(request.status == 403){
                dispatch(onLoginFailed());
            }
        }

    }

    const startRegisterUser = async(name, username, email, password) => {
        try {
            const { data } = await appApi.post('/api/auth/register',{
                'name':name,
                'username':username,
                'email':email,
                'password':password
            });

            localStorage.setItem('token', data.token);

            const decodedToken = await jwtDecode(data.token);

            const { sub } = decodedToken;

            localStorage.setItem('username', sub);

            dispatch(onRegister());
            navigate('/');

        } catch (error) {
            const { response } = error;
            if(response.data.includes('users.email_UNIQUE')){
                dispatch(onRegisterFailed('The email already exists'));
            }else if(response.data.includes('users.username_UNIQUE')){
                dispatch(onRegisterFailed('The username already exists'));
            }
        }
    }

    const startLogout = async() => {
        localStorage.clear();
        dispatch(onLogout());
    }

    const startCheckingToken = async() => {

        const token = localStorage.getItem('token');

        if(token == null || token == undefined){
            return dispatch(onLogout());
        }

        // Decode token
        const decodedToken = jwtDecode(token);

        const { sub, iat, exp } = decodedToken;

        const currentDate = Math.floor(new Date().getTime() / 1000)

        if(currentDate > exp){
            localStorage.clear();
            navigate('/auth/login');
            return dispatch(onLogout());
        }

        dispatch(onLogin());
        
    }

    const startClearingMessages = () => {
        dispatch(onCleanMessages());
    }

    const startRequestUpdatePassword = async(email) => {

        const body = JSON.stringify({userEmail: email});



        try {
            
            const { data } = await appApi.post('/api/user/request-update-password', body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            dispatch(onRecoverPasswordRequestSuccess(data.msg));

        } catch (error) {

            dispatch(onRecoverPasswordRequestFailed(error.response.data.msg));
            
        }


    } 

    const startVerifyPasswordCode = async(code) => {

        const body = JSON.stringify({code: code});

        try {
            
            const { data } = await appApi.post('/api/user/verify-code', body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            dispatch(onVerifyCodeUpdatePasswordSuccess(data.msg));

        } catch (error) {
            
            dispatch(onVerifyCodeUpdatePasswordFailed(error.response.data.msg));

        }

    }

    const startUpdateUserPassword = async(code, password) => {

        const body = JSON.stringify({
            code: code,
            password: password
        });

        try {
            
            const { data } = await appApi.post('/api/user/update-password', body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            dispatch(onUpdatePassword(data.msg));

            navigate('/auth/login');

        } catch (error) {
            
            dispatch(onUpdatePasswordFailed(error.response.data.msg));

        }

    }


    return {
        // Properties
        status,
        user,
        errorMessage,

        // Methods
        startChecking,
        startLogin,
        startRegisterUser,
        startCheckingToken,
        startLogout,
        startClearingMessages,
        startRequestUpdatePassword,
        startVerifyPasswordCode,
        startUpdateUserPassword
    }
}