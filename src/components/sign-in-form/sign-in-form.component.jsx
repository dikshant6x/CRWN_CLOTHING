import { useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  SignInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";
// import { UserContext } from "../contexts/user.context";

import FormInput from "../form-input/form-input.component";

const deafultFormFields = {
  email: "",
  password: "",
}; // eeting obejct in useState only hwen that object is going to be tied together to some logic and to generalize the handle change func that will help on updating the data as its changes in form field update it as there is change in use state

const SignInForm = () => {
  const [formFields, setFormFields] = useState(deafultFormFields); //usetsate func (currect value, fucntion that gets value)=useState(x)
  const { email, password } = formFields; // destructuring object

  // const { setCurrentUser } = useContext(UserContext); // we get current state value from usercontext to setcurrentuser values

  const resetformFields = () => {
    setFormFields(deafultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup(); // simply cehcing if any existing doc refernec is there on firebase await till we get google sign in popup
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await SignInAuthUserWithEmailAndPassword(email, password);
      resetformFields();
      // setCurrentUser(user); //as there is a login and value chnage so does the user constext values > we get anew ccurrent user value
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value }); // spread in the object and modify one value in this object
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an Account?</h2>
      <span>Sign in with your Email and Password</span>
      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
