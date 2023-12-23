# Interface with Props

One of the things we do with TS in React all the time is
_Creating a interface defining what kind of props will this component get_

```
interface AppProps {
  color?: string;
}


class App extends React.Component<AppProps> {
  render() {
    return <div>{this.props.color}</div>;
  }
}
```

We can use 'class' instead of interface as well
but interface can define a optional property/method but not with classes

```
 Typically, interfaces are preferred for defining the shape of props, as they are more lightweight and focused on describing the structure of the data.
```

# Typescript Props

Ther are 2 ways doing this

1. Initiate the state value again in the class

```
class App extends React.Component<AppProps> {
  state = { counter: 0 };
}
```

this will overwrite the state state property defined in the type declaration file of React Component that we will se in 2.

2. Use Class constructor

```
interface AppProps {
  color?: string;
}
interface AppState {
  counter: number;
}
class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { counter: 0 };
  }
}
```

If we ctrl + click on React.Component and open the type declaration file
we will se the below

```
 class Component<P, S> {
    .
    .
    .
 state: Readonly<S>;
 .
 .}
```

Component is a generic class that takes in 2 arguments
P for the Props
S for the States
So now we need to tell the component what kind of states do we have

Now why does the first way work , which looks much cleaner

Let's take a look at the code again

```

class App extends React.Component<AppProps> {
  state = { counter: 0 };
}

```

In this case we only pass in 1 argument so the state of the class would be
state : Readonly<{}>
and empty object which should not work right ?

but at the very first line of the component we initiate, overwrite the state with

```
  state = { counter: 0 };
```

That just makes the state work and TS now knows that the state needs to be in this form

# Redux recap

Redux is a way of centralizing state management
Everything is kept in "store" the only way to get anything or do anything with the data in side is to call a store's method, "dispatch"

Then we pass in an Action Object stating the actions and how to proceed

```
    dispatch(
    // Action object
    {
      type: "FETCH_TODOS",
      payload: response.data,
    });
```

Then the store looks in to itself for the action then it will calls its "reducer"

The reducer will do something with the state and updates it

# Axios with TS

```
const response = await axios.get<Todo[]>(url);
```

If we hover on get we will see

```
(method) Axios.get<any, AxiosResponse<any, any>, any>(url: string, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any>>
```

This mean Axios.get is an generic function that wants an generic type parameter
so we can help TS to do better by putting in what will be return from the axios
<Todo[]>

# Redux with ENUM

Redux doesn't really care about the action type being a string or a number
It just needs to be an unique value

Normally with a static , enum we will do this

```
export enum ActionTypes {
  fetchTodos = "FETCH-TODO",
}

```

However, by default in enum the value will be assigned with a number starting from 0 so it will be something like

```
export enum ActionTypes {
  fetchTodos,
  fetchHobby
  // fetchTodos = 0
  // fetchHobby = 1
}

```

So to make it shorter we can just declare the name and that's it
BUTT actions in redux seems to be needing a type of a string
so this is not valid
Ths instructor code work because of the old version ?

For action object we can use an interface to type safe it
This is handy because the reducer will also use the same thing

```
interface FetchTodosAction {
  type: ActionTypes.fetchTodos;
  payload: Todo[];
}
```

# Constructing the reducer

```
import { Todo, FetchTodosAction } from "../actions";
import { ActionTypes } from "../actions/types";

export const todosReducer = (state: Todo[] = [], action: FetchTodosAction) => {
  switch (action.type) {
    case ActionTypes.fetchTodos:
      return action.payload;
    default:
      return state;
  }
};
```

This is the reducer a reducer takes in the state (which the default is an empty array []) and the action object
Like mentioned above, the action object which have the action type and the payload
We reused the interface from the above step when we were doing FetchTodoActions

reducers/index.ts

```
export interface StoreState {
  todos: Todo[];
}

export const reducers = combineReducers<StoreState>({
  todos: todosReducer,
});
```

Normally an intergace check the type of the value
but in this case we assign a function to todos so TS is checking whether 'todosReducer' is returning the value that matches Todo[]

# Handy Central Exporting index file

folder structure

src
actions
index.ts
todos.ts
type.ts

We can centralized everything inside index.ts

```
export * from "./todos";
export * from "./types";
```

# This is for functional component refactor
