import React, { useEffect } from "react";
import { getPosts, getUsers } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import styles from "../Post/Post.module.css";
import { useNavigate } from "react-router-dom";

export default function Post() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getUsers());
  }, [dispatch]);

  const getUserName = (post)=>{
    const filt = (users.filter(user => user.id_User === post.userId))
    return (filt[0] ? filt[0].nameU : "Anónimo")
  }
  return (
    <div className={styles.container}>
      {posts.map((post, index) => (
        <div className={styles.post} key={index}>
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
          </div>
            <p className={styles.userName}>{users.length ? getUserName(post) : ""}</p>
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
