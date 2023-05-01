import React from "react";
import "../style/aboutus.css";

function Aboutus() {
  return (
    <div className="container_aboutus">
      <div className="row">
        <div className="card">
          <div className="card-content">
            <h4 className="card_title">
              <strong>Mission</strong>
            </h4>
            <p>
              Welcome to our food delivery company! We're dedicated to providing
              you with the best possible service and the most delicious food
              around.
            </p>
            <input id="ch" type="checkbox"></input>
            <div className="hidden-content">
              <p>
                {" "}
                Whether you're looking for a quick lunch or a hearty dinner,
                we've got you covered.{" "}
              </p>
              <label htmlFor="ch">Show Less</label>
            </div>

            <label htmlFor="ch">Read More</label>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <h4 className="card_title">
              <strong>Vision</strong>
            </h4>
            <p>
              Our vision is to elevate the quality of life of urban consumers by
              providing unparalleled convenience.
            </p>
            <input id="check" type="checkbox"></input>
            <div className="hidden-content">
              <p>
                {" "}
                serve happiness to our customers through delicious, quality
                meals while working toward the greater good for our employees,
                community and environment.{" "}
              </p>
              <label htmlFor="check">Show Less</label>
            </div>

            <label htmlFor="check">Read More</label>
          </div>
        </div>

        <div className="card">
          <input id="ch" type="checkbox"></input>
          <div className="card-content">
            <h4 class="card_title">
              <strong>Core Value</strong>
            </h4>
            <p>
              Our team of expert chefs and delivery drivers work tirelessly to
              ensure that your food is fresh, hot, and delivered on time
            </p>
            <input id="checkbox" type="checkbox"></input>
            <div className="hidden-content">
              <p>
                {" "}
                We take pride in our commitment to quality, and we're always
                looking for new ways to improve our service and make our
                customers happy.{" "}
              </p>
              <label htmlFor="checkbox">Show Less</label>
            </div>

            <label htmlFor="checkbox">Read More</label>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Aboutus;
