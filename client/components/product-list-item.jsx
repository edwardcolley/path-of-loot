import React from 'react';

export class ProductListItem extends React.Component {

  render() {
    return (
      <div className="card" >
        <img src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTgC0hmI_SX4RgUrur2bEzNdEXwaY1ZxgNl9ZMe8CAf8A3B14ypvQZoP4s0xOZQ7-4vb7I0QHnlSFcGWSrxQ_kVJbvqD53K1RaGGGwpeUqcJz65WQ3b3FJg&usqp=CAc" className="card-img-top" alt="..." />
        <div className="card-body">
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
        </div>
      </div>

    );
  }

}
