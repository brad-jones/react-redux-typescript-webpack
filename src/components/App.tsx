import React from "react";
import { Counter } from "~components/functional/Counter";

const App = () => (<>
    <h1>Hello World</h1>

    <hr />

    <h2>Environmental variables:</h2>
    <p>
        process.env.FOO: <b>{process.env.FOO}</b>
    </p>

    <hr />

    <Counter />
</>);

export default App;