import React from 'react';

export class ImageCarousel extends React.Component {

  render() {
    return (
      <div>
        <div id="carouselControls" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img height="500" width="75%" className="shadow p-3 mb-5 bg-white rounded" src={this.props.images[0]} alt="image"/>
            </div>
            <div className="carousel-item">
              <img height="500" width="75%" className="shadow p-3 mb-5 bg-white rounded" src={this.props.images[1]} alt="image"/>
            </div>
            < div className="carousel-item">
              <img height="500" width="75%" className="shadow p-3 mb-5 bg-white rounded" src={this.props.images[2]} alt="image"/>
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselControls" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselControls" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>

      </div>
    );
  }

}
