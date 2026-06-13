import { useState } from "react";
import "./RegistrationForm.css";

function RegistrationForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        dob: "",
        gender: "",
        country: "",
        skills: [],
        linkedin: "",
        profilePicture: null,
        about: "",
        terms: false,
    });

    const [errors, setErrors] = useState({});

    //Validation functions for my input fields
    const validateFirstName = (value) => {
        if (!value.trim()) {
            return "First name is required";
        }
        if (value.trim().length < 3) {
            return "First name must be at least 3 characters";
        }
        if (!/^[A-Za-z]+$/.test(value.trim())) {
            return "Only alphabets are allowed";
        }
        return "";
    };

    const validateLastName = (value) => {
        if (!value.trim()) {
            return "Last name is required";
        }
        if (value.trim().length < 3) {
            return "Last name must be at least 3 characters";
        }
        if (!/^[A-Za-z]+$/.test(value.trim())) {
            return "Only alphabets are allowed";
        }
        return "";
    };

    const validateEmail = (value) => {
        if (!value.trim()) {
            return "Email is required";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
            return "Please enter a valid email address";
        }
        return "";
    };

    const validatePassword = (value) => {
        if (!value) {
            return "Password is required";
        }  
        if (value.length < 8) {
            return "Password must be at least 8 characters";
        }
        if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
        }   
        if (!/[a-z]/.test(value)) {
            return "Password must contain at least one lowercase letter";
        }   
        if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            return "Password must contain at least one special character";
        }   
        return "";
    };

    const validateConfirmPassword = (value) => {
        if (!value) {
            return "Please confirm your password";
        }
        if (value !== formData.password) {
            return "Passwords do not match";
        }
        return "";
    }; 

    const validatePhone = (value) => {
        if (!value.trim()) {
            return "Phone number is required";
        }
        if (!/^\d{10}$/.test(value.trim())) {
            return "Phone number must be 10 digits";
        }   
        return "";
    };

    const validateDOB = (value) => {
        if (!value) {
            return "Date of birth is required";
        }
        const today = new Date();
        const birthDate = new Date(value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18) {
            return "You must be at least 18 years old";
        }
        return "";
    };

    const validateGender = (value) => {
        if (!value) {
            return "Please select your gender";
        }
        return "";
    };
    const validateCountry = (value) => {
        if (!value) {
            return "Please select your country";
        }
        return "";
    };  

    const validateSkills = (value) => {
        if (value.length === 0) {
            return "Please select at least one skill";
        }   
        return "";
    };
    
    const validateTerms = (value) => {
        if (!value) {
            return "You must agree to the terms and conditions";
        }  
        return "";
    };

    //Handling the changes in the input fields
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "checkbox" && name === "terms") {
            setFormData({ ...formData, [name]: checked });
        } else if (type === "checkbox") {
            const updatedSkills = checked
                ? [...formData.skills, value]
                : formData.skills.filter((skill) => skill !== value);
            setFormData({ ...formData, skills: updatedSkills });
        } else if (type === "file") {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        
        let errorMessage = "";
        switch (name) {
            case "firstName":
                errorMessage = validateFirstName(value);
                break;
            case "lastName":
                errorMessage = validateLastName(value);
                break;
            case "email":
                errorMessage = validateEmail(value);
                break;
            case "password":
                errorMessage = validatePassword(value);
                break;
            case "confirmPassword":
                errorMessage = validateConfirmPassword(value);
                break;
            case "phone":
                errorMessage = validatePhone(value);
                break;
            case "dob":
                errorMessage = validateDOB(value);
                break;
            case "gender":
                errorMessage = validateGender(value);
                break;
            case "country":
                errorMessage = validateCountry(value);
                break;
            case "skills":
                errorMessage = validateSkills(value);
                break;
            case "terms":
                errorMessage = validateTerms(value);
                break;

            default:
                break;
        }
        
        // Clear error for the field being edited
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage,
        }));
    };

    //Validating my input fields
    const validateForm = () => {
        const newErrors = {};

        //First Name
        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }
        else if(formData.firstName.trim().length < 3) {
            newErrors.firstName = "First name must be at least 3 characters";
        }
        else if(!/^[A-Za-z]+$/.test(formData.firstName.trim())) {
            newErrors.firstName = "Only alphabets are allowed";
        }

        //Last Name
        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }
        else if(formData.lastName.trim().length < 3) {
            newErrors.lastName = "Last name must be at least 3 characters";
        }
        else if(!/^[A-Za-z]+$/.test(formData.lastName.trim())) {
            newErrors.lastName = "Only alphabets are allowed";
        }

        //Email
        if(!formData.email.trim()){
            newErrors.email = "Email is required";
        }
        else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())){
            newErrors.email = "Please enter a valid email address"
        }

        //Password
        if (!formData.password) {
            newErrors.password = "Password is required";
        }
        else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }
        else if (!/[A-Z]/.test(formData.password)) {
            newErrors.password = "Password must contain at least one uppercase letter";
        }
        else if (!/[a-z]/.test(formData.password)) {
            newErrors.password = "Password must contain at least one lowercase letter";
        }
        else if (!/[0-9]/.test(formData.password)) {
            newErrors.password = "Password must contain at least one number";
        }
        else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
            newErrors.password = "Password must contain at least one special character";
        }

        //Confirm Password
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        }
        else if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        //Phone Number
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        }
        else if (!/^\d{10}$/.test(formData.phone.trim())) {
            newErrors.phone = "Phone number must be 10 digits";
        }

        //Date of Birth
        if (!formData.dob) {
            newErrors.dob = "Date of birth is required";
        }
        else {
            const today = new Date();
            const birthDate = new Date(formData.dob);
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }  
            if (age < 18) {
                newErrors.dob = "You must be at least 18 years old";
            }
        }

        //Gender
        if (!formData.gender) {
            newErrors.gender = "Please select your gender";
        }

        //Country
        if (!formData.country) {
            newErrors.country = "Please select your country";
        }

        //Skills
        if (formData.skills.length === 0) {
            newErrors.skills = "Please select at least one skill";
        }

        //Terms and Conditions
        if (!formData.terms) {
            newErrors.terms = "You must agree to the terms and conditions";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    //Handling my form submit.
    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (formErrors) {
            console.log("Form submitted successfully", formData);
        } else {
            console.log("Form has errors", errors);
        }
    };

  //Returning my Registration Form
  return (
    <div className="container">
        <form className="form" onSubmit={handleSubmit} noValidate>
            <h2>Create Account</h2>
            <p className="subtitle">
            Fill in your details to create your account.
            </p>

            <div className="row">
                <div className="form-group">
                    <label>First Name</label>
                    <input 
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                    />

                    {errors.firstName && (
                        <p className ="error">{errors.firstName}</p>
                    )}
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input 
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your second name" 
                    />

                    {errors.lastName && (
                        <p className ="error">{errors.lastName}</p>
                    )}
                </div>
            </div>

            <div className="form-group">
            <label>Email Address</label>
            <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email" 
            />

            {errors.email && (
                <p className="error">  {errors.email} </p>
            )}
            </div>

            <div className="row">
            <div className="form-group">
                <label>Password</label>
                <input 
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password" 
                />

                {errors.password &&(
                    <p className="error">{errors.password}</p>
                )}
            </div>

            <div className="form-group">
                <label>Confirm Password</label>
                <input 
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"  
                />

                {errors.confirmPassword && (
                    <p className="error">{errors.confirmPassword}</p>
                )}
            </div>
            </div>

            <div className="row">
            <div className="form-group">
                <label>Phone Number</label>
                <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                />

                {errors.phone && (
                    <p className="error">{errors.phone}</p>
                )}
            </div>

            <div className="form-group">
                <label>Date of Birth</label>
                <input 
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                />

                {errors.dob && (
                    <p className="error">{errors.dob}</p>
                )}
            </div>
            </div>

            <div className="row">
            <div className="form-group gender-group">
            <label>Gender</label>

            <div className="radio-group">
                <label>
                <input 
                    type="radio" 
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleChange} 
                />
                Male
                </label>

                <label>
                <input 
                    type="radio" 
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleChange} 
                />
                Female
                </label>

                <label>
                <input 
                    type="radio" 
                    name="gender"
                    value="Other"
                    checked={formData.gender === "Other"}
                    onChange={handleChange} 
                />
                Other
                </label>
            </div>

            {errors.gender && (
                <p className="error">{errors.gender }</p>
            )}
            </div>

            <div className="form-group">
            <label>Country</label>

            <select>
                <option>Select Country</option>
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
            </select>

            {errors.country && (
                <p className="error">{errors.country}</p>
            )}
            </div>
            </div>

            <div className="form-group">
            <label>Technical Skills</label>

            <div className="checkbox-group">
                <label><input type="checkbox" name="skill" value="HTML" checked={formData.skills.includes("HTML")} onChange={handleChange} /> HTML</label>
                <label><input type="checkbox" name="skill" value="CSS" checked={formData.skills.includes("CSS")} onChange={handleChange} /> CSS</label>
                <label><input type="checkbox" name="skill" value="JavaScript" checked={formData.skills.includes("JavaScript")} onChange={handleChange} /> JavaScript</label>
                <label><input type="checkbox" name="skill" value="React" checked={formData.skills.includes("React")} onChange={handleChange} /> React</label>
            </div>

            {errors.skills && (
                <p className="error">{errors.skills}</p>
            )}
            </div>

            <div className="form-group">
            <label>LinkedIn Profile</label>
            <input type="url" />
            </div>

            <div className="form-group">
            <label>Profile Picture</label>
            <input type="file" />
            </div>

            <div className="form-group">
            <label>About Yourself</label>
            <textarea rows="4"></textarea>
            </div>

            <div className="terms">
            <label>
                <input type="checkbox" />
                I agree to the Terms & Conditions
            </label>

            {errors.terms && (
                <p className="error">{errors.terms}</p>
            )}
            </div>

            <button type="submit">Create Account</button>
        </form>
    </div>
  );
}

export default RegistrationForm;