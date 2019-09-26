import React from 'react';
import { Button, Row, Col } from 'reactstrap';
import { Quantity } from './quantity';

export class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      removed: false,
      value: this.props.input.quantity
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    this.setState(prevState => ({
      value: ++prevState.value
    }));
  }

  decrement() {
    this.setState(prevState => ({ value: prevState.value > 0 ? --prevState.value : 0 }));
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
    // <React.Fragment>
    //   {this.state.removed === false &&
    //   <div className="card flex-row flex-wrap h-50 w-75 mb-3 shadow">
    //     <div className="card-header w-25 border-0">
    //       <img height="200" width="200"src={this.props.input.image} alt="item image" />
    //     </div>
    //     <div className="card-block w-75 px-2">
    //       <Row className="justify-content-end mr-2 mt-2">
    //         <Button color="secondary" onClick={() => this.deleteItem()}>Remove</Button>
    //         <p>Ammount: {this.props.input.quantity}</p>
    //       </Row>
    //       <Row>
    //         <Col xs={{ size: 6, offset: 4 }} sm={{ size: 8, offset: 4 }} lg={{ size: 10, offset: 1 }}>
    //           <h3 className="card-title mt-4 ml-4">{this.props.input.name}</h3>
    //           <h3 className="ml-4 mt-1"><span className="badge badge-info">{price}</span></h3>
    //           <p className="card-text ml-4 mt-4 mb-2">{this.props.input.shortDescription}</p>
    //         </Col>
    //       </Row>
    //     </div>
    //   </div>}
    //   {this.state.removed === true &&
    //   <div></div>}
    // </React.Fragment>

    // below is an attempt at a table

      <tr>
        <td>
          <Row className="text-center">
            <Col>
              <img height="50" width="50"src={this.props.input.image} alt="item image" />
            </Col>
          </Row>
        </td>
        <td>
          <Row className="text-center mt-3">
            <Col>
              {this.props.input.name}
            </Col>
          </Row>
        </td>
        <td>
          <Row className="text-center mt-3">
            <Col>
              {price}
            </Col>
          </Row>
        </td>
        <td>
          <Row className="text-center mt-3">
            <Col>
              {price}
            </Col>
          </Row>
        </td>
        <td>
          <Row className="mt-2">
            <Col>
              <Quantity increment={this.increment} decrement={this.decrement} quantity={this.state.value} />
            </Col>
          </Row>
        </td>
        <td>
          <Row className="text-center">
            <Col>
              <i className="far fa-edit fa-lg mt-3 trashIcon" onClick={() => { this.props.update(this.props.input, this.state.value); }}></i>
            </Col>
          </Row>
        </td>
        <td>
          <Row className="text-center">
            <Col>
              <i className="fas fa-trash-alt fa-lg mt-3 trashIcon" onClick={() => this.deleteItem()}></i>
            </Col>
          </Row>
        </td>
      </tr>
    );
  }

}
