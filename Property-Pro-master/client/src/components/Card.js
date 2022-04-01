import React, { Component } from "react";
import { Card, Rate } from "antd";
import { withRouter } from "react-router-dom";
import jwtDecode from "jwt-decode";

const { Meta } = Card;

class PropertyCard extends Component {
  renderEdit = data => {
    if (localStorage.getItem("jwtToken")) {
      const decoded = jwtDecode(localStorage.getItem("jwtToken"));
      // console.log(decoded.type);

      if (decoded.type === "admin") {
        return (
          <a
            className='button is-primary'
            style={{ margin: "5px" }}
            onClick={() =>
              this.props.history.push({
                pathname: "/edit",
                state: { property: data, to: "edit" }
              })
            }>
            Edit
          </a>
        );
      }
    }
  };
  render() {
    const { data } = this.props;
    return (
      <div>
        <Card
          style={{ width: 300 }}
          cover={<img alt='property Image' src={data.propertyImg} />}>
          <div className='cardTitle'>
            <Meta title={data.propertyName} description={data.size} />
            <div>
              {data.rating}
              <i
                style={{ marginLeft: "3px", color: "#27A745" }}
                className='fas fa-star'
              />
            </div>
          </div>
          <div style={{ color: "#0A0B06", marginTop: "10px" }}>
            Rs. {data.price}
          </div>{" "}
          <a
            className='button is-primary'
            style={{ marginTop: "5px" }}
            onClick={() =>
              this.props.history.push({
                pathname: "/property",
                state: { property: data }
              })
            }>
            View
          </a>
          {this.renderEdit(data)}
        </Card>
      </div>
    );
  }
}

export default withRouter(PropertyCard);
