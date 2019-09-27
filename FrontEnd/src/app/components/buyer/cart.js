import React from 'react';

class CartModal extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return ( 
            <div className="modal fade" id="cartModal" tabIndex="-1" role="dialog" aria-labelledby="cartModalTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="cartModalTitle">Your mouth watering cart</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-success">Proceed to Checkout</button>
                </div>
                </div>
                </div>
            </div>
        )
    }
}
export default CartModal;


