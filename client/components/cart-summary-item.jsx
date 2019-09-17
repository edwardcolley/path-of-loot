import React from 'react';
import { Button } from 'reactstrap';

export class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      removed: false
    };
  }

  deleteItem() {
    this.setState({
      removed: true
    });
    this.props.delete(this.props.input);
  }

  render() {
    const price = '$' + ((this.props.input.price / 100).toFixed(2));
    return (
      <React.Fragment>
        {this.state.removed === false &&
        <div className="card flex-row flex-wrap h-25 w-75 mb-3">
          <div className="card-header border-0">
            <img height="200" width="200"src={this.props.input.image} alt="item image" />
          </div>
          <div className="card-block px-2">
            <h2 className="card-title mt-4 ml-4">{this.props.input.name}</h2>
            <h2 className="ml-4 mt-1"><span className="badge badge-info">{price}</span></h2>
            <p className="card-text ml-4 mt-4">{this.props.input.shortDescription}</p>
            <Button color="secondary" onClick={() => this.deleteItem()}>Remove</Button>
          </div>
        </div>}
        {this.state.removed === true &&
        <div></div>}
      </React.Fragment>
    );
  }

}
