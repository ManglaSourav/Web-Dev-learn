import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import TableRow from "./TableRow";

class DisplayData extends Component {
  componentDidMount() {
    this.props.fetchProducts(); //fetch all products from store
  }
  render() {

    return (
      <div>
        {/* <h1>Display</h1> */}
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Weight</th>
              <th scope='col'>availability</th>
              <th scope='col'>isEditable</th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product, i) => {
              return <TableRow key={i} num={i} productData={product} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.products
});

export default connect(
  mapStateToProps,
  { fetchProducts }
)(DisplayData);
