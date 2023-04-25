import { action, makeAutoObservable, observable, runInAction } from "mobx";

import axios from "configs/axios";

class ProductsStore {
  productsData = {};
  productsList = [];

  isLoadingProducts = false;

  constructor() {
    makeAutoObservable(this, {
      productsData: observable.ref,
      productsList: observable.ref,

      isLoadingProducts: observable.ref,

      getProducts: action,
      clearStore: action,
    });
  }

  getProducts = ({ params } = {}) => {
    if (!Object.keys(this.productsData).length) {
      runInAction(() => {
        this.isLoadingProducts = true;
      });
    }
    axios
      .get("products", {
        params: params
          ? params
          : {
              limit: 10,
              skip: 0,
            },
      })
      .then(({ data }) => {
        if (!Object.keys(this.productsData).length) {
          runInAction(() => {
            this.productsData = data;
            this.productsList = data.products;
            this.isLoadingProducts = false;
          });
        } else {
          runInAction(() => {
            this.productsData = data;
            this.productsList = this.productsList.concat(data.products);
          });
        }
      })
      .catch((error) => {
        console.error(error);
        runInAction(() => {
          this.isLoadingProducts = false;
        });
      });
  };

  clearStore = () => {
    runInAction(() => {
      this.productsData = {};
      this.productsList = [];
    });
  };
}

export default new ProductsStore();
