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

  - Whenever we want to access/read an HTML element in JSX, we 
    would be using React's useRef Hook:
*/

import * as React from 'react';

const LoginForm = () =>{

  //whenever we want to access a HTML element in JSX, 
  //we would be using React's useRef Hook:
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

    const handleSubmit = (event) => {
      event.preventDefault();
      //Reading value of the textbox. Be sure  to add
      //"ref" (e.g. emailRef) to the textbox. 
      //const email = emailRef.current.value
      //const password = passwordRef.current.value
       
      //The lazy aproach is to read the value directly in
      //the event handler
      const email = event.target.elements.email.value;
      const password = event.target.elements.password.value;

      alert(email + ' ' + password);
    }

    return(
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
           <input id="email" type="text" ref={emailRef}/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
           <input id="password" type="password" ref={passwordRef} />
        </div>
       <button type="submit">Login</button>
      </form>
    ); 
 
 };

 export {LoginForm}