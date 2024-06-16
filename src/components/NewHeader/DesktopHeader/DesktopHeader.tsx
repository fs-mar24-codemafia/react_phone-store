import { FC, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

import { CartContext } from '../../../contexts/CartContext';
import { FavoritesContext } from '../../../contexts/FavoritesContext';
import { useTheme } from '../../../contexts/ThemeContext';

type Link = { title: string; link: string };

const links: Link[] = [
  { title: 'Home', link: '/' },
  { title: 'Phones', link: '/phones' },
  { title: 'Tablets', link: '/tablets' },
  { title: 'Accessories', link: '/accessories' },
];

export const DesktopHeader: FC = () => {
  const { cartItems } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <NavLink to="/" className="header__logo-link">
        <img
          src={theme === 'light' ? 'icons/logo.svg' : 'icons/logo-dark.svg'}
          alt="Nice Gadgets logo"
          className="logo"
        />
      </NavLink>

      <nav className="nav">
        <ul className="nav__list">
          {links.map(link => (
            <li className="nav__item" key={link.title}>
              <NavLink to={link.link} className="nav__link">
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav__buttons">
          <div className="theme-button">
            <DarkModeSwitch
              checked={theme === 'dark'}
              onChange={toggleTheme}
              size={23}
            />
          </div>

          <NavLink to="/favourites" className="nav__button">
            <div className="ico ico-fav icon">
              {!!favorites.length && (
                <div className="indicator indicator-fav">
                  {favorites.length}
                </div>
              )}
            </div>
          </NavLink>

          <NavLink to="/cart" className="nav__button">
            <div className="ico ico-cart icon">
              {!!cartItems.length && (
                <div className="indicator indicator-cart">
                  {cartItems.length}
                </div>
              )}
            </div>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
