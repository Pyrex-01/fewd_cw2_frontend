const ParliamentInfo = () => {

    return (
        <div className="screen">
            <div className="header">
                <div className="info">
                    <h className="info_heading">Parliament Info</h>
                </div>
            </div>

            <br />
            <br />

            <div className="container">
                <div className="jumbotron">
                    <h2>Devolved and Reserved Powers</h2>
                    <p>The Scottish Parliament and UK Parliament have different sets of responsibilities. These are referred to as devolved and reserved powers.
                        The Scottish Parliament is responsible for devolved powers and the UK Parliament is responsible for reserved powers.
                        The following list of develoved and reserved powers is sourced from the parliament.scot website.
                    </p>
                </div>

                <br />

                <h3>Devolved Powers (Scottish Government)</h3>
                <ul>
                    <li>agriculture, forestry and fisheries</li>
                    <li>benefits (some aspects)</li>
                    <li>consumer advocacy and advice</li>
                    <li>economic development</li>
                    <li>education and training</li>
                    <li>elections to the Scottish Parliament and local government</li>
                    <li>energy (some aspects)</li>
                    <li>environment</li>
                    <li>equality legislation (some aspects)</li>
                    <li>fire services</li>
                    <li>freedom of information</li>
                    <li>health and social services</li>
                    <li>housing</li>
                    <li>justice and policing</li>
                    <li>local government</li>
                    <li>planning</li>
                    <li>sport and the arts</li>
                    <li>taxation (some aspects)</li>
                    <li>tourism</li>
                    <li>transport (some aspects)</li>
                </ul>

                <br />

                <h3>Reserved Powers (UK Government)</h3>
                <ul>
                    <li>benefits (some aspects)</li>
                    <li>betting and gambling</li>
                    <li>broadcasting</li>
                    <li>constitution (some aspects)&nbsp;</li>
                    <li>consumer protection policy</li>
                    <li>currency</li>
                    <li>data protection</li>
                    <li>defence and national security</li>
                    <li>equality legislation (most aspects)</li>
                    <li>energy (most aspects)</li>
                    <li>elections to the UK Parliament</li>
                    <li>employment law and industrial relations</li>
                    <li>financial services</li>
                    <li>foreign affairs</li>
                    <li>immigration, asylum and visas</li>
                    <li>nationality and citizenship</li>
                    <li>postal services</li>
                    <li>taxation (some aspects)</li>
                    <li>telecommunications</li>
                    <li>trade and industry</li>
                    <li>transport (some aspects)</li>
                </ul>
            </div>
        </div>
    )

}

export default ParliamentInfo;