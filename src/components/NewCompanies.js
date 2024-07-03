import React from "react";
import styled, { keyframes, css } from "styled-components";
import goldmannsachs from "../company/goldmann2.png";
import atlasian from "../company/Atlassian-Logo.png";
import qualcomm from "../company/Qualcomm.png";
import texas from "../company/TexasInstruments-Logo.svg.png";
import oracle from "../company/Oracle.png";
import deshaw from "../company/deshaw.png";
import lt from "../company/lt.png";
import nvidia from "../company/nvidialogo.png";
import salesforce from "../company/Salesforce-logo.webp";

import samsung from "../company/Samsung_Logo.svg.png";
import deloitte from "../company/deloitte.png";
import barclays from "../company/Barclays-Logo-768x432.png";
import cisco from "../company/cisco.png";
import wabtec from "../company/Wabtec_Logo.svg.png";
import bajaj from "../company/bajaj.png";
import tcs from "../company/tcs.png";
import suzuki from "../company/suzuki.png";
import tvs from "../company/tvs.png";
import sap from "../company/sap.svg.png";

import accenture from "../company/Accenture.svg.png";
import federal from "../company/Federal_Bank_Logo.png";
import ampere from "../company/Ampere-Logo.png";
import siemens from "../company/siemens.png";
import wabco from "../company/wabco-vector-logo.png";
import tata from "../company/Tata_Power_Logo.png";
import benz from "../company/Mercedes-Benz_logo.svg.png";
import amd from "../company/AMD.png";
import hdfc from "../company/hdfc.png";
import intel from "../company/Intel-Logo.png";

import ibm from "../company/ibm.png";
import jpmorgan from "../company/jp.png";
import ford from "../company/ford.png";
import bp from "../company/bpcl.jpg";
import reliance from "../company/reliance.png";
import hp from "../company/hp.png";
import ge from "../company/ge.png";
import paytm from "../company/paytm.png";
import be from "../company/Bharat_Electronics_Limited-Logo.wine.png";
import uber from "../company/Uber.png";
import discovery from "../company/Discovery-Channel-Logo.png";

const App = () => {
  const row1 = [
    goldmannsachs,atlasian,qualcomm,texas,oracle,deshaw,lt,
    // "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/7ae42bac3b34999c0db3.png",
    // "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/b2bd91d7b87b2181ca45.png",
    // "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6591cdc0702b32310306.png",
    // "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/3b7d9f4b073deb6a9b74.png",
    // "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/3cd767dea94a85078ca4.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/a2b3c3709ffedce2a22a.png",
    nvidia,salesforce
  ];

  const row2 = [
    // "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6c585c33ca6c71c79bb7.png",
    // "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/9dd55e54b5a28658bf4e.png",
    // "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/0384060dcbf73b6a707c.png",
    // "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/35e044b3354aaa0caed5.png",
    // "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/f50ae7cbf6cc805bdadc.png",
    // "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6c585c33ca6c71c79bb7.png",
    samsung,deloitte,barclays,cisco,wabtec,bajaj,tcs,suzuki,tvs,sap
  ];
  const row3 = [
    accenture,federal,ampere,siemens,wabco,tata,benz,amd,hdfc,intel
  ];
  const row4 = [
    ibm,jpmorgan,ford,bp,reliance,hp,ge,paytm,be,uber,discovery
  ];
  return (
    <AppContainer>
      <Wrapper>
        <Text>Our Previous Recruiters</Text>
        {/* <Note>Our customers have gotten offers from awesome companies.</Note> */}
        <Marquee>
          <MarqueeGroup>
            {row1.map((el) => (
              <ImageGroup>
                <Image src={el} />
              </ImageGroup>
            ))}
          </MarqueeGroup>
          <MarqueeGroup>
            {row1.map((el) => (
              <ImageGroup>
                <Image src={el} />
              </ImageGroup>
            ))}
          </MarqueeGroup>
        </Marquee>
        <Marquee>
          <MarqueeGroup2>
            {row2.map((el) => (
              <ImageGroup>
                <Image src={el} />
              </ImageGroup>
            ))}
          </MarqueeGroup2>
          <MarqueeGroup2>
            {row2.map((el) => (
              <ImageGroup>
                <Image src={el} />
              </ImageGroup>
            ))}
          </MarqueeGroup2>
        </Marquee>
        <Marquee>
          <MarqueeGroup>
            {row3.map((el) => (
              <ImageGroup>
                <Image src={el} />
              </ImageGroup>
            ))}
          </MarqueeGroup>
          <MarqueeGroup>
            {row3.map((el) => (
              <ImageGroup>
                <Image src={el} />
              </ImageGroup>
            ))}
          </MarqueeGroup>
        </Marquee>
        <Marquee>
          <MarqueeGroup2>
            {row4.map((el) => (
              <ImageGroup>
                <Image src={el} />
              </ImageGroup>
            ))}
          </MarqueeGroup2>
          <MarqueeGroup2>
            {row4.map((el) => (
              <ImageGroup>
                <Image src={el} />
              </ImageGroup>
            ))}
          </MarqueeGroup2>
        </Marquee>
      </Wrapper>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  width: 100vw;
  height: 40rem;
  color: #000000;
  background-color:var(--newCompBack);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Text = styled.div`
  font-family: "Poppins", sans-serif;
  color:var(--textColor);
  font-size: 6vh;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Note = styled.div`

  font-size: 18px;
  font-weight: 200;
  margin-bottom: 10px;
  color: #7c8e9a;
`;

const Marquee = styled.div`
  display: flex;
  width: 85%;
  height: 8rem;
  overflow: hidden;
  user-select: none;
  mask-image: linear-gradient(
    to right,
    hsl(0 0% 0% / 0),
    hsl(0 0% 0% / 1) 10%,
    hsl(0 0% 0% / 1) 90%,
    hsl(0 0% 0% / 0)
  );
`;

const scrollX = keyframes`
  from {
    left: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const common = css`
  flex-shrink: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  white-space: nowrap;
      width: 285%;
  animation: ${scrollX} 30s linear infinite;
`;

const MarqueeGroup = styled.div`
  ${common}
`;
const MarqueeGroup2 = styled.div`
  ${common}
  animation-direction: reverse;
  animation-delay: -3s;
`;

const ImageGroup = styled.div`
  display: grid;
  // width: clamp(10rem, 1rem + 40vmin, 30rem);
  // padding: calc(clamp(10rem, 1rem + 30vmin, 30rem) /10);
  width:18rem;
`;

const Image = styled.img`
  object-fit: contain;
  width: 10rem;
  height:100%;  
  aspect-ratio: 16/9;
// <<<<<<< HEAD
  padding: 1vh 3vh;
// =======
  // padding: 5px;
// >>>>>>> 4f395995fdea5b22ca475c1089a9badab9c73d67x
//   box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;