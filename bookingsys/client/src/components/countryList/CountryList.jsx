import "./countryList.css";
import romeimg from '../images/rome.jpg';

const CountryList = () => {
    return (
        <div className="clist">

            <div className="clistItem">
                <img className="clistImg" alt="rome" src={romeimg}></img>
                <div className="clistTitles">
                    <h1>Rome</h1>
                    <h2>233 rome</h2>
                </div>
            </div>

            <div className="clistItem">
            <img className="clistImg" alt="france" src={romeimg}></img>
                <div className="clistTitles">
                    <h1>France</h1>
                    <h2>232 France</h2>
                </div>
            </div>

            <div className="clistItem">
            <img className="clistImg" alt="USA" src={romeimg}></img>
                <div className="clistTitles">
                    <h1>USA</h1>
                    <h2>210 USA</h2>
                </div>
            </div>

        </div>
    )
}

export default CountryList