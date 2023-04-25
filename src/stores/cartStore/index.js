import { action, makeAutoObservable, observable, runInAction } from "mobx";

class CartStore {
  cart = [];

  isLoadingCart = false;

  constructor() {
    makeAutoObservable(this, {
      cart: observable.ref,

      isLoadingCart: observable.ref,

      getCart: action,
      updateCart: action,
    });
  }

  addToCart = (product) => {
    if (!localStorage.getItem("cart")) {
      const productWithQuantity = {
        ...product,
        quantity: 1,
      };

      runInAction(() => {
        this.cart.push(productWithQuantity);
      });

      localStorage.setItem("cart", JSON.stringify(this.cart));
    } else {
      const isProductInCart = this.cart.find(
        (cartProduct) => cartProduct.id === product.id
      );

      if (isProductInCart) {
        this.cart = this.cart.map((cardProduct) => {
          return cardProduct.id !== isProductInCart.id
            ? cardProduct
            : { ...cardProduct, quantity: (cardProduct.quantity += 1) };
        });

        localStorage.setItem("cart", JSON.stringify(this.cart));
      } else {
        const productWithQuantity = {
          ...product,
          quantity: 1,
        };

        runInAction(() => {
          this.cart.push(productWithQuantity);
        });

        localStorage.setItem("cart", JSON.stringify(this.cart));
      }
    }
    this.updateCart();
  };

  removeFromCart = (productId) => {
    this.cart = this.cart.filter((product) => product.id !== productId);
    localStorage.setItem("cart", JSON.stringify(this.cart));
  };

  increaseQuantity = (productId) => {
    this.cart = this.cart.map((cardProduct) => {
      return cardProduct.id !== productId
        ? cardProduct
        : { ...cardProduct, quantity: (cardProduct.quantity += 1) };
    });

    localStorage.setItem("cart", JSON.stringify(this.cart));
  };

  decreaseQuantity = (productId) => {
    this.cart = this.cart.map((cardProduct) => {
      return cardProduct.id !== productId
        ? cardProduct
        : { ...cardProduct, quantity: (cardProduct.quantity -= 1) };
    });

    localStorage.setItem("cart", JSON.stringify(this.cart));
  };

  updateCart = () => {
    runInAction(() => {
      this.cart = JSON.parse(localStorage.getItem("cart"));
    });
  };
}

export default new CartStore();
