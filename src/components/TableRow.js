import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
        axios.get('http://localhost:4000/business/delete/'+this.props.obj.id)
            .then( res => {
              console.log(res);
             // console.log("status code " , res.status);
              if(res.status === 200){
                alert("deleted successfully...");
                window.location.reload();
              }else{
                console.log('error coming');
              }
            })            
    }
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.productName}
          </td>
          <td>
            {this.props.obj.productModel}
          </td>
          <td>
            {this.props.obj.productSN}
          </td>
          <td>
            {this.props.obj.rate}
          </td>
          <td>
            {this.props.obj.tax}
          </td>
          <td>
            <Link to={"/edit/"+this.props.obj.id} className="btn btn-primary">Edit</Link>
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
  }
}

export default TableRow;