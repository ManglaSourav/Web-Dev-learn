import React, { Component } from "react";
import { Descriptions, List, Typography, Icon } from "antd";
import { withRouter } from "react-router-dom";
import Header from "./Header";

class ViewProperty extends Component {
  render() {
    let pData = this.props.location.state.property;

    return (
      <div>
        <Header />
        <section className='section is-small'>
          <div className='container'>
            <div className='columns'>
              <div className='column is-centered-tablet-portrait'>
                <img src={pData.propertyImg} />
                <div className='divider' />
              </div>
              <div className='column is-8 mt-60'>
                <article className='media icon-box'>
                  <figure className='media-left'>
                    <p className='image'>
                      <i className='fas fa-home' />
                    </p>
                  </figure>
                  <div className='media-content mt-50'>
                    <div className='content'>
                      <p>
                        <span className='icon-box-title'>
                          <strong>
                            {pData.propertyName},{pData.location}
                          </strong>
                        </span>
                      </p>
                      <span>{pData.desc}</span>
                    </div>
                  </div>
                </article>

                <article className='media icon-box'>
                  <figure className='media-left'>
                    <p className='image'>
                      <Icon type='border-inner' />
                    </p>
                  </figure>
                  <div className='media-content mt-50'>
                    <div className='content'>
                      <p>
                        <span className='icon-box-title'>
                          <strong>{pData.size}</strong>
                        </span>
                      </p>
                    </div>
                    <span>
                      <span>
                        Fully furnished and semi furnished {pData.size} also
                        available
                      </span>
                    </span>
                  </div>
                </article>

                <article className='media icon-box'>
                  <figure className='media-left'>
                    <p className='image'>
                      <Icon type='star' />
                    </p>
                  </figure>
                  <div className='media-content mt-50'>
                    <div className='content'>
                      <p>
                        <span className='icon-box-title'>{pData.rating}</span>
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
        <div className='amenitiesList'>
          <List
            header={
              <div>
                <strong>Amenities</strong>
              </div>
            }
            bordered
            dataSource={pData.amenities.split(",")}
            renderItem={item => (
              <List.Item>
                <Typography.Text /> {item}
              </List.Item>
            )}
          />
        </div>
        <div className='contact'>
          <Descriptions title='Contact Info' bordered>
            <Descriptions.Item label='Owner Name'>
              {pData.ownerName}
            </Descriptions.Item>
            <Descriptions.Item label='Phone'>
              +91{pData.ownerNumber}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    );
  }
}

export default withRouter(ViewProperty);
