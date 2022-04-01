import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./home.css";
import Header from "./Header";
import { Layout, Rate, Button, Slider, InputNumber, Row, Col } from "antd";
import Card from "./Card";

import { getAllProperty } from "../actions/propertyActions";

const { Sider, Content } = Layout;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: 1,
      rating: 1,
      isSearch: false
    };
    this.props.getAllProperty();
  }

  onChange = value => {
    this.setState({
      inputValue: value
    });
  };

  onHandleChange = value => {
    this.setState({ rating: value });
  };
  onSearch = () => {
    this.setState({ isSearch: true });
  };

  renderData = data => {
    if (this.state.isSearch) {
      const newData = data.filter((item, i) => {
        return (
          item.price <= this.state.inputValue ||
          item.rating <= this.state.rating
        );
      });
      // console.log("from filter", newData);

      return newData.map((item, i) => {
        return (
          <Col span={12} key={i} style={{ marginTop: "20px" }}>
            <Card data={item} />
          </Col>
        );
      });
    } else {
      return data.map((item, i) => {
        return (
          <Col span={8} key={i} style={{ marginTop: "20px" }}>
            <Card data={item} />
          </Col>
        );
      });
    }
  };

  render() {
    const propertyData = this.props.property.property.result || [];

    const { inputValue } = this.state;
    return (
      <div>
        <div id='showcase'>
          <Header />
          <div id='setting-up'>
            <span className='item1'>
              <strong>Welcome to Property pro!</strong>
            </span>
            <div className='item2'>
              <div className='nitem1'>
                {" "}
                <p style={{ fontSize: "35px" }}>
                  The better way to buy real estate
                </p>
              </div>
              <div className='nitem2' />
            </div>
          </div>
        </div>

        <Layout>
          <Layout>
            <Sider id='sidebar'>
              <div>
                <strong>Filters</strong>
              </div>

              <div style={{ marginTop: "2rem" }}>
                <strong>Price</strong>
                <Row>
                  <Col span={9} style={{ marginLeft: "10px" }}>
                    <Slider
                      min={500000}
                      max={10000000}
                      onChange={this.onChange}
                      value={inputValue}
                    />
                  </Col>
                  <Col span={2} style={{ paddingTop: "5px" }}>
                    <InputNumber
                      min={500000}
                      max={10000000}
                      style={{ marginLeft: 16 }}
                      value={inputValue}
                      onChange={this.onChange}
                    />
                  </Col>
                </Row>
              </div>
              <div style={{ marginTop: "2rem" }}>
                <strong>Rating</strong>
              </div>
              <div>
                <Rate
                  defaultValue={this.state.rating}
                  onChange={this.onHandleChange}
                />
              </div>
              <Button
                type='primary'
                ghost
                style={{ marginTop: "2rem" }}
                onClick={this.onSearch}>
                Filter
              </Button>
            </Sider>
            <Content style={{ margin: "20px" }}>
              <div className='cardGrid'>
                <Row gutter={16}>{this.renderData(propertyData)}</Row>
                {/* <Row gutter={16} /> */}
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  property: state.property
});
export default connect(
  mapStateToProps,
  { getAllProperty }
)(withRouter(Home));
