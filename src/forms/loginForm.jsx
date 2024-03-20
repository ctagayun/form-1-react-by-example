/* 
Login form functional component
  - use a htmlFor attribute (React specific) which links to 
    the HTML input element's id attribute.

  - it could receive props for its initial state which populate 
    the form or a callback handler which gets executed when 
    clicking the form's submit button.

  - For preventing the native browser behavior (which would 
    perform a refresh on the browser), we can use the 
    preventDefault() method on the form's event.
*/

import * as React from 'react';

const LoginForm = () =>{
    const handleSubmit = (event) => {
      event.preventDefault();
    }

    return(
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
           <input id="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
           <input id="password" type="password" />
        </div>
       <button type="sumit">Login</button>
      </form>
    ); 
 
 };

 export {LoginForm}