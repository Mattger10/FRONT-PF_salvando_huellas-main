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
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <div className={styles.containerImg}>
            {post.photoP ? (
              <img src={post.photoP} className={styles.imgPost} />
            ) : null}
          </div>
          <h1 className={styles.title}>{post.titleP}</h1>
          <p className={styles.comment}>{post.commentP}</p>
          <div className={styles.postDetails}>
            <h4>Posteo N°</h4>
            <p>{post.id_Post}</p>
          </div>
          <div className={styles.postDetails}>
            <h4>Categoría:</h4>
            <p>{post.category}</p>
            <p>{post.userIdUser}</p>
          </div>
        </div>
      ))}
      <button
        onClick={() => {
          navigate("/posts/createpost");
        }}
        className={styles.button}
      >
        Crear Posteo
      </button>
    </div>
  );
}
