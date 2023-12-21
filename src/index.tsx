import React from "react";
import ReactDOM from "react-dom";

interface AppProps {
  color?: string;
}

//Nowadays people don't quite use Class Component
class App extends React.Component<AppProps> {
  render() {
    return <div>{this.props.color}</div>;
  }
}

//This is the function component way
// const App = ({ color }: AppProps) => {
//   return <h1>{color}</h1>;
// };

ReactDOM.render(<App color="red" />, document.querySelector("#root"));
