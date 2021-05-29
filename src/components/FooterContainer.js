import '../stylesheets/Footer.css';
function FooterContainer(props){
    return (
        <footer>

            <div className="footer-logo-wrapper">
                <div className="footer-logo"></div>
                <h2>Panchatt<br/>Media<br/>Company</h2>
            </div>

            <div className="footer-about-us-wrapper">
                <p className="footer-about-us">
                    Two Radio Jockeys Join Youtube , and 
                    Magic happens ....<br/><br/>
                    Our Idea of Panchatt , An Online
                    Platform for desi people to have 
                    fun while being equally aware on 
                    social bits.
                </p>
                <div className="footer-social-media-links">
                    <h4>Get In Touch ...</h4>
                    <div className="footer-social-media-icons">
                        <a href="#facebook"></a>
                        <a href="#instagram"></a>
                        <a href="#mail"></a>
                    </div>
                </div>
            </div>

            <div className="footer-links">
                <a>Media</a>
                <a href="#youtube">Youtube</a>
                <a>Courses</a>
                <a>Join Us</a>
            </div>

            <span className="get-to-top-link">GET TO TOP</span>

        </footer>
    )
}
export default FooterContainer;
