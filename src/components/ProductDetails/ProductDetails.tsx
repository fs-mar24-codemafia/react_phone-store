import React, { useState } from 'react';
import cn from 'classnames';
import { useSwipeable } from 'react-swipeable';

import { ProductDetailed } from '../../types/ProductDetailed';
import { Product } from '../../types/Product';

import useItem from '../../hooks/useItem';

import { colorHexMap } from '../../constants/constants';

import { AddToCartButton } from '../AddToCartButton/AddToCartButton';
import { AddToFavButton } from '../AddToFavButton';

import './ProductDetails.scss';

type Props = {
  productDetailed: ProductDetailed;
  product: Product;
};

export const ProductDetails: React.FC<Props> = ({
  productDetailed,
  product,
}) => {
  const {
    bigImage,
    setBigImage,
    fullTechSpecs,
    name,
    colorsAvailable,
    capacityAvailable,
    images,
    description,
    priceRegular,
    priceDiscount,
    updateColor,
    updateStorage,
  } = useItem(productDetailed);

  const [swipeEffect, setSwipeEffect] = useState('');

  const handleSwipeLeft = () => {
    setSwipeEffect('swipe-left');
    setTimeout(() => {
      const currentIndex = images.indexOf(bigImage || '');
      const nextIndex = (currentIndex + 1) % images.length;
      setBigImage(images[nextIndex]);
      setSwipeEffect('');
    }, 500);
  };

  const handleSwipeRight = () => {
    setSwipeEffect('swipe-right');
    setTimeout(() => {
      const currentIndex = images.indexOf(bigImage || '');
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      setBigImage(images[prevIndex]);
      setSwipeEffect('');
    }, 500);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    trackMouse: true,
  });

  return (
    <>
      <h2 className="item-title">{name}</h2>
      <section className="boxed-images">
        <div className="boxed-images__small-container">
          {images.map(image => (
            <img
              key={image}
              className={cn('boxed-images__small-image', {
                'boxed-images__small-image--active': image === bigImage,
              })}
              src={image}
              alt={image}
              onClick={() => setBigImage(image)}
            />
          ))}
        </div>
        <div
          className={`boxed-images__big-container ${swipeEffect}`}
          {...handlers}
        >
          <img className="boxed-images__big-image" src={bigImage} alt="" />
        </div>
      </section>

      <section className="short-params section-container">
        <div className="short-params__pairs">
          <p className="short-params__pairs-title">Available colors</p>
          <div className="wrapper">
            {colorsAvailable.map(color => (
              <p
                key={color}
                style={{ backgroundColor: colorHexMap[color] }}
                className={cn('short-params__available-color', {
                  'short-params__available-color--active':
                    color === productDetailed.color,
                })}
                onClick={() => updateColor(color)}
              ></p>
            ))}
          </div>
        </div>
        <div className="short-params__pairs">
          <p className="short-params__pairs-title">Select capacity</p>
          <div className="wrapper wrapper--capacity">
            {capacityAvailable.map(availCapacity => (
              <div
                key={availCapacity}
                className={cn('short-params__available-capacity', {
                  'short-params__available-capacity--active':
                    availCapacity === productDetailed.capacity,
                })}
                onClick={() => updateStorage(availCapacity)}
              >
                {availCapacity}
              </div>
            ))}
          </div>
        </div>
        <div className="short-params__prices">
          <span className="short-params__prices-discount">{`$${priceDiscount}`}</span>
          <span className="short-params__prices-full">{`$${priceRegular}`}</span>
        </div>

        <div className="wrapper">
          {product && <AddToCartButton product={product} />}
          <AddToFavButton product={product} />
        </div>
        <div className="short-params__params">
          {fullTechSpecs.slice(0, 4).map((TechSpec, index) => (
            <div className="short-params__params-pair" key={index}>
              {Object.entries(TechSpec).map(([property, value]) => (
                <React.Fragment key={index}>
                  <p className="short-params__param">{property}</p>
                  <p className="short-params__value">{value}</p>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="about section-container">
        <h3 className="about__title">About</h3>
        {description.map((element, index) => (
          <React.Fragment key={index}>
            <h4 className="about__paragraph-title">{element.title}</h4>
            <p className="about__paragraph-body">{element.text}</p>
          </React.Fragment>
        ))}
      </section>

      <section className="tech-specs section-container">
        <h3 className="tech-specs__title">Tech specs</h3>
        <div className="tech-specs__params-container">
          {fullTechSpecs.map((TechSpec, index) => (
            <div className="tech-specs__params-pair" key={index}>
              {Object.entries(TechSpec).map(([property, value]) => (
                <React.Fragment key={index}>
                  <p className="tech-specs__param">{property}</p>
                  <p className="tech-specs__value">{value}</p>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
