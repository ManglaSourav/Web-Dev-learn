import React, { Component } from "react";
import { withRouter } from "react-router-dom";
class TableRow extends Component {
  onEdit(number) {
    this.props.history.push({
      pathname: "/edit-product",
      state: { num: number }
    });
  }
  render() {
    return (
      <tr>
        <th scope='row'>{this.props.num + 1}</th>
        <td>{this.props.productData.name}</td>
        <td>{this.props.productData.weight} grams</td>
        <td>{this.props.productData.availability}</td>
        {this.props.productData.isEditable ? (
          <td>
            <button
              type='button'
              className='btn btn-outline-primary'
              onClick={() => this.onEdit(this.props.num)}>
              Edit
            </button>
          </td>
        ) : null}
      </tr>
    );
  }
}
export default withRouter(TableRow);
