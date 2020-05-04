import React, { Fragment, useState } from "react";

const Text = ({ data }) => {
  const [displayTextProps, toggleTextProps] = useState(false);

  return (
    <Fragment>
      <div className='form-group'>
        <label htmlFor='text'>Text:</label>
        <input
          type='text'
          className='form-control'
          name='text'
          placeholder='Text'
          defaultValue={data.text}
        />
      </div>
      <button onClick={() => toggleTextProps(!displayTextProps)} type='button'>
        Display Text Props
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
            />
          </div>
          <div className='form-group'>
            <label htmlFor='fontSize'>Font Size:</label>
            <input
              type='number'
              className='form-control'
              name='fontSize'
              placeholder='Font Size'
              defaultValue={data.size}
              min='2'
              max='144'
              required
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Text;
