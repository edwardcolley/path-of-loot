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
    );
  }

}
