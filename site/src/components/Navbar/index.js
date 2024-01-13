import React from 'react';

import { useContext } from 'react';
import Search from '../../assets/images/Search.svg';
import SearchDark from '../../assets/images/SearchDark.svg';
import Weather from '../../assets/images/Weather.svg';
import WeatherDark from '../../assets/images/WeatherDark.svg';

import SistentLogo from '../../assets/images/SistentLogo.svg';
import Button from '../UI/Button';
import ThemeContext from '../UI/Theme/ThemeManager';
import { Col, Row } from '../UI/Layout';
import NavbarStyles from './navbar.style';

const Navbar = () => {
  const theme = useContext(ThemeContext);

  return (
    <NavbarStyles>
      <Row Vcenter className="nav py-5 px-10 -mx-10">
        <Col xs={6} className="pl-0">
          <Row>
            <div className="w-12 h-12 mr-4 relative">
              <img src={SistentLogo} alt="Sistent logo" />
            </div>
            <div>
              <span className="text-text-default text-2xl font-bold font-qanelas leading-loose mr-2">
                Sistent
              </span>
              <span className="text-text-default text-2xl font-medium font-qanelas-medium leading-loose">
                Design System
              </span>
            </div>
          </Row>
        </Col>
        <Col xs={6}>
          <Row className="justify-end gap-8">
            <div>
              <Button>Guidelines</Button>
            </div>
            <div>
              <Button>Implement</Button>
            </div>
            <div>
              <Button>Resources</Button>
            </div>
            <div className="justify-end items-center gap-8 flex">
              <div className="w-6 h-6 relative">
                <img src={theme.dark ? SearchDark : Search} alt="Theme search icon" />
              </div>
              <div className="w-6 h-6 justify-center items-center flex">
                <div className="w-6 h-6 relative flex-col justify-start items-start flex">
                  <img
                    src={theme.dark ? WeatherDark : Weather}
                    alt="Dark theme toggle"
                    onClick={theme.toggleDark}
                  />
                </div>
              </div>
            </div>
          </Row>
        </Col>
      </Row>
    </NavbarStyles>
  );
};

export default Navbar;
