import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class Directory extends Component {
   constructor(props) {
      super(props); // every time you have a constructor, you need this super
      this.state = {
         selectedCampsite: null
      };
   }

   onCampsiteSelect(campsite) {
      this.setState({selectedCampsite: campsite}); //never change a state directly ex: this.something = something
      // always use setState outside of constructor
   }

   renderSelectedCampsite(campsite) {
      if (campsite) {
         return (
            <Card>
               <CardImg top src={campsite.image} alt={campsite.name} />
               <CardBody>
                  <CardTitle>{campsite.name}</CardTitle>
                  <CardText>{campsite.description}</CardText>
               </CardBody>
            </Card>
         );
      }
      return <div />;
   }

   render() { // always need this
      const directory = this.props.campsites.map(campsite => {
         return (
            <div key={campsite.id} className="col-md-5 m-1">
               <Card onClick={() => this.onCampsiteSelect(campsite)}>
                  <CardImg width="100%" src={campsite.image} alt={campsite.name} />
                  <CardImgOverlay>
                     <CardTitle>{campsite.name}</CardTitle>
                     </CardImgOverlay>
               </Card>
            </div>
         );
      });

      return (
         <div className="container">
            <div className="row">
               {directory}
            </div>
            <div className="row">
               <div className="col-md-5 m-1">
                  {this.renderSelectedCampsite(this.state.selectedCampsite)}
               </div>
            </div>
         </div>
      );
   }
}

export default Directory;
      