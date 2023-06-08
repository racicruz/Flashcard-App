import React from "react";
import {Link} from "react-router-dom"


function CardForm({ formData, handleSubmit, handleInputChange }) {
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="front"></label>
        Front
        <textarea
          type="text"
          name="front"
          id="front"
          value={formData.front}
          onChange={handleInputChange}
        ></textarea>
        <label htmlFor="back"></label>
        Back
        <textarea
          type="text"
          name="back"
          id="back"
          value={formData.back}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <Link to={"/"}><button className="btn btn-primary mx-2">
        Done
        </button></Link>
      <button type="submit" className="btn btn-primary mx-2">
        Save
      </button>
    </form>
  );
}

export default CardForm;