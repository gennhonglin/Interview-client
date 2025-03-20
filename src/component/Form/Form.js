import "./Form.scss";
import { useRef } from "react";
import axios from "axios";


export default function Form() {
    //Grabs the input fields data
    const fNameRef = useRef();
    const lNameRef = useRef();
    const numberRef = useRef();
    const emailRef = useRef();

    //submits data to the backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        //Groups up the input field data and sends it to the back-end
        const formDetails = {
            fName: fNameRef.current.value,
            lName: lNameRef.current.value,
            number: numberRef.current.value,
            email: emailRef.current.value,
        };

        try {
            await axios.post("http://localhost:5000/submit", formDetails);
            alert("Form submitted successfully!");

            //Resets the input form fields and clears them.
            fNameRef.current.value = "";
            lNameRef.current.value = "";
            numberRef.current.value = "";
            emailRef.current.value = "";

        } catch (err) {
            console.log(err);
        }
    }

    

    return (
        <form className="form" onSubmit={handleSubmit}>
            {/* Title Section */}
            <h2 className="form__title">Contact Form</h2>

            {/* Input Fields */}
            <div className="form__input">
                <label>First Name:</label>
                <input type="text" name="fName" ref={fNameRef} required></input>
            </div>
            <div className="form__input">
                <label>Last Name:</label>
                <input type="text" name="lName" ref={lNameRef} required></input>
            </div>
            <div className="form__input">
                <label>Phone Number:</label>
                <input type="tel" name="number" ref={numberRef} required></input>
            </div>
            <div className="form__input">
                <label>Email:</label>
                <input type="email" name="email" ref={emailRef} required/>
            </div>
            <div className="form__button">
                <button type="submit" value="submit">Submit</button>
            </div>
        </form>
    );
}