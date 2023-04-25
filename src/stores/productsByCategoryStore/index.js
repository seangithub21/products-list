import { action, makeAutoObservable, observable, runInAction } from "mobx";

import axios from "configs/axios";

class ProductsByCategoryStore {
  categoriesList = [];
  currentCategory = "";
  productsByCategoryData = {};
  productsByCategoryList = [];

  isLoadingProducts = false;
  isLoadingCategories = false;

  constructor() {
    makeAutoObservable(this, {
      categoriesList: observable.ref,
      currentCategory: observable.ref,
      productsByCategoryData: observable.ref,
      productsByCategoryList: observable.ref,

      isLoadingProducts: observable.ref,
      isLoadingCategories: observable.ref,

      getProductsOfCategory: action,
      getCategories: action,
    });
  }

  getCategories = () => {
    runInAction(() => {
      this.isLoadingCategories = true;
    });
    axios
      .get("products/categories")
      .then(({ data }) => {
        const categories = data.map((category) => ({
          value: category,
          label: category.charAt(0).toUpperCase() + category.slice(1),
        }));
        runInAction(() => {
          this.categoriesList = categories;
          this.isLoadingCategories = false;
        });
      })
      .catch((error) => {
        console.error(error);
        runInAction(() => {
          this.isLoadingCategories = false;
        });
      });
  };

  getProductsOfCategory = ({ params, category } = {}) => {
    runInAction(() => {
      this.currentCategory = category;
      this.isLoadingProducts = true;
      //    NOTE: should reset store (possibly) for infinite scroll to work properly ?
      //   if (!Object.keys(this.productsByCategoryData).length) {
      //     this.isLoadingProducts = true;
      //   }
    });
    axios
      .get(`products/category/${category}`, {
        params: params
          ? params
          : {
              limit: 5,
              skip: 0,
            },
      })
      .then(({ data }) => {
        // NOTE: should reset store (possibly) for infinite scroll to work properly ?
        // if (!Object.keys(this.productsByCategoryData).length) {
        //   runInAction(() => {
        //     this.productsByCategoryData = data;
        //     this.productsByCategoryList = data.products;
        //     this.isLoadingProducts = false;
        //   });
        // } else {
        //   runInAction(() => {
        //     this.productsByCategoryData = data;
        //     this.productsByCategoryList = this.productsList.concat(
        //       data.products
        //     );
        //   });
        // }
        runInAction(() => {
          this.productsByCategoryData = data;
          this.productsByCategoryList = data.products;
          this.isLoadingProducts = false;
        });
      })
      .catch((error) => {
        console.error(error);
        runInAction(() => {
          this.isLoadingProducts = false;
        });
      });
  };
}

export default new ProductsByCategoryStore();
