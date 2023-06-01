import React, { useState } from "react";
import "./css/productcart.css";

type ProductCardProps = {
  id: number;
  zindex: number;
  name: string;
  imageUrl: string;
  clickProductHandler: (id: number) => void;
};

const ProductCard = ({
  id,
  zindex,
  name,
  imageUrl,
  clickProductHandler,
}: ProductCardProps) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const onClickHandler = (id: number) => {
    clickProductHandler(id);

    setIsClicked((prevState) => !prevState);
  };

  const wrapperStyle = {
    zIndex: zindex,
  };

  const imageStyle = { backgroundImage: `url(${imageUrl})` };

  return (
    <div className="pic-container" onClick={() => onClickHandler(id)}>
      <div className="parent">
        <div
          className={`wrapper ${isClicked ? "open" : ""}`}
          style={wrapperStyle}
        >
          <div className="content">
            <div className="img" style={imageStyle}></div>
            <div className="text">
              <div className="line title">{name}</div>
              <div className="line subtitle">Check out our {name}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
