import { useEffect, useState } from 'react';
import './ProductDetails.scss';
import { ProductDetailed } from '../../types/ProductDetailed';
import { service } from '../../services/getAllProducts';
import cn from 'classnames';
import { Button } from '../Button/Button';
import { IconFavour } from '../IconFavour';

export const ProductDetails = () => {
  const itemId = 'apple-iphone-xs-max-256gb-gold';
  const [item, setItem] = useState<ProductDetailed>();
  const [bigImage, setBigImage] = useState<string>();

  useEffect(() => {
    service
      .getPhones()
      .then(res => setItem(res.find(item => item.id === itemId)));
    setBigImage(item?.images[0]);
  }, []);

  if (!item) {
    return null;
  }

  const {
    name,
    colorsAvailable,
    capacityAvailable,
    images,
    screen,
    resolution,
    processor,
    ram,
    description,
    camera,
    zoom,
    cell,
  } = item;

  const buttonText = true ? 'Add to cart' : 'Added to cart';
  const fullTechSpecs = [
    { Screen: screen },
    { Resolution: resolution },
    { Processor: processor },
    { RAM: ram },
    { 'Built in memory': capacityAvailable },
    { Camera: camera },
    { Zoom: zoom },
    {
      Cell: cell.map((el, index) =>
        index === cell.length - 1 ? el : el + ', ',
      ),
    },
  ];

  return (
    <>
      <h2 className="item-title">{name}</h2>
      <section className="boxed-images">
        <div className="boxed-images__small-container">
          {images.map(image => (
            <img
              key={image}
              className="boxed-images__small-image"
              src={image}
              alt={image}
              onClick={() => setBigImage(image)}
            />
          ))}
        </div>
        <div className="boxed-images__big-container">
          <img
            className="boxed-images__big-image"
            src={bigImage ? bigImage : images[0]}
            alt=""
          />
        </div>
      </section>

      <section className="short-params section-container">
        <div className="short-params__pairs">
          <p className="short-params__pairs-title">Available colors</p>
          <div className="wrapper">
            {colorsAvailable.map(color => (
              <p
                key={color}
                style={{ backgroundColor: color }}
                className={cn('short-params__available-color', {
                  'short-params__available-color--active': false,
                })}
                onClick={() => {}}
              ></p>
            ))}
          </div>
        </div>
        <div className="short-params__pairs">
          <p className="short-params__pairs-title">Select capacity</p>
          <div className="wrapper">
            {capacityAvailable.map(capacity => (
              <div
                key={capacity}
                className={cn('short-params__available-capacity', {
                  'short-params__available-capacity--active': false,
                })}
                onClick={() => {}}
              >
                {capacity}
              </div>
            ))}
          </div>
        </div>
        <div className="short-params__prices">
          <span className="short-params__prices-discount">$700</span>
          <span className="short-params__prices-full">$799</span>
        </div>

        <div className="wrapper">
          <Button handleClick={() => {}}>{buttonText}</Button>
          <IconFavour handleClick={() => {}} />
        </div>
        <div className="short-params__params">
          {fullTechSpecs.slice(0, 4).map((TechSpec, index) => (
            <div className="short-params__params-pair" key={index}>
              {Object.entries(TechSpec).map(([property, value]) => (
                <>
                  <p className="short-params__param">{property}</p>
                  <p className="short-params__value">{value}</p>
                </>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="about section-container">
        <h3 className="about__title">About</h3>
        {description.map(element => (
          <>
            <h4 className="about__paragraph-title">{element.title}</h4>
            <p className="about__paragraph-body">{element.text}</p>
          </>
        ))}
      </section>

      <section className="tech-specs section-container">
        <h3 className="tech-specs__title">Tech specs</h3>
        <div className="tech-specs__params-container">
          {fullTechSpecs.map((TechSpec, index) => (
            <div className="tech-specs__params-pair" key={index}>
              {Object.entries(TechSpec).map(([property, value]) => (
                <>
                  <p className="tech-specs__param">{property}</p>
                  <p className="tech-specs__value">{value}</p>
                </>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
