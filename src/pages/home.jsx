import PropTypes from "prop-types";
import Genres from "@/components/genres";
import NewArrivals from "@/components/new-arrivals";
import Footer from "@/components/Footer";
function Home({handleLikeBtnClick,selectedGenres, setSelectedGenres, wishList, setWishList }) {
  return (
    <div className="mt-3">
      <Genres
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
      <NewArrivals handleLikeBtnClick={handleLikeBtnClick} setWishList={setWishList} wishList={wishList} />
      
      <Footer />
    </div>
  );
}
export default Home;

Home.propTypes = {
  selectedGenres: PropTypes.array,
  setSelectedGenres: PropTypes.func,
  wishList: PropTypes.array,
  setWishList: PropTypes.func,
};
