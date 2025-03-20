import "./Form.scss";
import { useRef } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


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

        const phoneNumber = numberRef.current.value;
        const phoneValidation = /^[0-9]{3,10}$/;
        
        if(!phoneValidation.test(phoneNumber)) {
            alert("Please enter a valid phone number.");
            return;
        }

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
                <TextField
                 id="filled-basic" type="text" label="First Name" name="fName" variant="filled" inputRef={fNameRef} required
                 sx={{
                    input: { color: 'white'},
                    label: { color: 'lightgrey'},
                    "& .MuiFilledInput-root": {
                        backgroundColor: "#1E1E1E", 
                        "&:hover": { backgroundColor: "#292929" }, 
                    }
                 }}
                 />
            </div>
            <div className="form__input">
                <TextField
                id="filled-basic" type="text" label="Last Name" name="lName" variant="filled" inputRef={lNameRef} required
                sx={{
                    input: { color: 'white'},
                    label: { color: 'lightgrey'},
                    "& .MuiFilledInput-root": {
                        backgroundColor: "#1E1E1E", 
                        "&:hover": { backgroundColor: "#292929" }, 
                    }
                 }}
                />
            </div>
            <div className="form__input">
                <TextField
                id="filled-basic" type="tel" label="Phone Number" name="number" variant="filled" inputRef={numberRef} required
                sx={{
                    input: { color: 'white'},
                    label: { color: 'lightgrey'},
                    "& .MuiFilledInput-root": {
                        backgroundColor: "#1E1E1E",
                        "&:hover": { backgroundColor: "#292929" }, 
                    }
                 }}
                />
            </div>
            <div className="form__input">
                <TextField
                id="filled-email" type="email" label="Email" name="email" variant="filled" inputRef={emailRef} required
                sx={{
                    input: { color: 'white'},
                    label: { color: 'lightgrey'},
                    "& .MuiFilledInput-root": {
                        backgroundColor: "#1E1E1E",
                        "&:hover": { backgroundColor: "#292929" }, 
                    }
                 }}
                />
            </div>
            <div className="form__button">
                <Button
                 variant="outlined" type="submit" value="submit"
                 sx={{
                    backgroundColor: "#1E1E1E",
                    color: "white",
                    border: "none"
                 }}
                >
                    Submit
                </Button>
            </div>
        </form>
    );
}