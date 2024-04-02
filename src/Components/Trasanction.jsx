import React from "react";
import foodImage from "../images/Group 59.png";
import entertainmentImage from "../images/Group 60.png";
import travelImage from "../images/Group 61.png";
import cancelImage from "../images/cancel.png";
import editImage from "../images/edit.png";
import "./Trasanction.css"

const Trasanction = ({ data, removeExpences, editExpense }) => {
  const categoryImages = {
    Food: foodImage,
    Entertainment: entertainmentImage,
    Travel: travelImage,
  };


  if (data.length === 0) {
    return <div className="no-transactions">No transactions available.</div>;
  }


  return (
    <div>
      {data.map((item) => (
        <>
        <div className="list1" key={item.id}>
          <div className="left">
            <img src={categoryImages[item.category]} alt={item.category} />
            <div>
              <p className="title1">{item.title}</p>
              <p className="date1">{new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>

          <div className="right">
            <span>₹ {item.price}</span>
            <img src={cancelImage} alt=""  onClick={() => removeExpences(item.id)} />
            <img src={editImage} alt="" onClick={()=> editExpense(item.id)}  />
          </div>
        </div>
        <hr className="hr" />
        </>
      ))}
    </div>
  );
};

export default Trasanction;
