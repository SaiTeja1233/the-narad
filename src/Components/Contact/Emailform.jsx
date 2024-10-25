import "./Emailform.css";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const Emailform = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_a4mig28", // Replace with your actual EmailJS service ID
                "template_doowg9f", // Replace with your actual EmailJS template ID
                form.current,
                "1TG0N-vPvnVdYFoFs" // Replace with your actual EmailJS public key
            )
            .then(
                (result) => {
                    console.log(result.text);
                    console.log("Message sent");
                },
                (error) => {
                    console.log(error.text);
                }
            );
    };

    return (
        /* From Uiverse.io by codebykay101 */
        <div className="container">
            <div className="container-content">
                <form className="form" ref={form} onSubmit={sendEmail}>
                    <div className="descr">Contact us</div>

                    <div className="input">
                        <input
                            required
                            autoComplete="off"
                            type="text"
                            name="user_name"
                            id="name"
                        />
                        <label htmlFor="name">Name</label>
                    </div>

                    <div className="input">
                        <input
                            required
                            autoComplete="off"
                            name="user_email"
                            type="email"
                            id="email"
                        />
                        <label htmlFor="email">E-mail</label>
                    </div>

                    <div className="input">
                        <textarea
                            required
                            cols="30"
                            rows="2"
                            name="message"
                            id="message"
                        ></textarea>
                        <label htmlFor="message">Message</label>
                    </div>

                    <button type="submit">Send message →</button>
                </form>
            </div>
        </div>
    );
};

export default Emailform;
