const FormRadio = ({ title, group }) => {
  return (
    <div>
      <label className="">
        <input type="radio" value={title} name={group} className="bg-secondary text-blue-700" />
        <span className="p-2">{title}</span>
      </label>
    </div>
  );
};

export default FormRadio;
