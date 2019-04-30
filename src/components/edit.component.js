import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeProductName = this.onChangeProductName.bind(this);
    this.onChangeProductModel = this.onChangeProductModel.bind(this);
    this.onChangeProductSN = this.onChangeProductSN.bind(this);
    this.onChangeRate = this.onChangeRate.bind(this);
    this.onChangeTax = this.onChangeTax.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      productName: '',
      productModel: '',
      productSN: '',
      rate: '',
      tax: ''
    }
  }

  componentDidMount() {
      axios.get('http://localhost:4000/business/edit/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                productName: response.data.productName, 
                productModel: response.data.productModel,
                productSN: response.data.productSN,
                rate: response.data.rate,
                tax: response.data.tax
              
              });
          })
          .catch(function (error) {
              console.log(error);
          })
    }

  onChangeProductName(e) {
    this.setState({
      productName: e.target.value
    });
  }
  onChangeProductModel(e) {
    this.setState({
      productModel: e.target.value
    })
  }
  onChangeProductSN(e) {
    this.setState({
      productSN: e.target.value
    })  
  }
  onChangeRate(e) {
    this.setState({
      rate: e.target.value
    });
  }
  onChangeTax(e) {
    this.setState({
      tax: e.target.value
    })  
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      productName: this.state.productName,
      productModel: this.state.productModel,
      productSN: this.state.productSN,
      rate: this.state.rate,
      tax: this.state.tax
    };
    axios.post('http://localhost:4000/business/update/'+this.props.match.params.id, obj)
        .then(res => this.props.history.push('/index'));
    
    //this.props.history.push('/index');
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Update Business</h3>
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
                    <label>Product Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.productName}
                      onChange={this.onChangeProductName}
                      />
                </div>
                <div className="form-group">
                    <label>Product Model: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.productModel}
                      onChange={this.onChangeProductModel}
                      />
                </div>
                <div className="form-group">
                    <label>Product S/N: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.productSN}
                      onChange={this.onChangeProductSN}
                      />
                </div>
                <div className="form-group">
                    <label>Rate:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.rate}
                      onChange={this.onChangeRate}
                      />
                </div>
                <div className="form-group">
                    <label>Tax: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.tax}
                      onChange={this.onChangeTax}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Update Product" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}