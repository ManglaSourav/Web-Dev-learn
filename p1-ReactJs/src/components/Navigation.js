import React, { Component } from "react";
import './Navigation.css';

export default class Navigation extends Component {


    // Used for rendering
    getClasses(ctx, index) {
        let classes = `material-icons ${ctx}`;
        if (ctx === 'dots') {
            if (this.isLast(index)) {
                classes += ' hidden';
            }
        } else {
            classes += this.isLast(index) ? ' small' : ' x-small';
            if (index === 0) {
                classes += ' first';
            }
        }
        console.log(classes);
        return classes;
    }

    // Used for rendering
    isLast(index) {
        return index === this.props.locations.length - 1;
    }

    moveUp(index) {
        const { locations } = this.props;
        if (index > 0) {
            const temp = locations[index];
            locations[index] = locations[index - 1];
            locations[index - 1] = temp;
            this.setState({ locations });
        }
    }

    moveDown(index) {
        const { locations } = this.props;
        if (index < locations.length - 1) {
            const temp = locations[index];
            locations[index] = locations[index + 1];
            locations[index + 1] = temp;
            this.setState({ locations });
        }
    }

    render() {

        const { locations } = this.props;

        return (
            <div className="layout-row align-items-center justify-content-center navigation-screen">
                <div className="card layout-row flat map-card">
                    <section className="card pb-16 pr-16 flex-auto layout-column justify-content-center">
                        <ul className="pl-0" data-testid="location-list">
                            {/* {/*Use this li for rendering each location item as it contains all the data-testid attributes required for the tests to pass */}
                            {
                                locations.map((location, index) => {
                                    return (
                                        <li key={'row' + index} data-testid={'location-' + index}
                                            className="layout-row justify-content-between align-items-center mr-8 pl-40 relative">
                                            <div className="layout-column justify-content-start align-items-center handle">
                                                <i className={this.getClasses('marker', index)}>{index === locations.length - 1 ? 'room' : 'radio_button_checked'}</i>
                                                <i className={this.getClasses('dots', index)}>more_vert</i>
                                            </div>
                                            <div className="location-name">
                                                <p className="caption text-start mb-4" data-testid="location">{location}</p>
                                            </div>
                                            <div>
                                                {
                                                    index !== 0 &&
                                                    <button className="icon-only small mx-0" data-testid="up-button" onClick={() => this.moveUp(index)}>
                                                        <i className="material-icons">arrow_upward</i>
                                                    </button>
                                                }
                                                {
                                                    index !== locations.length - 1 &&
                                                    <button className="icon-only small mx-0" data-testid="down-button" onClick={() => this.moveDown(index)} >
                                                        <i className="material-icons">arrow_downward</i>
                                                    </button>
                                                }
                                            </div>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </section>
                    <section className="flex-auto">
                        <img src="images/map.svg" className="fill" alt="map" />
                    </section>
                </div>

            </div >
        );
    }
}
