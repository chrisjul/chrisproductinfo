import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {

  constructor(props) {
      super(props);
      this.state = {business: [{
        "productName":"Sony pendrive",
        "productModel":"128GB",
         "productSN":"12345678",
         "hns":"12de32222",
         "quantity":"1",
         "rate":"120",
         "tax":"18",
         "amount":"120"
      },
      {
        "productName":"Sony pendrive",
        "productModel":"128GB",
         "productSN":"12345678",
         "hns":"12de32222",
         "quantity":"1",
         "rate":"120",
         "tax":"18",
         "amount":"120"
      },
      {
        "productName":"Sony pendrive",
        "productModel":"128GB",
         "productSN":"12345678",
         "hns":"12de32222",
         "quantity":"1",
         "rate":"120",
         "tax":"18",
         "amount":"120"
      },
      {
        "productName":"Sony pendrive",
        "productModel":"128GB",
         "productSN":"12345678",
         "hns":"12de32222",
         "quantity":"1",
         "rate":"120",
         "tax":"18",
         "amount":"120"
      },
      {
        "productName":"Sony pendrive",
        "productModel":"128GB",
         "productSN":"12345678",
         "hns":"12de32222",
         "quantity":"1",
         "rate":"120",
         "tax":"18",
         "amount":"120"
      },
      {
        "productName":"Sony pendrive",
        "productModel":"128GB",
         "productSN":"12345678",
         "hns":"12de32222",
         "quantity":"1",
         "rate":"120",
         "tax":"18",
         "amount":"120"
      }]};
    }
    /*componentDidMount(){
      axios.get('http://localhost:4000/business')
        .then(response => {
          this.setState({ business: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }*/
    tabRow(){
      return this.state.business.map(function(object, i){
          return <TableRow obj={object} key={i} />;
      });
    }

    render() {
      return (
        <div>
          <h3 align="center">Business List</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product SN</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Tax</th>
                <th>Amount</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
        </div>
      );
    }
  }