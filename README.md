# react-redux-typescript-webpack

Brads hello world _"counter"_ app to learn how to build a modern SPA.

The last time I worked with [React](https://reactjs.org) was back when most
websites were still running [jQuery](https://jquery.com). A lot has changed
since then of course.

## Getting Started

This project makes use of [`asdf-bootstrap`](https://github.com/brad-jones/asdf-bootstrap)
so simply execute the following:

```txt
git clone git@github.com:brad-jones/react-redux-typescript-webpack.git &&
    cd ./react-redux-typescript-webpack &&
    ./npm install &&
    ./npm start:dev
```

## The Stack

While tooling like [`create-react-app`](https://create-react-app.dev) might be
more robust and better suited for day to day activities. I needed to do things
the hard way at least once so that I had a solid foundational understanding
of everything.

- Obviously we start with <https://nodejs.org/en>

  - _I wonder if <https://deno.land> will ever be useful for SPA dev?_

- I decided to use vanilla [`npm`](https://github.com/npm/cli), it's good enough,
  perhaps even better than `yarn` and others in 2022.

- I wanted to use solely <https://www.typescriptlang.org>, I'm unsure why
  <https://babeljs.io> is still used by many other similar stacks, it seems
  like a duplication of efforts. Perhaps the further I dive into this rabbit
  hole I will find why `babel` is still useful...

- <https://reactjs.org> for the view layer because, well what else would you use?

  - Actually I really like the idea behind <https://svelte.dev>,
    I always thought the Virtual DOM was a little over engineered.

- <https://redux.js.org> for global state management, more specifically the
  <https://redux-toolkit.js.org> & the <https://react-redux.js.org> bindings.

- <https://webpack.js.org> because that seems to be king of the bundlers.

  - In the past I have used <https://rollupjs.org> with frustration due to ES6
    not being wide spread, I wonder if it's easier to use today?

  - Actually <https://esbuild.github.io> looks amazing.

## Concepts

Just some notes, written in my own words to help me understand the different
parts of an SPA, built on the above stack.

### React

Virtual DOM this, Synthetic Events that... yeah React is a fancy template engine.
It was never the head scratching part. I have nothing special to add here.
Not yet anyway...

### Functional vs Classical Components

TypeScript Classes were what I remember, with a bunch of methods.
Now it's just a single function.

### Hooks vs Connect

Yeah stuff has changed. TODO come back and revisit...

### Redux

The state store is essentially defined by a single root _"reducer"_ function,
much the same as there is a single root React component that is rendered.

It's this functions job to return a brand new version of the state on every dispatched action.

<https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#creating-the-root-reducer>

```ts
import { createStore } from 'redux'
import todosReducer from './features/todos/todosSlice'
import filtersReducer from './features/filters/filtersSlice'

export default function rootReducer(state = {}, action) {
  // always return a new object for the root state
  return {
    // the value of `state.todos` is whatever the todos reducer returns
    todos: todosReducer(state.todos, action),
    // For both reducers, we only pass in their slice of the state
    filters: filtersReducer(state.filters, action)
  }
}

const store = createStore(rootReducer)

// dispatch an action
// call this from event handlers, eg: onClick
// normally you rely on a bindings from packages like `react-redux`
// see: https://react-redux.js.org/api/hooks#usedispatch
store.dispatch(fooAction)

// listen for dispatched actions
// normally you rely on a bindings from packages like `react-redux`
// https://react-redux.js.org/api/hooks#useselector is subscribing for you
store.subscribe(() => { store.getState() })
```

Use [`combineReducers`](https://redux.js.org/api/combinereducers) to create a
root reducer from many smaller slices of the state.

```ts
rootReducer = combineReducers({potato: potatoReducer, tomato: tomatoReducer})
```

> more on actual _"Slices"_ below

#### Actions

Plain objects that describe an action to take place. They do not actually
perform the action themselves. Event handlers in React components (eg: `onClick`)
usually _"dispatch"_, actions to the store.

> `dispatch` is a method on the store. So long as you have a reference to the
> store you can dispatch actions.

#### Reducers

Reducers are pure _"synchronous"_ functions that essentially listen for
_"actions"_ & then return a brand new instance of the `state` in an
immutable fashion.

> Reducers can not have side effects, such as making an API call.

#### Selectors

Selectors are simply functions of the form `state => state.foo` that return
_or "select"_ data from the state. Think SQL Select / Projection.
Again these are pure functions and shouldn't have side effects.

> Use `createSelector` from <https://github.com/reduxjs/reselect> to create
> cached selectors. A function that will only re-compute it's return value if
> the inputs have changed since it was last called.

#### Slices

Slices are basically a way to define _"slices"_ of state using mutable syntax.
But in actual fact <https://immerjs.github.io/immer/> makes it Immutable.

They bundle up, actions & reducers. Normally reuseable selector functions would
also be defined alongside a slice. Although technically not part of a slice.

Slices are cognitively much easier to understand at first but may become
burdensome in larger apps.

see: <https://redux-toolkit.js.org/api/createSlice>

#### Async

By itself, a Redux store doesn't know anything about async logic. It only knows
how to synchronously dispatch actions, update the state by calling the root
reducer function, and notify the UI that something has changed.
Any asynchronicity has to happen outside the store.

That's where Redux middleware come in. Below are 2 types, Thunks & Sagas.

As a general rule of thumb:

- Thunks are best for complex synchronous logic (especially code that needs access
  to the entire Redux store state), and simple async logic (like basic AJAX calls).
  With the use of async/await, it can be reasonable to use thunks for some more
  complex promise-based logic as well.

- Sagas are best for complex async logic and decoupled "background thread"-type
  behavior, especially if you need to listen to dispatched actions (which is
  something that can't be done with thunks). They require familiarity with ES6
  generator functions and redux-saga's "effects" operators.

Other Async Middleware: <https://github.com/markerikson/redux-ecosystem-links/blob/master/side-effects.md>

see: <https://redux.js.org/faq/actions#what-async-middleware-should-i-use-how-do-you-decide-between-thunks-sagas-observables-or-something-else>

##### Thunks

A thunk is basically the way to write an async action that has side effects
like making an API call.

You have to use `redux-thunk` which is a middleware layer supplied to the store
that intercepts any dispatched actions that are functions _(as opposed to plain
objects)_ and executes those functions.

> The word "thunk" is a programming term that means
> ["a piece of code that does some delayed work".](https://en.wikipedia.org/wiki/Thunk)

see: <https://redux.js.org/usage/writing-logic-thunks>

```ts
// some event dispatches the thunk
onClick={() => dispatch(fetchTodoById(123))}

export const fetchTodoById = todoId => async dispatch => {
  const response = await client.get(`/fakeApi/todo/${todoId}`)

  // thunk dispatches another action with the response
  dispatch(todosLoaded(response.todos))
}

// some reducer, emits a new state with the new todos
export const todoReducer = createReducer(initialState, (builder) => builder
    .addCase(todosLoaded, (state, action) => ({ todos: actions.payload }))
)

// then select the todos from the state
const todos = useSelector(state => state.todos)
```

##### Sagas

Sagas are based on generator functions and yield instructions _(or "effects")_.

<https://redux-saga.js.org/docs/api/#effect-creators>

You kinda build a single root saga function similar to a your single root reducer function.

Saga don't necessarily have to modify the state, they might simply listen to
some action and apply some other side effect. I guess the same is true of thunks
but they need to be explicitly dispatched. Sagas do not.

Tend to have "watchers" that call "workers".

Ok so Sagas are way more complex than thunks. They look really powerful but
I'm not going to consume everything in one sitting:
<https://redux-saga.js.org/docs/advanced/Channels>

see: <https://redux-saga.js.org>

#### RTK ????

<https://redux-toolkit.js.org/rtk-query/overview>
