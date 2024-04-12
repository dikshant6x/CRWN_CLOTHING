import { useState } from "react";
import {
  CreateUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";
// import { UserContext } from "../contexts/user.context";

import FormInput from "../form-input/form-input.component";
const deafultFormFields = {
  displayame: "",
  email: "",
  password: "",
  confirmPassword: "",
}; // eeting obejct in useState only hwen that object is going to be tied together to some logic and to generalize the handle change func that will help on updating the data as its changes in form field update it as there is change in use state

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(deafultFormFields); //usetsate func (currect value, fucntion that gets value)=useState(x)
  const { displayName, email, password, confirmPassword } = formFields; // destructuring object
  // const { setCurrentUser } = useContext(UserContext);

  const resetformFields = () => {
    setFormFields(deafultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Password don not match");
      return;
    }
    try {
      const { user } = await CreateUserWithEmailAndPassword(email, password);
      // Here we see that we get diplayName as null as firebase tend to keep auth consistent syntax throughout so it makesures. so display is not coming from userobject it will come from Form
      // setCurrentUser(user);

      await createUserDocumentFromAuth(user, { displayName });
      resetformFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value }); // spread in the object and modify one value in this object
  };

  return (
    <div className="sign-up-container">
      <h2>Don't Have an Account?</h2>
      <span>Sign up with your Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Displayname"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
