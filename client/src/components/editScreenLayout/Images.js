import React, { Fragment, useState } from "react";

const Images = ({ data, index, callback, form, updateState, move }) => {
  const [displayTextProps, toggleTextProps] = useState(false);

  const update = (e) => {
    data[e.target.name] = e.target.value;
    callback(data, index, form);
  };

  const remove = () => {
    if (form) {
      if (form.logo.img.length > 0) {
        form.logo.img.splice(index, 1);
        updateState();
      }
    } else {
      updateState();
    }
  };

  return (
    <div
      style={{
        border: "1px solid #000000",
        background: "#72bb53",
      }}
    >
      <div style={{ margin: "3px" }}>
        <div className='form-group'>
          <label htmlFor='image'>Image:</label>
          <input
            type='text'
            className='form-control'
            name='url'
            placeholder='Image'
            defaultValue={data.url}
            value={data.url}
            onChange={(e) => update(e)}
          />
          <span>
            <button
              onClick={() => {
                move(index, index - 1, form);
              }}
              type='button'
            >
              Move Image ↑
            </button>
            <button
              onClick={() => {
                move(index, index + 1, form);
              }}
              type='button'
            >
              Move Image ↓
            </button>
          </span>
        </div>
        <button onClick={() => remove()} type='button'>
          Delete Image
        </button>
      </div>
    </div>
  );
};

export default Images;
