import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";
import Form from './Form.js';

describe('Form', () => { 

    //Test to check if the form renders
    test('should render the form', () => {
        render(<Form />); //This should render the form component
        expect(screen.getByText(/Contact Form/i)).toBeInTheDocument(); //This should check if title is rendered
        
         // Check if input fields are present
         expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
         expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
         expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
         expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    });

    //Test to check if the form submits successfully with proper data
    test('should submit form successfully', async () => {
        render(<Form />); //This should render the form component

        //This should fill the input fields with proper data
        fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '1234567890' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'mealtime@test.com' } });

        //This should submit the form
        fireEvent.click(screen.getByRole("button", { name: /submit/i }));

        //Ensure validation error messages are not displayed
        expect(screen.queryByText("Please enter a valid phone number.")).not.toBeInTheDocument();
    });

    //Test to check if entering empty data in the form fields will display error messages
    test('should display error messages for empty fields', async () => {
        render(<Form />); 

        //This should submit the form
        fireEvent.click(screen.getByRole("button", { name: /submit/i }));

        //Ensure validation error messages are displayed
        await waitFor(() => {
            expect(screen.getByText("First Name is required")).toBeInTheDocument();
            expect(screen.getByText("Last Name is required")).toBeInTheDocument();
            expect(screen.getByText("Please enter a valid phone number")).toBeInTheDocument();
            expect(screen.getByText("Invalid Email Format")).toBeInTheDocument();
        });
    });

    //Tests to check if an incorrect phone number will display an error message
    test("displays an error for invalid phone number", async () => {
        render(<Form />);
    
        fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: "abc" } }); // Enter an invalid phone number
        fireEvent.submit(screen.getByRole("button", { name: /submit/i })); // Simulate form submission
    
        // Expect an error message for incorrect phone number input
       
        await waitFor(() => {
            expect(screen.getByText("Please enter a valid phone number")).toBeInTheDocument();
        });
      });

      //Tests to check if an incorrect email will display an error message
    test("displays an error for invalid email", async () => {
        render(<Form />); 
    
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "abc" } }); // Enter an invalid email
        fireEvent.submit(screen.getByRole("button", { name: /submit/i })); // Simulate form submission
    
        // Expect an error message for incorrect email input
        await waitFor(() => {
            expect(screen.getByText("Invalid Email Format")).toBeInTheDocument();
        });
      });


});

