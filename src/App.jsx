import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/home.jsx";
import Orders from "./pages/orders.jsx";
import Header from "./components/header.jsx";
import Layout from "./components/layout.jsx";
import SingleProduct from "./pages/single-product.jsx";
import Shop from "./pages/shop.jsx";
import WishList from "./pages/wishlist.jsx";
import CardShop from "./pages/cart-shop.jsx";
import { instance } from "./utils/use-request.js";
import Login from "./pages/login.jsx";
function App() {
  const [cardId, setCardId] = useState("");
  const [countWishlist, setCountWishlist] = useState(0);
  const [countCard, setCountCard] = useState(0);
  const [products, setProducts] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [local, setLocal] = useState(0);
  const [isLogged, setIsLogged] = useState(() =>
    localStorage.getItem("access_token")
  );

  const getData = async () => {
    const data = await instance.get("/user");
    if (data.data?.user) {
      setWishList(data.data?.user?.wishlist);
    }
    console.log(data.status);
  };
  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    (async () => {
      const data = await instance.get("/home/products");
      setProducts(data.data?.productsList);
    })();
    getData();
  }, []);

  const handleLikeBtnClick = async (id) => {
    const el = wishList?.find((wishItem) => wishItem._id === id);
    if (!el) {
      const product = products.find((arr) => arr._id === id);
      setWishList((prev) => [...prev, product]);
      await instance.patch("/wishlist", {
        productdetails: product,
      });
      setCountWishlist((prev) => prev + 1);
    } else {
      setCountWishlist((prev) => prev - 1);
      setWishList((prev) => prev.filter((wishItem) => wishItem._id !== id));
      await instance.delete("/wishlist/" + id);
    }
  };

  return (
    <BrowserRouter>
      <Layout>
        <Header
          countCard={countCard}
          countWishlist={countWishlist}
          isLogged={isLogged}
          setIsLogged={setIsLogged}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                handleLikeBtnClick={handleLikeBtnClick}
                setCountWishlist={setCountWishlist}
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                wishList={wishList}
                setWishList={setWishList}
              />
            }
          />
          <Route
            path="/shop"
            element={
              <Shop
                setCountWishlist={setCountWishlist}
                handleLikeBtnClick={handleLikeBtnClick}
                products={products}
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                wishList={wishList}
                setWishList={setWishList}
              />
            }
          />
          <Route
            path="/product/:productID"
            element={
              <SingleProduct
                setLocal={setLocal}
                local={local}
                handleLikeBtnClick={handleLikeBtnClick}
                setCountCard={setCountCard}
                setCardId={setCardId}
              />
            }
          />
          <Route
            path="/wishlist"
            element={
              <WishList
                handleLikeBtnClick={handleLikeBtnClick}
                setCountWishlist={setCountWishlist}
                wishList={wishList}
                setWishList={setWishList}
              />
            }
          />
          <Route
            path="/cart-shop"
            element={
              <CardShop
            local={local}
                setCountCard={setCountCard}
                handleLikeBtnClick={handleLikeBtnClick}
                cardId={cardId}
                products={products}
              />
            }
          />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login setIsLogged={setIsLogged} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
export default App;
