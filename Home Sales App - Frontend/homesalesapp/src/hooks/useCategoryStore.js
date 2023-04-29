import { useDispatch } from "react-redux"
import { appApi } from "../api/appApi";
import { onLoadingCategories, onLoadingAllCategories } from "../store/categories/categorySlice";


export const useCategoryStore = () => {

    const dispatch = useDispatch();

    const startloadingAllCategories = async() => {

        try {
            
            const { data } = await appApi.get('/api/category/all');

            dispatch(onLoadingCategories(data));

        } catch (error) {
            console.log(data);
        }

    }

    const startLoadingAllCompleteCategories = async() => {

        try {

            const { data } = await appApi.get('/api/category/all-categories');

            dispatch(onLoadingAllCategories(data));

        } catch (error) {
            console.log(error);
        }
    }

    return {
        // Methods
        startloadingAllCategories,
        startLoadingAllCompleteCategories
    }
}