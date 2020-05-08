import React, { Fragment, useState } from "react";

const Text = ({ data, index, callback, form, updateState, move }) => {
  const [displayTextProps, toggleTextProps] = useState(false);

  console.log("TextData: ", data);
  console.log("Text Form: ", form);

  const update = (e) => {
    data[e.target.name] = e.target.value;
    callback(data, index, form);
  };

  const remove = () => {
    if (form) {
      if (form.logo.text.length > 1) {
        form.logo.text.splice(index, 1);
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
          <label htmlFor='text'>Text:</label>
          <input
            type='text'
            className='form-control'
            name='text'
            placeholder='Text'
            defaultValue={data.text}
            value={data.text}
            onChange={(e) => update(e)}
          />
          <span>
            <button
              onClick={() => {
                move(index, index - 1, form);
              }}
              type='button'
            >
              Move Text ↑
            </button>
            <button
              onClick={() => {
                move(index, index + 1, form);
              }}
              type='button'
            >
              Move Text ↓
            </button>
          </span>
        </div>
        <button
          onClick={() => toggleTextProps(!displayTextProps)}
          type='button'
        >
          Display Text Props
        </button>
        <button onClick={() => remove()} type='button'>
          Delete Text
        </button>

        {displayTextProps && (
          <Fragment>
            <div className='form-group'>
              <label htmlFor='color'>Color:</label>
              <input
                type='color'
                className='form-control'
                name='color'
                placeholder='color'
                defaultValue={data.color}
                onChange={(e) => update(e)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='fontSize'>Font Size:</label>
              <input
                type='number'
                className='form-control'
                name='size'
                placeholder='Font Size'
                defaultValue={data.size}
                onChange={(e) => update(e)}
                min='2'
                max='144'
                required
              />
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Text;
