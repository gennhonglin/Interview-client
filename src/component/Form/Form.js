import "./Form.scss";
import { useState } from "react";
import axios from "axios"; 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function Form() {
    //Grabs the input fields data
    const [formData, setFormData] = useState({
        fName: "",
        lName: "",
        number: "",
        email: ""
    });
    
    //This should handle errors in the input fields
    const [error, setError] = useState({
        fName: false,
        lName: false,
        number: false,
        email: false
    });

    const [phoneText, setPhoneText] = useState({
        number: ""
    });

    
     //Updates the state of the input fields
    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });

        //If user starts typing in the input fields, the error message should disappear
        setError({
            ...error, [e.target.name]: false
        });
        
        setPhoneText({
            ...phoneText, [e.target.name]: ""
        });
    }



    //submits data to the backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        //This should validate the input fields
        let isValid = true;

        const tempErrors = {
            fName: false,
            lName: false,
            number: false,
            email: false 
        };

        const tempPhoneText = {
            number: "" 
        };

        //Cases to validate the input fields and display error messages
        if(formData.fName.trim() === "") {
            tempErrors.fName = true;
            isValid = false;
        }

        if(formData.lName.trim() === "") { 
            tempErrors.lName = true;
            isValid = false;
        }


        //This should ensure that in the phone number input field that the user only enters numbers and that the number is between 3 and 10 characters long.
        const phoneValidation = /^[0-9]{3,10}$/;
        
        if(!phoneValidation.test(formData.number)) {
            tempErrors.number = true;
            tempPhoneText.number = "Please enter a valid phone number";
            isValid = false;
        }

        //This should ensure that the email input field is not empty and that the email is valid.
        const emailValidation = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(!emailValidation.test(formData.email)) {
            tempErrors.email = true;
            isValid = false;
        }

        //Updates the error states
        setError(tempErrors);
        setPhoneText(tempPhoneText);

        //If the input fields are not valid, the form should not be submitted.
        if(!isValid) {
            return;
        }

        try {
            await axios.post("http://localhost:5000/submit", formData);
            alert("Form submitted successfully!");

            //Resets the input form fields and clears them.
            setFormData({ fName: "", lName: "", number: "", email: "" });
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
                 id="filled-basic" label="First Name" name="fName" variant="filled" value={formData.fName}
                 error={error.fName} helperText={error.fName ? "First Name is required" : ""} onChange={handleChange} required
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
                id="filled-basic" label="Last Name" name="lName" variant="filled" value={formData.lName}
                error={error.lName} helperText={error.lName ? "Last Name is required" : ""} onChange={handleChange} required
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
                id="filled-basic" label="Phone Number" name="number" variant="filled" value={formData.number}
                error={error.number} helperText={phoneText.number} onChange={handleChange} required
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
                id="filled-email" label="Email" name="email" variant="filled" value={formData.email}
                error={error.email} helperText={error.email ? "Invalid Email Format" : ""} onChange={handleChange} required
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