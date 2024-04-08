import "./form-input.component.scss";
const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />

      {label && (
        <label
          className={`${otherProps.value ? "shrink" : ""} form-input-label`} // here is there are some value in fields we shrink label
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
