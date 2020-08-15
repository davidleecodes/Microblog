import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import {
  Button,
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { addComment, removeComment } from "./actions";

function Comments({ postId, comments }) {
  const dispatch = useDispatch();
  const INITIAL_FORM_STATE = "";
  const [commentForm, setCommentForm] = useState([INITIAL_FORM_STATE]);

  const handleChange = (e) => {
    const { value } = e.target;
    setCommentForm(value);
  };

  const handleAddComment = () => {
    dispatch(addComment(postId, uuidv4(), commentForm));
    setCommentForm("");
  };

  const handleRemoveComment = (id) => {
    dispatch(removeComment(postId, id));
  };

  console.log(comments);
  const commentList = () => {
    return (
      <ListGroup>
        {Object.entries(comments).map(([key, value]) => (
          <ListGroupItem key={key}>
            <p>{value.text}</p>
            <Button onClick={() => handleRemoveComment(key)}>X</Button>
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  };
  return (
    <div>
      <h4>Comments</h4>
      {comments && commentList()}
      <Form inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            type="text"
            name="comment"
            id="comment"
            placeholder="new comment"
            onChange={handleChange}
            value={commentForm}
          />
          <Button onClick={handleAddComment}>add</Button>
        </FormGroup>
      </Form>
    </div>
  );
}

export default Comments;
