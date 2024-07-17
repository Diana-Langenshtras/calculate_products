import { defineStore } from 'pinia'
import axios from 'axios'
import { PRODUCTS_URL } from '../constants'

const STORE_NAME = 'root'

export const useRootStore = defineStore(STORE_NAME, 
    {
        state: () => ({
          products: [],
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