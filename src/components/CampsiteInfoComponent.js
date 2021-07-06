import React, { Component } from 'react';
import {
   Button, Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem,
   Modal, ModalBody, ModalHeader, Label
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isModalOpen: false,
         touched: {
            // use the event onBlur to know if a user has touched
            author: false,
         }
      };

      this.toggleModal = this.toggleModal.bind(this);
      this.submitComment = this.submitComment.bind(this);
   }

   toggleModal() {
      this.setState({
         isModalOpen: !this.state.isModalOpen
      });
   }

   submitComment(event) {
      this.toggleModal();
      this.props.addComment(this.props.campsiteId, event.rating, event.author, event.text);
      //console.log('Your comment: ' + JSON.stringify(event));
      //alert('Your comment: ' + JSON.stringify(event));
      //event.preventDefault();
   }

   render() {
      return (
         <div>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
               <ModalHeader className="dark" toggle={this.toggleModal}>Write a comment:</ModalHeader>
               <ModalBody>
                  <LocalForm onSubmit={this.submitComment}>
                     <div className="form-group">
                        <Label htmlFor="rating" md={2}>Rating</Label>
                        <Control.select model=".rating" id="rating" name="rating" className="form-control">
                           <option>Select a rating</option>
                           <option>1</option>
                           <option>2</option>
                           <option>3</option>
                           <option>4</option>
                           <option>5</option>
                        </Control.select>
                     </div>
                     <div className="form-group">
                        <Label htmlFor="author" md={2}>Author</Label>
                        <Control.text model=".author" id="author" name="author" placeholder="Author" className="form-control"
                           validators={{
                              required,
                              minLength: minLength(2),
                              maxLength: maxLength(15)
                           }} />
                        <Errors
                           className="text-danger"
                           model=".author"
                           show="touched"
                           component="div"
                           messages={{
                              required: 'Required',
                              minLength: 'Author name must be at least 2 characters',
                              maxLength: 'Author name must be 15 characters or less'
                           }}
                        />
                     </div>
                     <div className="form-group">
                        <Label htmlFor="text" md={2}>Comment</Label>
                        <Control.textarea model=".text" id="text" name="text" rows="6" placeholder="Your comment here" className="form-control" />
                     </div>
                     <br />
                     <Button type="submit" value="submit" color="dark">Submit Comment</Button>
                  </LocalForm>
               </ModalBody>
            </Modal>
            <Button outline onClick={this.toggleModal}><i className="fa fa-pencil fa-lg"></i> Submit Comment</Button>
         </div >
      );
   }
}

function RenderCampsite({ campsite }) {
   return (
      <div className="col-md-5 m-1">
         <Card>
            <CardImg top src={campsite.image} alt={campsite.name} />
            <CardBody>
               <CardText>{campsite.description}</CardText>
            </CardBody>
         </Card>
      </div>
   );
}

function RenderComments({ comments, addComment, campsiteId }) {
   if (comments) {
      return (
         <div className="col-md-5 m-1">
            <h4>Comments</h4>
            {comments.map(comment => {
               return (
                  <div key={comment.id}>
                     <p>{comment.text}<br />
                        -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                     </p>
                  </div>
               );
            })}
            <CommentForm campsiteId={campsiteId} addComment={addComment} />
         </div>
      );
   }
   return <div />;
}

function CampsiteInfo(props) {
   if (props.isLoading) {
      return (
         <div className="container">
            <div className="row">
               <Loading />
            </div>
         </div>
      );
   }
   if (props.errMess) {
      return (
         <div className="container">
            <div className="row">
               <div className="col">
                  <h4>{props.errMess}</h4>
               </div>
            </div>
         </div>
      );
   }

   if (props.campsite) {
      return (
         <div className="container">
            <div className="row">
               <div className="col">
                  <Breadcrumb>
                     <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                     <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                  </Breadcrumb>
                  <h2>{props.campsite.name}</h2>
                  <hr />
               </div>
            </div>
            <div className="row">
               <RenderCampsite campsite={props.campsite} />
               <RenderComments
                  comments={props.comments}
                  addComment={props.addComment}
                  campsiteId={props.campsite.id} />
            </div>
         </div>
      );
   }
   return <div />;
};

export default CampsiteInfo;