import React from "react";
import styled from "styled-components";
import mytube from "../img/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import HistoryIcon from "@mui/icons-material/History";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SettingsIcon from "@mui/icons-material/Settings";
import FlagIcon from "@mui/icons-material/Flag";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
`;

const LogoWrapper = styled.div`
  padding: 18px 26px;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
`;

const Wrapper = styled.div`
  padding: 18px 26px;
  flex: 1;
  overflow-y: hidden; /* Hide scrollbar by default */
  transition: overflow-y 0.3s ease; /* Smooth transition for the scrollbar */

  &:hover {
    overflow-y: auto; /* Show scrollbar on hover */
  }

  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 20px; /* Width of the scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.bgLighter}; /* Background of the scrollbar track */
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.soft}; /* Color of the scrollbar thumb */
    border-radius: 10px; /* Rounded corners of the scrollbar thumb */
    border: 4px solid ${({ theme }) => theme.bgLighter}; /* Adds space around the thumb */
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 20px;
`;

function Menu({ darkMode, setDarkMode }) {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Container>
      <LogoWrapper>
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <Logo>
            <Img src={mytube} />
            MyTube
          </Logo>
        </Link>
      </LogoWrapper>
      <Wrapper>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
        <Item>
          <HomeIcon />
          Home
        </Item>
          </Link>
        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <ExploreIcon />
            Explore
          </Item>
        </Link>
        <Link
          to="subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SubscriptionsIcon />
            Subscription
          </Item>
        </Link>
        <Hr />
        <Item>
          <VideoLibraryIcon />
          Library
        </Item>
        <Item>
          <HistoryIcon />
          History
        </Item>
        <Hr />
        {!currentUser && (
          <>
            <Login>
              Sign in to like videos, comment, and subscribe.
              <Link
                to="signin"
                style={{ textDecoration: "none", cursor: "pointer" }}
              >
                <Button>
                  <AccountCircleIcon />
                  SIGN IN
                </Button>
              </Link>
            </Login>
            <Hr />
          </>
        )}
        <Title>BEST OF MYTUBE</Title>
        <Item>
          <LibraryMusicIcon />
          Music
        </Item>
        <Item>
          <SportsBasketballIcon />
          Sports
        </Item>
        <Item>
          <LiveTvIcon />
          Live
        </Item>
        <Hr />
        <Item>
          <SettingsIcon />
          Setting
        </Item>
        <Item>
          <FlagIcon />
          Report
        </Item>
        <Item>
          <HelpOutlineIcon />
          Help
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
      </Wrapper>
    </Container>
  );
}

export default Menu;
