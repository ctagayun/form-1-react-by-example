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

  - Once the form grows gets bigger, you will get to a point 
    where it has too many handlers for managing the state of 
    each form field. Then you can use the unified strategy:

  - For an uncontrolled form, there are no re-renders. 
    While controlled forms are more popular in React, because they 
    allow you a better developer experience for managing the 
    form's state (e.g. initial state, updating state), 
    they are more performance intensive. Each change of the 
    state comes with a re-render of the form. 
*/

import * as React from 'react';

//The unified strategy unifies all the form state into one 
//object and all event handlers into one handler. By 
//leveraging each form field's identifier, we can use it 
//in the unified handler to update the state by using the 
//identifier as dynamic key.

//This scales a controlled form in React well, because state, 
//handler, and form field are not in a 1:1:1 relationship 
//anymore. In contrast, each handler can reuse the state and 
//handler.
const LoginForm = () =>{
    //Unified state
    const [form, setForm] = React.useState({
        email: 'john@doe.com',
        password: 'geheim',
      });

    //Unified way of handling change
    const handleChange = (event) => {
        setForm({
          ...form,
          [event.target.id]: event.target.value,
        });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        //Reset a form after submit
        setForm({
            email: '',
            password: '',
          });
        alert(form.email + ' ' + form.password);
      };

  
    return(
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
           <input 
              id="email" 
              type="text" 
              value={form.formemail} 
              onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
           <input 
              id="password" 
              type="password" 
              value={form.password} 
              onChange={handleChange} />
        </div>
       <button type="submit">Login</button>
      </form>
    ); 
 
 };

 export {LoginForm}