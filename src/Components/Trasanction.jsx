import React, { useState } from "react";
import foodImage from "../images/Group 59.png";
import entertainmentImage from "../images/Group 60.png";
import travelImage from "../images/Group 61.png";
import cancelImage from "../images/cancel.png";
import editImage from "../images/edit.png";
import left from "../images/left.png";
import right from "../images/right.png";
import "./Trasanction.css";

const Trasanction = ({ data, removeExpenses, editExpense }) => {
  const categoryImages = {
    Food: foodImage,
    Entertainment: entertainmentImage,
    Travel: travelImage,
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const indexOfLastItem = Math.min(currentPage * itemsPerPage, data.length);
  const indexOfFirstItem = Math.max(indexOfLastItem - itemsPerPage, 0);
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (data.length === 0) {
    return <div className="no-transactions">No transactions available.</div>;
  }

  return (
    <div>
      {currentItems.map((item) => (
        <>
          <div className="list1" key={item.id}>
            <div className="left">
              <img src={categoryImages[item.category]} alt={item.category} />
              <div>
                <p className="title1">{item.title}</p>
                <p className="date1">
                  {new Date(item.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="right">
              <span>₹ {item.price}</span>
              <img
                src={cancelImage}
                alt=""
                onClick={() => removeExpenses(item.id)}
              />
              <img src={editImage} alt="" onClick={() => editExpense(item.id)} />
            </div>
          </div>
          <hr className="hr" />
        </>
      ))}

      <div className="pagination">
        <img
          src={left}
          alt=""
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <h1>{currentPage}</h1>
        <img
          src={right}
          alt=""
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </div>
    </div>
  );
};

export default Trasanction;
