import '../css/CompaniesList.css'
import {NavLink} from 'react-router-dom'
const CList = ['Accenture', 'Amazon', 'AmericanExpress', 'Arcesium', 'Atkins', 'Axis', 'Bank', 'BajajAutoLimited', 'Barclays','BIS', 'Bosch Rexroth (India)', 'Caterpillar', 'CISCO', 'Cummins India', 'D. E. Shaw', 'Decimal Point Analytics', 'Deutsche India', 'Enerzinx', 'ExxonMobil Services & Technology', 'Ford Motors', 'GE Healthcare', 'GE Research', 'Goldman Sachs', 'IBM','Infineon', 'Inquizity Pvt Ltd', 'Tata Motors', 'John Deere', 'Kalliyath TMT', 'KLA Tencor Software India', 'MathWorks India', 'NATPAC', 'Oracle', 'Procter & Gamble', 'Qualcomm', 'Reliance Industries.', 'RS Group', 'Salesforce']


function CompaniesList(){
    return(
        <>
        <div className="CListMainContianer">
            <div className="cListSubMainContainer">
                <h1 className="mainHeading">Recruiting Companies</h1>
            <div className="companiesNavbar">
                <ul className='companiesLinks smallHeading'>
                    <NavLink>All</NavLink>
                    {/* <NavLink to='placements'>Tech</NavLink>
                    <NavLink to='placements'>IT</NavLink>
                    <NavLink to='internopp'>Banking</NavLink>
                    <NavLink to='ccdprogrammes'>Education</NavLink>
                    <NavLink to='ccdprogrammes'>Engineering</NavLink>
                    <NavLink to='ccdprogrammes'>Analytics</NavLink>
                    <NavLink to='ccdprogrammes'>Consultancy</NavLink> */}
                </ul>
            </div>

            <div className="companiesList tinyTexts">
                <ul className='comapaniesListContainer'>
                    {
                        CList.map((item) => {
                            return(
                                <li>{item}</li>
                            )
                        })
                    }
                </ul>
            </div>
            </div>
        </div>
        </>
    )
}

export default CompaniesList;