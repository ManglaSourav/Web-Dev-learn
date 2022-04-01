import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createProperties } from "../actions/propertyActions";
import { editProperty } from "../actions/propertyActions";
import Header from "./Header";
import jwtDecode from "jwt-decode";

class AdminHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyName: "",
      desc: "",
      rating: 1,
      price: "",
      ownerName: "",
      ownerNumber: "",
      amenities: "",
      size: "1 BHK",
      location: ""
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    const decoded = jwtDecode(localStorage.getItem("jwtToken"));
    console.log(decoded.type);
    if (decoded.type !== "admin") {
      this.props.history.push("/");
    } else if (this.props.location.state.to === "edit") {
      let data = this.props.location.state.property;
      this.setState({
        propertyName: data.propertyName,
        desc: data.desc,
        rating: data.rating,
        price: data.price,
        ownerName: data.ownerName,
        ownerNumber: data.ownerNumber,
        amenities: data.amenities,
        size: data.size,
        location: data.location,
        id: data._id
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const property = {
      propertyName: this.state.propertyName,
      desc: this.state.desc,
      rating: this.state.rating,
      price: this.state.price,
      ownerName: this.state.ownerName,
      ownerNumber: this.state.ownerNumber,
      amenities: this.state.amenities,
      size: this.state.size,
      location: this.state.location
    };

    if (this.props.location.state.to === "edit") {
      this.props.editProperty(property, this.state.id, this.props.history);
    } else {
      console.log("testt");

      this.props.createProperties(property, this.props.history);
    }
  };

  render() {
    return (
      <div>
        <Header />{" "}
        <div className='propertyForm'>
          <form>
            <div className='field'>
              <label className='label'>Property Name</label>
              <div className='control'>
                <input
                  className='input is-rounded'
                  name='propertyName'
                  type='text'
                  placeholder='Raheja Estate'
                  value={this.state.propertyName}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Description</label>
              <div className='control'>
                <textarea
                  className='textarea'
                  placeholder='Textarea'
                  name='desc'
                  value={this.state.desc}
                  onChange={this.onChange}
                />
              </div>
            </div>

            <div className='field'>
              <label className='label'>Rating</label>
              <div className='control has-icons-left'>
                <div className='select'>
                  <select
                    name='rating'
                    value={this.state.rating}
                    onChange={this.onChange}>
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                  </select>
                </div>
                <span className='icon is-small is-left'>
                  <i className='fas fa-star' />
                </span>
              </div>
            </div>

            <div className='field'>
              <label className='label'>Location</label>
              <div className='control '>
                <input
                  className='input is-rounded'
                  type='text'
                  placeholder='Delhi'
                  name='location'
                  value={this.state.location}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Price</label>
              <div className='control '>
                <input
                  className='input is-rounded'
                  type='text'
                  placeholder='16L-17L'
                  name='price'
                  value={this.state.price}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Size</label>
              <div className='control has-icons-left'>
                <div className='select'>
                  <select
                    name='size'
                    value={this.state.size}
                    onChange={this.onChange}>
                    <option>4 BHK</option>
                    <option>3 BHK</option>
                    <option>2 BHK</option>
                    <option>1 BHK</option>
                  </select>
                </div>
                <span className='icon is-small is-left'>
                  <i className='fas fa-home   ' />
                </span>
              </div>
            </div>
            <div className='field'>
              <label className='label'>Amenities</label>
              <div className='control '>
                <textarea
                  className='textarea'
                  placeholder='Textarea'
                  name='amenities'
                  value={this.state.amenities}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Owner Name</label>
              <div className='control '>
                <input
                  className='input is-rounded'
                  type='text'
                  placeholder='Sourav'
                  name='ownerName'
                  value={this.state.ownerName}
                  onChange={this.onChange}
                />
              </div>
            </div>

            <div className='field'>
              <label className='label'>Owner Number</label>
              <div className='control '>
                <input
                  className='input is-rounded'
                  type='text'
                  placeholder='+91xxxxxxx'
                  name='ownerNumber'
                  value={this.state.ownerNumber}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className='field is-grouped'>
              <div className='control'>
                <button className='button is-link' onClick={this.onSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { createProperties, editProperty }
)(withRouter(AdminHandler));
