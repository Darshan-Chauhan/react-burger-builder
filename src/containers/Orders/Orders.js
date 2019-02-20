import React, { Component } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    var fetchorders = [];
    axios.get("orders.json")
      .then(res => {
        for (let key in res.data) {
          fetchorders.push({
            ...res.data[key],
            id: key
          })
        }
      })
      .finally(() => {
        this.setState({loading: false, orders: fetchorders})
      });
  }
  render() {
    console.log(this.state.orders);
    return (
      <div>
        {this.state.orders.map(order => (
          <Order 
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}/>
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);