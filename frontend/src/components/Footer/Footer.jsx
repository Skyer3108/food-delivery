import { assets } from '../../assets/assets'
import './Footer.css'

const Footer=()=>{
    return(
        <div className="footer" id='footer'>

            <div className="footer-content">

                <div className="footer-content-left">

                    <img src={assets.logo} alt=''/>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis excepturi recusandae pariatur magnam voluptatibus, assumenda delectus veritatis facere nostrum fugit aliquam impedit optio neque commodi officia facilis quisquam saepe nihil.</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>

                <div className="footer-content-center">
                       <h2>COMPANY</h2>
                       <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                       </ul>
                </div>

                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91 9182813922</li>
                        <li>skyer@gmail.com</li>
                    </ul>
                </div>

            </div>

            <hr/>
            <p className="footer-copy-right">Copyright 2024 Tomato.com-All Right Reserved.</p>

        </div>


    )
}

export default Footer