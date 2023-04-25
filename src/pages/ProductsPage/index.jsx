import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";

import { productsStore, cartStore } from "stores";
import ProductCard from "./components/ProductCard";
import Loading from "components/common/Loading";

import getStyles from "./styles";

const ProductsPage = () => {
  const classes = getStyles();

  const { getProducts, productsData, productsList, isLoadingProducts } =
    productsStore;
  const { updateCart } = cartStore;

  const [hasMore, setHasMore] = useState(
    productsList?.length < productsData?.total || true
  );

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMoreData = (productsData, productsList, callback) => {
    callback = callback ? callback : getProducts;

    if (productsList?.length >= productsData?.total) {
      setHasMore(false);
      return;
    }

    const params = { limit: 10, skip: productsList.length };

    callback({
      params,
    });
  };

  return isLoadingProducts ? (
    <Loading />
  ) : (
    <InfiniteScroll
      dataLength={productsList?.length || 1}
      next={() => fetchMoreData(productsData, productsList)}
      hasMore={hasMore}
      loader={<Loading />}
      style={classes.container}
    >
      {productsList?.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </InfiniteScroll>
  );
};

export default observer(ProductsPage);
