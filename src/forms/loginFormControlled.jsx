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

  - Controlled React form -  each input field has a handler and 
    gets controlled by React and does not manage its internal 
    native HTML state anymore. 

    By giving the input the value from React's state, it doesn't use 
    its internal state anymore, but the state you provided from React.
     Now the initial state should be seen for the input field and for 
     the output paragraph once you start the application. Also when 
     you type something in the input field, both input field and 
     output paragraph are synchronized by React's state.
*/

import * as React from 'react';

const LoginForm = () =>{

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleEmail = (event) => {
        setEmail(event.target.value);
      };
      
    const handlePassword = (event) => {
        setPassword(event.target.value);
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
    
        alert(email + ' ' + password);
      };

    return(
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
           <input id="email" type="text" value={email} onChange={handleEmail}/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
           <input id="password" type="password" value={password}  />
        </div>
       <button type="submit">Login</button>
      </form>
    ); 
 
 };

 export {LoginForm}