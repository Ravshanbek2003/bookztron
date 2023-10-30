import PropTypes from "prop-types";
import { instance } from "@/utils/use-request";
import { useEffect, useState } from "react";
import Card from "./card";

function NewArrivals({
  handleLikeBtnClick,
  wishList,
  setWishList,
}) {
  const [arrivals, setArrivals] = useState();
  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    (async () => {
      const data = await instance.get("/home/newarrivals");
      setArrivals(data.data?.newArrivalList);
    })();
  }, []);

  return (
    <>
      <div className="flex justify-between">
        {arrivals?.map((arrival) => (
          <Card
            key={arrival._id}
            {...arrival}
            isLiked={
              wishList.findIndex(
                (wishItem) => wishItem._id === arrival?._id
              ) === -1
            }
            handleLikeBtnClick={handleLikeBtnClick}
          />
        ))}
      </div>
    </>
  );
}
export default NewArrivals;

NewArrivals.propTypes = {
  wishList: PropTypes.array,
  setWishList: PropTypes.func,
};
