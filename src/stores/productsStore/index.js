import { action, makeAutoObservable, observable, runInAction } from "mobx";

import axios from "configs/axios";

class ProductsStore {
  products = [];

  isLoadingProducts = false;

  constructor() {
    makeAutoObservable(this, {
      products: observable.ref,

      isLoadingProducts: observable.ref,

      getProducts: action,
    });
  }

  getProducts = () => {
    runInAction(() => {
      this.products = [];
      this.isLoadingProducts = true;
    });
    axios
      .get("products")
      .then(({ data: { products } }) => {
        runInAction(() => {
          this.products = products;
          this.isLoadingProducts = false;
        });
      })
      .catch((error) => {
        console.log(error);
        runInAction(() => {
          this.isLoadingProducts = false;
        });
      });
  };
}

export default new ProductsStore();
