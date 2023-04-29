import { useDispatch } from "react-redux";
import { appApi } from "../api/appApi";
import { onLoadingPrices } from "../store/prices/priceSlice";

export const usePriceStore = () => {

    const dispatch = useDispatch();

    const startLoadingAllPrices = async() => {
        try {
            const { data } = await appApi.get('/api/prices/all');

            dispatch(onLoadingPrices(data));

        } catch (error) {
            
        }
    }

    return {

        // Methods
        startLoadingAllPrices

    }
}