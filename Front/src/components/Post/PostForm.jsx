import React, { useState } from 'react';

function PostForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
 
    setTitle('');
    setBody('');
  };

  return (
    <div>
        
    <form onSubmit={handleSubmit}>
      <label>
        Título:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Cuerpo del posteo:
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </label>
      <button type="submit">Publicar</button>
    </form>
    </div>
  );
}

export default PostForm;
