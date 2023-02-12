import { useState } from "react";
import Card from "../../components/card/Card";
import "./Contact.scss";
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../../services/authService";

export default function Contact() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const data = { subject, message };

  async function sendEmail(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/contactus `, data);
      setSubject("");
      setMessage("");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="contact">
      <h3 className="--mt">Contact Us</h3>
      <div className="section">
        <form onSubmit={sendEmail}>
          <Card cardClass={"card"}>
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              value={subject}
              placeholder="Subject"
              required
              onChange={(e) => setSubject(e.target.value)}
            />
            <label>Message</label>
            <textarea
              name="message"
              value={message}
              required
              onChange={(e) => setMessage(e.target.value)}
              cols="30"
              rows="10"
            ></textarea>
            <button className="--btn --btn-primary">Send Message</button>
          </Card>
        </form>
        <div className="details">
          <Card cardClass={"card2"}>
            <h3>Our Contact Informations</h3>
            <p>Fill the form or contact us via other channels listed bellow</p>
            <div className="icons">
              <span>
                <FaPhoneAlt /> <p>+556130004567</p>
              </span>
              <span>
                <FaEnvelope /> <p>support@inventory.com</p>
              </span>
              <span>
                <GoLocation /> <p>Brasilia, Brazil</p>
              </span>
              <span>
                <FaTwitter /> <p>@walterit</p>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
