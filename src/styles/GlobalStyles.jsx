// src/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    line-height: 1.6;
    color: #5a4a42; /* Dark cream text */
    background-color: #FFF8F0; /* Cream background */
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #FFF8F0;
  }

  ::-webkit-scrollbar-thumb {
    background: #FF7D33; /* Bright orange */
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #E56C2B;
  }

  /* ============ Shared layout utilities ============ */
  .section {
    padding: 80px 20px;
  }

  .section-alt {
    background: #F7EFE5;
  }

  .section-white {
    background: #ffffff;
  }

  .container {
    max-width: 1300px;
    margin: 0 auto;
    width: 100%;
  }

  .section-header {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 50px;
  }

  .section-eyebrow {
    display: inline-block;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #FF7D33;
    margin-bottom: 12px;
  }

  .section-title {
    font-size: clamp(1.9rem, 3.5vw, 2.6rem);
    font-weight: 700;
    color: #2E2A26;
    line-height: 1.2;
    margin-bottom: 14px;
  }

  .section-sub {
    font-size: 1.05rem;
    font-style: italic;
    color: #8A7E74;
    line-height: 1.6;
  }

  /* ============ Shared buttons (reference-style) ============ */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 34px;
    border: none;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    text-align: center;
  }

  .btn-primary {
    background: #FF7D33;
    color: #ffffff;

    &:hover {
      background: #E56C2B;
      transform: translateY(-2px);
      box-shadow: 0 10px 22px rgba(255, 125, 51, 0.32);
    }
  }

  .btn-dark {
    background: #2A2622;
    color: #FFF8F0;

    &:hover {
      background: #E56C2B;
      transform: translateY(-2px);
      box-shadow: 0 10px 22px rgba(42, 38, 34, 0.28);
    }
  }

  .btn-outline {
    background: transparent;
    color: #2E2A26;
    border: 2px solid #EFE3D6;

    &:hover {
      border-color: #FF7D33;
      color: #FF7D33;
      background: #FFF8F0;
    }
  }
`;

export default GlobalStyles;
