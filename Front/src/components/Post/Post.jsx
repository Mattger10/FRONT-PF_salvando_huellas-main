import React, { useEffect } from "react";
import { getPosts } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import styles from "../Post/Post.module.css";
import { useNavigate } from "react-router-dom";

export default function Post() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className={styles.containt}>
      
      {posts.map((post) => (
        <div className={styles.posts}> 
        <div key={post.id}>
          <h1>{post.titleP}</h1>
          <div>
            <h4>Posteo:</h4>
            <p>{post.id_Post}</p>
          </div>
          <p>{post.commentP}</p>
          <img src={post.photoP} className={styles.imgPost}/>
          <div>
            <h4>Category:</h4>
            <p>{post.category}</p>
          </div>
          <div>
            <p>{post.userIdUser}</p>
          </div>
        </div>
        </div>
      ))}
      <button onClick={() => {
             navigate("/posts/createpost") }} className={styles.button}>Crear Posteo</button>
    </div>
  );
}
