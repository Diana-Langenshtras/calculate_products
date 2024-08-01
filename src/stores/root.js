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
          products: [], //продукты c api
          addedProducts: getAddedProducts(), //продукты добавленные пользователеm
          dailyDiet: getDailyDiet(), //рацiон пользователa
          //format
          /* {
                "13/07/2024":
                    {
                        "breakfrast": [
                            {product: product,
                            weight: weight},
                        ],
                        "lunch": [
                            {product: product,
                            weight: weight},
                        ],
                        "dinner": [
                            {product: product,
                            weight: weight},
                        ]
                    },
            }
          */
        }),

        actions: {
            async getProducts() {

                try {
                    const data = await axios.get(PRODUCTS_URL);
                    this.products = data?.data;
                  } catch (err) {
                    console.log(err.code); 
                }    
            },

            addToDiet(date, meal, product, weight){

                if (!(date in this.dailyDiet))
                    {
                        const newmeal = {}
                        newmeal[meal] =
                            [{
                                product: product,
                                weight: Number(weight),
                            }]          
                        this.dailyDiet[date] = newmeal;     
                    }
                else if (!(meal in this.dailyDiet[date]))
                    this.dailyDiet[date][meal] = [{
                        product: product,
                        weight: Number(weight),
                    }] 
                else this.dailyDiet[date][meal].push({
                    product: product,
                    weight: Number(weight),
                });
                localStorage.setItem(DIET_NAME, JSON.stringify(this.dailyDiet));    
            },

            removeFromDiet(date, meal, index){
                
                if (date in this.dailyDiet)
                    if (meal in this.dailyDiet[date])
                        this.dailyDiet[date][meal].splice(index, 1);
                localStorage.setItem(DIET_NAME, JSON.stringify(this.dailyDiet));    
            },
        }
    }
)