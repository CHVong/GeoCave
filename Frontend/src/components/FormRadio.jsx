const FormRadio = ({ title, group, onClick }) => {
  return (
    <div className="text-left" onChange={onClick}>
      <label className="">
        <input type="radio" value={title} name={group} className="bg-secondary" required />
        <span className="p-2 ">{title}</span>
      </label>
    </div>
  );
};

export default FormRadio;
