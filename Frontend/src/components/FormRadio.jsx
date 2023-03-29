const FormRadio = ({ title, group }) => {
  return (
    <div className="">
      <label className="">
        <input type="radio" value={title} name={group} className="bg-secondary" />
        <span className="p-2">{title}</span>
      </label>
    </div>
  );
};

export default FormRadio;
