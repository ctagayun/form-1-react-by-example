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

  - to submit the data add prop to LoginForm  

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

//The unified strategy unifies all the form state into one 
//object and all event handlers into one handler. By 
//leveraging each form field's identifier, we can use it 
//in the unified handler to update the state by using the 
//identifier as dynamic key.

//This scales a controlled form in React well, because state, 
//handler, and form field are not in a 1:1:1 relationship 
//anymore. In contrast, each handler can reuse the state and 
//handler.

const INITIAL_STATE = {  //use to reset form
    email: '',
    password: '',
  };
const LoginForm = ({onLogin}) =>{
    //Unified state 
    const [form, setForm] = React.useState(INITIAL_STATE);

    //Unified way of handling change
    const handleChange = (event) => {
        setForm({
          ...form,
          [event.target.id]: event.target.value,
        });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();

        onLogin(form);

        //Good way to React Form Reset
        //Call your component's callback handler, e.g. onLogin
        setForm(INITIAL_STATE)

        //Reset form one field at a time.
        //setForm({
        //    email: '',
        //    password: '',
        //  });
     
      };

  
    return(
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Value makesEmail is a controlled input </label>
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