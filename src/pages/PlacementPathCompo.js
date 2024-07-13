import React, { useEffect } from "react";
import "../pagesCss/placementPage.css";
import AOS from "aos";
import "aos/dist/aos.css";

function PlacementPathCompo() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div className="page" >
      <div className="pageContent" >
        <h1 className="pageHeading" data-aos="zoom-in">Placements</h1>
        <p className="smallHeading" data-aos="zoom-in">
          How to <span>Register</span>
        </p>

        <p className="tinyTexts" data-aos="zoom-in">
          The CCD notifies registration schedule for the placement and
          internship drive in an academic year. According to the schedule,
          interested students in the graduating batch and Internship batch may
          register. For the seamless conduct of the placement and internship
          campaigns, CCD avails the services of an online portal named Genskill,
          which is developed by a firm founded by our alumni. Recruiters,
          students and TPOs are provided with distinct logins in Genskill. The
          companies have to register in the Genskill portal and submit the Job
          Notification Form (JNF) for participating in the placement campaign
          and Internship Notification Form (INF) for participating in the
          Internship campaign. Companies will be able to post JNF /INF, see the
          list of applicants, and mark the final selections in Genskill. It is
          mandatory for all students who are interested to participate in the
          placement and internship campaigns to register in the Genskill portal
          and join the relevant campaign. The Genskill App will display the
          status of the application of the student. The portal also helps
          students to build their resume in an incremental way. Students may
          refer the following resources for familiarity and e-support. <br />
          Resource: <br />
          <div className="genskillButtons">
          <a href=" https://genskill.com/" className="whiteButton" target="_blank" rel="noreferrer">
           <span className="buttonText">GenSkill</span> 
          </a>
          <a
            href="https://app.genskill.com/documentation/videos/"
            target="_blank" className="whiteButton" 
            rel="noreferrer"
          >
             <span className="buttonText">Demo Videos</span> 
          </a>
          </div>
        </p>

        <p className="smallHeading" data-aos="zoom-in">Placement Process</p>

        <p className="tinyTexts" data-aos="zoom-in">
          The CCD notifies registration schedule for the placement and
          internship drive in an academic year. According to the schedule,
        </p>
      </div>

      {/* steps */}

      <div className="stepsContent">
        {/* middle line */}

        <div className="line"></div>

        {/* step 1 */}
        <div className="step" data-aos="fade-left">
          <div className="svgIcon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="black"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 15H16V17H18M18 11H16V13H18M20 19H12V17H14V15H12V13H14V11H12V9H20M10 7H8V5H10M10 11H8V9H10M10 15H8V13H10M10 19H8V17H10M6 7H4V5H6M6 11H4V9H6M6 15H4V13H6M6 19H4V17H6M12 7V3H2V21H22V7H12Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="details">
            <p className="smallHeading">Step 01</p>
            <p className="smallHeading">Company Registration</p>
            <p className="tinyTexts">
              Click on the placement/internship drive invitation link and
              register your company.
            </p>
          </div>
        </div>

        {/* step2 */}

        <div className="step" data-aos="fade-right">
          <div className="svgIcon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.0625 9.99844L19.6875 6.24844C19.6166 6.16963 19.5298 6.10674 19.4329 6.06392C19.3359 6.0211 19.231 5.99931 19.125 6H12.75V3C12.75 2.80109 12.671 2.61032 12.5303 2.46967C12.3897 2.32902 12.1989 2.25 12 2.25C11.8011 2.25 11.6103 2.32902 11.4697 2.46967C11.329 2.61032 11.25 2.80109 11.25 3V6H3.75C3.35218 6 2.97064 6.15804 2.68934 6.43934C2.40804 6.72064 2.25 7.10218 2.25 7.5V13.5C2.25 13.8978 2.40804 14.2794 2.68934 14.5607C2.97064 14.842 3.35218 15 3.75 15H11.25V21C11.25 21.1989 11.329 21.3897 11.4697 21.5303C11.6103 21.671 11.8011 21.75 12 21.75C12.1989 21.75 12.3897 21.671 12.5303 21.5303C12.671 21.3897 12.75 21.1989 12.75 21V15H19.125C19.2302 15 19.3342 14.9779 19.4303 14.9351C19.5264 14.8923 19.6125 14.8298 19.6828 14.7516L23.0578 11.0016C23.1823 10.8644 23.2517 10.6861 23.2525 10.5009C23.2534 10.3157 23.1857 10.1367 23.0625 9.99844ZM18.7913 13.5H3.75V7.5H18.7913L21.4913 10.5L18.7913 13.5Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="details">
            <p className="smallHeading">Step 02</p>
            <p className="smallHeading">Create a Job</p>
            <p className="tinyTexts">
              Create a full-time job or job for internships*
            </p>

            <div className="stepTwoInfo">
              <p className="tinyTexts">
                *Duration of internship : For B.Tech - 2 months/6 months and
                M.Tech - 2 months/1 year{" "}
              </p>
            </div>
          </div>
        </div>

        {/* step 3 */}
        <div className="step" data-aos="fade-left">
          <div className="svgIcon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C20.8027 6.94749 20.8763 6.8376 20.9264 6.71663C20.9766 6.59565 21.0024 6.46597 21.0024 6.335C21.0024 6.20403 20.9766 6.07435 20.9264 5.95338C20.8763 5.83241 20.8027 5.72252 20.71 5.63L18.37 3.29C18.2775 3.1973 18.1676 3.12375 18.0466 3.07357C17.9257 3.02339 17.796 2.99756 17.665 2.99756C17.534 2.99756 17.4043 3.02339 17.2834 3.07357C17.1624 3.12375 17.0525 3.1973 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="details">
            <p className="smallHeading">Step 03</p>
            <p className="smallHeading">Post the created jobs</p>
            <p className="tinyTexts">
              Your Job will be sent to the Placement Officer who will review and
              verify the JNF/INF
            </p>
          </div>
        </div>

        {/* step 4 */}
        <div className="step" data-aos="fade-right">
          <div className="svgIcon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 20V11.85L8.4 14.45L7 13L12 8L17 13L15.6 14.45L13 11.85V20H11ZM4 9V6C4 5.45 4.196 4.979 4.588 4.587C4.98 4.195 5.45067 3.99934 6 4H18C18.55 4 19.021 4.196 19.413 4.588C19.805 4.98 20.0007 5.45067 20 6V9H18V6H6V9H4Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="details">
            <p className="smallHeading">Step 04</p>
            <p className="smallHeading">Publishing JNF/INF</p>
            <p className="tinyTexts">
              After verification, JNF/INF will be published online to the
              eligible students, along with the information provided by the
              company.
            </p>
          </div>
        </div>

        {/* step 5 */}

        <div className="step" data-aos="fade-left">
          <div className="svgIcon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.2049 11.745C22.3228 9.46324 20.7914 7.48996 18.8 6.06906C16.8086 4.64817 14.4445 3.84193 11.9999 3.75C9.55531 3.84193 7.19122 4.64817 5.19983 6.06906C3.20844 7.48996 1.67705 9.46324 0.794925 11.745C0.73535 11.9098 0.73535 12.0902 0.794925 12.255C1.67705 14.5368 3.20844 16.51 5.19983 17.9309C7.19122 19.3518 9.55531 20.1581 11.9999 20.25C14.4445 20.1581 16.8086 19.3518 18.8 17.9309C20.7914 16.51 22.3228 14.5368 23.2049 12.255C23.2645 12.0902 23.2645 11.9098 23.2049 11.745ZM11.9999 18.75C8.02493 18.75 3.82493 15.8025 2.30243 12C3.82493 8.1975 8.02493 5.25 11.9999 5.25C15.9749 5.25 20.1749 8.1975 21.6974 12C20.1749 15.8025 15.9749 18.75 11.9999 18.75Z"
                fill="white"
              />
              <path
                d="M12 7.5C11.11 7.5 10.24 7.76392 9.49994 8.25839C8.75991 8.75285 8.18314 9.45566 7.84254 10.2779C7.50195 11.1002 7.41283 12.005 7.58647 12.8779C7.7601 13.7508 8.18869 14.5526 8.81802 15.182C9.44736 15.8113 10.2492 16.2399 11.1221 16.4135C11.995 16.5872 12.8998 16.4981 13.7221 16.1575C14.5443 15.8169 15.2471 15.2401 15.7416 14.5001C16.2361 13.76 16.5 12.89 16.5 12C16.5 10.8065 16.0259 9.66193 15.182 8.81802C14.3381 7.97411 13.1935 7.5 12 7.5ZM12 15C11.4067 15 10.8266 14.8241 10.3333 14.4944C9.83994 14.1648 9.45543 13.6962 9.22836 13.148C9.0013 12.5999 8.94189 11.9967 9.05765 11.4147C9.1734 10.8328 9.45912 10.2982 9.87868 9.87868C10.2982 9.45912 10.8328 9.1734 11.4147 9.05764C11.9967 8.94189 12.5999 9.0013 13.1481 9.22836C13.6962 9.45542 14.1648 9.83994 14.4944 10.3333C14.8241 10.8266 15 11.4067 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7957 15 12 15Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="details">
            <p className="smallHeading">Step 05</p>
            <p className="smallHeading">Viewing jobs and applicants</p>
            <p className="tinyTexts">
              Interested students apply for the job profile in order to be
              considered for the recruitment process. The list of eligible
              students, along with their resumes, will be made available to the
              recruiter for downloading/viewing through their placement account.
            </p>
          </div>
        </div>

        {/* step 6 */}

        <div className="step" data-aos="fade-right">
          <div className="svgIcon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1_565)">
                <path
                  d="M11.8501 11.85L15.0001 23.1L17.5501 19.2L22.3501 24L24.0001 22.35L19.0501 17.55L23.1001 15.15L11.8501 11.85Z"
                  fill="white"
                />
                <path
                  d="M12 18H1.5V4.5H19.5V12.6L21 12.9V3H0V19.5H12.3L12 18Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_565">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="details">
            <p className="smallHeading">Step 06</p>
            <p className="smallHeading">Shortlisting of candidates</p>
            <p className="tinyTexts">
              Recruiters can shortlist students based on their resume or conduct
              a test for the same, through online/offline mode.
            </p>
          </div>
        </div>

        {/* step 7 */}

        <div className="step" data-aos="fade-left">
          <div className="svgIcon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 20V19C1 17.1435 1.7375 15.363 3.05025 14.0503C4.36301 12.7375 6.14348 12 8 12C9.85652 12 11.637 12.7375 12.9497 14.0503C14.2625 15.363 15 17.1435 15 19V20"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M13 14C13 12.6739 13.5268 11.4021 14.4645 10.4645C15.4021 9.52678 16.6739 9 18 9C18.6566 9 19.3068 9.12933 19.9134 9.3806C20.52 9.63188 21.0712 10.0002 21.5355 10.4645C21.9998 10.9288 22.3681 11.48 22.6194 12.0866C22.8707 12.6932 23 13.3434 23 14V14.5"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M8 12C9.06087 12 10.0783 11.5786 10.8284 10.8284C11.5786 10.0783 12 9.06087 12 8C12 6.93913 11.5786 5.92172 10.8284 5.17157C10.0783 4.42143 9.06087 4 8 4C6.93913 4 5.92172 4.42143 5.17157 5.17157C4.42143 5.92172 4 6.93913 4 8C4 9.06087 4.42143 10.0783 5.17157 10.8284C5.92172 11.5786 6.93913 12 8 12ZM18 9C18.7956 9 19.5587 8.68393 20.1213 8.12132C20.6839 7.55871 21 6.79565 21 6C21 5.20435 20.6839 4.44129 20.1213 3.87868C19.5587 3.31607 18.7956 3 18 3C17.2044 3 16.4413 3.31607 15.8787 3.87868C15.3161 4.44129 15 5.20435 15 6C15 6.79565 15.3161 7.55871 15.8787 8.12132C16.4413 8.68393 17.2044 9 18 9Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className="details">
            <p className="smallHeading">Step 07</p>
            <p className="smallHeading">Conducting the interview</p>
            <p className="tinyTexts">
              Interviews of the shortlisted candidates can be conducted in
              offline/online mode in the slot provided by the Placement officer.
              A placement representative will be assigned to assist the process.
              The recruiter is expected to communicate the final selection and a
              waitlist to the placement officer, at the end of the process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlacementPathCompo;
