import React from "react";

const FormSelect = () => {
  return (
    <div className="flex flex-col p-2">
      <label for="cars" className="text-left italic">
        Choose a car:
      </label>

      <select name="cars" id="cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
    </div>
  );
};

export default FormSelect;
