import React from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators } from 'reactstrap';

export class LandingPageCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.props.images.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({
      activeIndex: nextIndex
    });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.props.images.length - 1 : this.state.activeIndex - 1;
    this.setState({
      activeIndex: nextIndex
    });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({
      activeIndex: newIndex
    });
  }

  render() {
    const carouselStyle = {
      padding: 0 + 'px !important'
    };
    const { activeIndex } = this.state;
    const slides = this.props.images.map((image, input) => {
      return (
        <CarouselItem
          onExiting = {this.onExiting}
          onExited = {this.onExited}
          key = {input}
        >
          <img height="300" width="100%" className="shadow p-3 mb-5 bg-white rounded noPadding" src={image.path} />
        </CarouselItem>
      );
    });

    return (
      <Carousel style={carouselStyle} className="landingCarousel"
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={this.props.images} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
      // <div>
      //   <div id="carouselControls" className="carousel slide" data-ride="carousel">
      //     <div className="carousel-inner">
      //       <div className="carousel-item active">
      //         <img height="500" width="75%" className="shadow p-3 mb-5 bg-white rounded" src={this.props.images[0]} alt="image"/>
      //       </div>
      //       <div className="carousel-item">
      //         <img height="500" width="75%" className="shadow p-3 mb-5 bg-white rounded" src={this.props.images[1]} alt="image"/>
      //       </div>
      //       < div className="carousel-item">
      //         <img height="500" width="75%" className="shadow p-3 mb-5 bg-white rounded" src={this.props.images[2]} alt="image"/>
      //       </div>
      //     </div>
      //     <a className="carousel-control-prev" href="#carouselControls" role="button" data-slide="prev">
      //       <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      //       <span className="sr-only">Previous</span>
      //     </a>
      //     <a className="carousel-control-next" href="#carouselControls" role="button" data-slide="next">
      //       <span className="carousel-control-next-icon" aria-hidden="true"></span>
      //       <span className="sr-only">Next</span>
      //     </a>
      //   </div>

    // </div>
    );
  }

}
