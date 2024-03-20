/*================================================================
   Forms in React:

   Task:
    - First, wrap the input field and button into an HTML 
   form element: (YY1)

    - Next, since the handler is used for the form event, 
    it executes preventDefault() additionally on React's synthetic 
    event. This prevents the HTML form's native behavior which would 
    lead to a browser reload:    
       const handleSearchSubmit = (event) => {
          setUrl(`${API_ENDPOINT}${searchTerm}`);
          event.preventDefault(); <--- Add this
        };
 ================================================

   Previous Async Await in React
     In our React application, we have started to resolve promises 
   with then/catch blocks. However, in modern JavaScript (and therefore React), 
   a more popular solution is using async/await.
  
       
  Review what is useState?
      - https://www.robinwieruch.de/react-usestate-hook/

      - When a state gets mutated, the component with the state 
      and all child components will re-render.

      - Use the browser's native fetch API to perform the request.

      - Note: A successful or erroneous request uses the same 
      implementation logic that we already have in place.
      
  Review what is useEffect?
    - https://www.robinwieruch.de/react-useeffect-hook/
    
    - What does useEffect do? by using this hook you tell React that 
     your component needs to do something after render.

  Review what is a React.Reducer
    - https://www.robinwieruch.de/javascript-reducer/

=============================================*/
import * as React from 'react';
import axios from 'axios'
import { LoginForm } from './forms/loginForm';
import { SearchForm } from './forms/searchForm';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':  
      return {
        ...state,              
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS': 
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':  
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORY':      
      return {
        ...state,
        data: state.data.filter(  //now operate on state.data not just "state"
          (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};

const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState(
    'search',
    'React'
  );

   //data: [], isLoading, isError flags hooks merged into one 
   //useReducer hook for a unified state.
  const [stories, dispatchStories] = React.useReducer( //A
    storiesReducer,
    { data: [], isLoading: false, isError: false } //We want an empty list data [] 
                                                   //for the initial state, set isloading=false
                                                   //is error=false
  );

  //(DD) new handler of the button sets the new stateful value 
  //called 'url' which is derived from the current searchTerm and 
  //the static API endpoint as a new state:
  const [url, setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
  );

  //const handleFetchStories = React.useCallback(() => { // B
  const handleFetchStories = React.useCallback(async() => { // (X1)  
 
    dispatchStories({ type: 'STORIES_FETCH_INIT' });
   
    try {
      const result = await axios.get(url);
 
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }
  }, [url]);
       const myDependencyArray = JSON.stringify(url);
       console.log("dependency array SearchTerm value = " + myDependencyArray);

  //useEffect executes every time [searchTerm] dependency array (E) changes.
  //As a result it runs again the memoized function (C) because it depends
  //on the new function "handleFetchStories" (D)
  React.useEffect(() => { 
    handleFetchStories(); // C
  }, [handleFetchStories]); // D   (EOF)

  
  const handleRemoveStory = (item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };  //EOF handleRemoveStory

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handleSearchSubmit = (event) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  
    //Next, since the handler is used for the form event, it 
    //executes preventDefault() additionally on React's
    //synthetic event. This prevents the HTML form's native 
    //behavior which would lead to a browser reload:
    event.preventDefault();
  };

  const [showForm, setShowForm] = React.useState(false);

  const showLoginForm = () => {
    setShowForm(!showForm);
  }

   return (
    <div>
      <h1>My Hacker Stories</h1>
       
       <div>
       <form>
        <button onClick={showLoginForm}> Login </button>
      </form>

      {showForm && (
         <LoginForm>
           
         </LoginForm>
      )}
       </div>
       
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />
      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List
          list={stories.data}
          onRemoveItem={handleRemoveStory}
        />
      )}
    </div>
  );
};

const List = ({ list, onRemoveItem }) => (
  <ul>
    {list.map((item) => (
      <Item
        key={item.objectID}
        item={item}
        onRemoveItem={onRemoveItem}
      />
    ))}
  </ul>
);

const Item = ({ item, onRemoveItem }) => (
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
      <button type="button" onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </span>
  </li>
);

export default App;

//========================================================== 
 //Note on Map:
 //Within the map() method, we have access to each object and its properties.
 
 //useState
 //By using useState, we are telling React that we want to have a 
 //stateful value which changes over time. And whenever this stateful value 
 //changes, the affected components (here: Search component) 
 //will re-render to use it (here: to display the recent value).

 /* 
     The filter() method takes a function 
        as an argument, which accesses each item in the array and returns /
        true or false. If the function returns true, meaning the condition is 
        met, the item stays in the newly created array; if the function 
        returns false, it's removed from the filtered array.

  
 */
 
 /*Note on Map:
   Within the map() method, we have access to each object and its properties.

 // concatenating variables into a string
    var fullName = `${firstName} ${lastName}`
    console.log(fullName);


 //useState
    By using useState, we are telling React that we want to have a 
 stateful value which changes over time. And whenever this stateful value 
 changes, the affected components (here: Search component) 
 will re-render to use it (here: to display the recent value).

  //Work flow of a useState:
       When the user types into the input field, the input field's change event 
      runs into the event handler. The handler's logic uses the event's value 
      of the target and the state updater function to set the updated state. 
      Afterward, the component re-renders (read: the component function runs). 
      The updated state becomes the current state (here: searchTerm) and is 
      displayed in the component's JSX.

  //Arrow Function
    function getTitle(title) { - convert to arrow function see below
    
    const getTitle =(title) => 
       (
        title
       );

    Eliminate bracket and "return" statement if no business logic before 
    the function - concise
   

  //Arrow function - 
   If there is a business business logic. Otherwise retain the {} and
   put a "return" statement 
     const App = () => {
       ...
       return xyz;
     } 
 
  //How to use a React.Reducer hook 
  To use Reducer (1) first define a reducer function.
     1. A reducer action is always associated with a type. As best 
        practice with a payload.
        Example:
          const storiesReducer = (state, action) =>{
          if (action.type === 'SET_STORIES'){
            //If the type matches a condition in the reducer. Return a new
            //state based on the incoming state and action
            return action.payload;
          }
          else{
          //throw an error if isn't covered by the reducer to remind yourself
          //that the implementation is not covered
            throw new Error();
          }
        }
      2. The second thing to do is to replaceReact.useState to use a reducer hook
         like this: 

          const [stories, dispatchStories] = React.useReducer(storiesReducer,[]);

          1. receives a reducer function called "storiesReducer"
          2. receives an initial state of empty array []
          3. returns an array with 2 item: 
            - The first item is "stories" which is the current state
            - The second item is the updater function named "dispatchStories"
            Unlike useState, the updater function of Reducer sets the state
            "implicitly" by dispatching an "action". Example:
               dispatchStories({
                 type: 'SET_STORIES',   <== this is the action
               payload: result.data.stories,
             });
       
 */