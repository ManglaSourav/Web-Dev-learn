import React, { Component } from "react";
import store from "../store";
import { withRouter } from "react-router-dom";
import { setEditedProduct } from "../actions/productActions";
import { connect } from "react-redux";

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      name: "",
      weight: "",
      availability: 0,
      productUrl: "",
      priceTier: "",
      priceRange: "",
      isEditable: false,
      budget: [],
      premier: []
    };
    //Bindings of methods
    this.onChangePriceTier = this.onChangePriceTier.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onIsEditable = this.onIsEditable.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    //priceInfo data
    // const priceData =  store.getState().products.priceInfo;
    const priceData = this.props.price;

    //data of selected product
    // const data =  store.getState().products.products[
    //   this.props.location.state.num
    // ];
    const data = this.props.products[this.props.location.state.num];

    if (data) {
      this.setState({
        index: this.props.location.state.num,
        name: data.name,
        weight: data.weight,
        availability: data.availability,
        productUrl: data.productUrl,
        priceTier: data.pricingTier,
        priceRange: data.priceRange,
        isEditable: data.isEditable,
        budget: priceData.budget,
        premier: priceData.premier
      });
    }
  }
  onChangePriceTier(e) {
    //use async
    // this.setState({
    //   priceTier: e.target.id
    // });
    fetch(
      this.setState({
        priceTier: e.target.id
      })
    ).then(() => {
      if (this.state.priceTier === "budget") {
        this.setState({
          priceRange: this.state.budget[0]
        });
      } else {
        this.setState({
          priceRange: this.state.premier[0]
        });
      }
    });
  }
  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }
  onIsEditable(e) {
    if (this.state.isEditable) {
      this.setState({
        isEditable: false
      });
    } else {
      this.setState({
        isEditable: true
      });
    }
  }
  onChangePrice(e) {
    e.preventDefault();
    this.setState({
      priceRange: e.target.id
    });
  }
  onSubmit(e) {
    e.preventDefault();
    // console.log(this.state);
    this.props.setEditedProduct(this.state, store.getState().products.products);
    this.props.history.push("/");
  }

  render() {
    //this will set menu list in Price Range dropdown
    const setMenu = () => {
      if (this.state.priceTier === "budget") {
        return this.state.budget.map((b, i) => {
          return (
            <button
              className='dropdown-item'
              type='button'
              key={i}
              id={b}
              onClick={this.onChangePrice}>
              {b}
            </button>
          );
        });
      } else {
        return this.state.premier.map((p, i) => {
          return (
            <button
              className='dropdown-item'
              type='button'
              key={i}
              id={p}
              onClick={this.onChangePrice}>
              {p}
            </button>
          );
        });
      }
    };

    return (
      <div>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th scope='col'>FieldName</th>
              <th scope='col'>Type</th>
              <th scope='col'>Comments</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td>
                <input
                  style={{ width: "100%" }}
                  placeholder='Enter Name'
                  name='name'
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </td>
              <td>
                {" "}
                <label>Required</label>
              </td>
            </tr>
            <tr>
              <td>Weight</td>
              <td>
                {" "}
                <input
                  style={{ width: "100%" }}
                  placeholder='Enter Weight'
                  name='weight'
                  value={this.state.weight}
                  onChange={this.onChange}
                />
              </td>
              <td>
                {" "}
                <label>Required</label>
              </td>
            </tr>
            <tr>
              <td>Availability</td>
              <td>
                <input
                  style={{ width: "100%" }}
                  placeholder='Availability'
                  name='availability'
                  value={this.state.availability}
                  onChange={this.onChange}
                />
              </td>
              <td>
                {" "}
                <label>Optional</label>
              </td>
            </tr>
            <tr>
              <td>Product Url</td>
              <td>
                <input
                  style={{ width: "100%" }}
                  placeholder='Product URL'
                  name='productUrl'
                  value={this.state.productUrl}
                  onChange={this.onChange}
                />
              </td>
              <td>
                {" "}
                <label>Required</label>
              </td>
            </tr>
            <tr>
              <td>Price Tier</td>
              <td>
                {" "}
                <div className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='budget'
                    id='budget'
                    value={this.state.priceTier}
                    checked={this.state.priceTier === "budget"}
                    onChange={this.onChangePriceTier}
                  />
                  <label className='form-check-label'>budget</label>
                </div>
                <div className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='premier'
                    id='premier'
                    value={this.state.priceTier}
                    checked={this.state.priceTier === "premier"}
                    onChange={this.onChangePriceTier}
                  />
                  <label className='form-check-label'>premier</label>
                </div>
              </td>
              <td>
                {" "}
                <label>Required</label>
              </td>
            </tr>
            <tr>
              <td>Price Range</td>
              <td>
                <div className='dropdown'>
                  <button
                    className='btn btn-secondary dropdown-toggle'
                    type='button'
                    id='dropdownMenu2'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                    style={{ width: "20%" }}>
                    {this.state.priceRange}
                  </button>
                  <div className='dropdown-menu'>{setMenu()}</div>
                </div>
              </td>
              <td>
                {" "}
                <label>Required</label>
              </td>
            </tr>
            <tr>
              <td>Is Editable</td>
              <td>
                <div className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    name='isEditable'
                    type='checkbox'
                    checked={this.state.isEditable}
                    value={this.state.isEditable}
                    onChange={this.onIsEditable}
                  />
                </div>
              </td>
              <td>
                {" "}
                <label>Required</label>
              </td>
            </tr>
            <tr>
              <td colSpan='3'>
                <button
                  type='button'
                  disabled={
                    !(
                      this.state.name &&
                      this.state.weight &&
                      this.state.productUrl
                    )
                  }
                  className='btn btn-primary'
                  onClick={this.onSubmit}
                  style={{ marginLeft: "40%", marginRight: "30%" }}>
                  Submit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.products,
  price: state.products.priceInfo
});

export default connect(
  mapStateToProps,
  { setEditedProduct }
)(withRouter(EditProduct));
