// Week 2 Workshop Assignment
import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class CampsiteInfo extends Component {

   renderComments(comments) {
      console.log('comments?', comments);
      if (comments) {
         return (
            <div className="col-md-5 m-1">
               <h4>Comments</h4>
                  {comments.map(comment => <div key={comment.text} </div>
                  )}

            </div>
      }
   }
};

   renderCampsite(campsite) {
      return (
         <div className="col-md-5 m-1">
            <Card>
               <CardImg top src={campsite.image} alt={campsite.name} />
                  <CardBody>
                     <CardTitle>{campsite.name}</CardTitle>
                     <CardText>{campsite.description}</CardText>
                  </CardBody>
            </Card>
         </div>
      )
   };

   render() { 
      //console.log(this.props.campsite.comments);


      if (this.props.campsite) {
         return <div className="row"> 
            {this.renderCampsite(this.props.campsite)}
            {this.renderComments(this.props.campsite.comments)}
            
         </div>
      }
      else {
         return <div />
      }
   };


}



export default CampsiteInfo;