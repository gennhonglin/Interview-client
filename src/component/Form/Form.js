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
    
     //Updates the state of the input fields
    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }



    //submits data to the backend
    const handleSubmit = async (e) => {
        e.preventDefault();


        //This should ensure that in the phone number input field that the user only enters numbers and that the number is between 3 and 10 characters long.
        const phoneValidation = /^[0-9]{3,10}$/;
        
        if(!phoneValidation.test(formData.number)) {
            alert("Please enter a valid phone number.");
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
                 id="filled-basic" type="text" label="First Name" name="fName" variant="filled" value={formData.fName} onChange={handleChange} required
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
                id="filled-basic" type="text" label="Last Name" name="lName" variant="filled" value={formData.lName} onChange={handleChange} required
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
                id="filled-basic" type="tel" label="Phone Number" name="number" variant="filled" value={formData.number} onChange={handleChange} required
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
                id="filled-email" type="email" label="Email" name="email" variant="filled" value={formData.email} onChange={handleChange} required
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