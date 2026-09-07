import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:abhishekmishra2899@gmail.com" data-cursor="disable">
                abhishekmishra2899@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href="tel:+919555592522" data-cursor="disable">
                +91 95555 92522
              </a>
            </p>
            <h4>Location</h4>
            <p>Kanpur, Uttar Pradesh, India</p>
          </div>
          <div className="contact-box">
            <h4>Profiles & Social</h4>
            <a
              href="https://github.com"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
            <a
              href="https://leetcode.com"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              LeetCode <MdArrowOutward />
            </a>
            <a
              href="https://geeksforgeeks.org"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              GeeksforGeeks <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Abhishek Mishra</span>
            </h2>
            <h5>
              <MdCopyright /> {new Date().getFullYear()} Abhishek Mishra
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
