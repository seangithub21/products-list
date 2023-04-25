import { action, makeAutoObservable, observable, runInAction } from "mobx";

import axios from "configs/axios";

class CompareStore {
  categoriesList = [];
  productsFromCategoryList = [];
  currentCategory = "";
  productsCompareList = [];

  isLoading = false;

  constructor() {
    makeAutoObservable(this, {
      categoriesList: observable.ref,
      productsFromCategoryList: observable.ref,
      currentCategory: observable.ref,
      productsCompareList: observable.ref,

      isLoading: observable.ref,

      getCategories: action,
      getProductsFromCategory: action,
      addProductToCompareList: action,
      changeProductInCompareList: action,
    });
  }

  getCategories = () => {
    runInAction(() => {
      this.isLoading = true;
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
          this.isLoading = false;
          if (
            localStorage.getItem("compareCategory") &&
            JSON.parse(localStorage.getItem("compareCategory") !== "")
          ) {
            this.getProductsFromCategory(
              JSON.parse(localStorage.getItem("compareCategory"))
            );
          }
        });
      })
      .catch((error) => {
        console.error(error);
        runInAction(() => {
          this.isLoading = false;
        });
      });
  };

  getProductsFromCategory = (category) => {
    if (category !== "") {
      localStorage.setItem("compareCategory", JSON.stringify(category));
    } else {
      localStorage.removeItem("compareCategory");
      localStorage.removeItem("compareList");
    }
    runInAction(() => {
      this.isLoading = true;
      this.currentCategory = category;
      this.productsCompareList = [];
    });
    if (this.currentCategory !== "") {
      axios
        .get(`products/category/${category}`)
        .then(({ data }) => {
          runInAction(() => {
            this.productsFromCategoryList = data.products;
            this.isLoading = false;
            if (localStorage.getItem("compareList")) {
              this.productsCompareList = JSON.parse(
                localStorage.getItem("compareList")
              );
            }
          });
        })
        .catch((error) => {
          console.error(error);
          runInAction(() => {
            this.isLoading = false;
          });
        });
    } else {
      runInAction(() => {
        this.productsFromCategoryList = [];
      });
    }
  };

  addProductToCompareList = (product) => {
    localStorage.setItem(
      "compareList",
      JSON.stringify([...this.productsCompareList, product])
    );
    runInAction(() => {
      this.productsCompareList = [...this.productsCompareList, product];
    });
  };

  changeProductInCompareList = (event, index) => {
    let updatedProductsCompareList = [...this.productsCompareList];
    updatedProductsCompareList[index] = event.target.value;
    localStorage.setItem(
      "compareList",
      JSON.stringify([...updatedProductsCompareList])
    );
    runInAction(() => {
      this.productsCompareList = [...updatedProductsCompareList];
    });
  };

  removeProductFromCompareList = (productToRemove) => {
    let updatedProductsCompareList = this.productsCompareList.filter(
      (product) => product.id !== productToRemove.id
    );
    localStorage.setItem(
      "compareList",
      JSON.stringify([...updatedProductsCompareList])
    );
    runInAction(() => {
      this.productsCompareList = [...updatedProductsCompareList];
    });
  };
}

export default new CompareStore();
