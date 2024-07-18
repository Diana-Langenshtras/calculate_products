import { defineStore } from 'pinia'
import axios from 'axios'
import { PRODUCTS_URL } from '../constants'

const STORE_NAME = 'root'
const PRODUCTS_NAME = 'products'
const DIET_NAME = 'diet'

const getDefault = () => {
        return {};
	}

const getAddedProducts = () => {
        const addedProducts = localStorage.getItem(PRODUCTS_NAME);
        return addedProducts ? JSON.parse(addedProducts) : getDefault();
    }

const getDailyDiet = () => {
        const dailyDiet = localStorage.getItem(DIET_NAME);
        return dailyDiet ? JSON.parse(dailyDiet) : getDefault();
    }


export const useRootStore = defineStore(STORE_NAME, 
    {
        state: () => ({
          products: [],
          addedProducts: getAddedProducts(),
          dailyDiet: getDailyDiet(),
        }),

        actions: {
            async getProducts() {
                const data = await axios.get(PRODUCTS_URL);
                this.products = data?.data;
                console.log(this.products)
            },

        }
    }
)