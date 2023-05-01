import React, { useState } from 'react';
import '../style/services.css';

const Services = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="services-container">
      <div className="service">
        <div className="service-icon">
          <i className="fas fa-utensils"></i>
        </div>
        <div className="service-details">
          <h3><strong>Food Delivery</strong></h3>
          <p>
            We deliver delicious food right to your doorstep, with a wide
            selection of cuisines to choose from. Our delivery times are fast and
            efficient, so you can enjoy your meal as soon as possible.
          </p>
          <input id="ch" type="checkbox"></input>
           <div class="hidden-content2">
            <p> Our delivery drivers are courteous and professional, and will make
              sure your food is delivered hot and fresh. We offer a range of
              payment options, including cash, credit card, and online payment,
              so you can choose the one that works best for you. </p>
            <label for="ch">Show Less</label>
            </div>
       
            <label for="ch">Read More</label>
        </div>
      </div>
      <div className="service">
        <div className="service-icon">
          <i className="fas fa-truck"></i>
        </div>
        <div className="service-details">
          <h3><strong>Fast Delivery</strong></h3>
          <p>
            We pride ourselves on delivering food quickly and efficiently, so
            you can enjoy your meal without having to wait long. Our delivery
            times are among the fastest in the industry, and we always strive to
            get your food to you as soon as possible.
          </p>
          <input id="check" type="checkbox"></input>
          <div class="hidden-content2">
            <p> Our delivery drivers are trained to navigate the city quickly and
              safely, and will always go the extra mile to make sure your food
              arrives hot and fresh. We use the latest technology to track our
              deliveries, so you can always know exactly where your food is. </p>
            <label for="check">Show Less</label>
          </div>
       
          <label for="check">Read More</label>
        </div>
      </div>

      <div className="service">
        <div className="service-icon">
          <i className="fas fa-users"></i>
        </div>
        <div className="service-details">
          <h3><strong>Great Customer Service</strong></h3>
          <p>
            Our customer service team is available 24/7 to assist you with any
            questions or concerns. We pride ourselves on providing exceptional
            customer service, and will always go above and beyond to make sure
            you are satisfied with your food delivery experience.
          </p>
          <input id="checkbox" type="checkbox"></input>
       <div class="hidden-content2">
       <p> We offer a range of customer service options, including phone,
              email, and online chat. Our representatives are knowledgeable and
              friendly, and will always do their best to help you with any issue
              you may have. </p>
       <label for="checkbox">Show Less</label>
       </div>
       
       <label for="checkbox">Read More</label>
       </div>
        </div>
        </div>
       
  )
          }
  export default Services;
