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
           <input id="password" type="password" value={password} onChange={handlePassword} />
        </div>
       <button type="submit">Login</button>
      </form>
    ); 
 
 };

 export {LoginForm}