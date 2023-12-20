import React from "react";
import ReactDOM from "react-dom";

interface AppProps {
  color?: string;
}

class App extends React.Component<AppProps> {
  render() {
    return <div>{this.props.color}</div>;
  }
}

// const App = ({ color }: AppProps) => {
//   return <h1>{color}</h1>;
// };

ReactDOM.render(<App color="red" />, document.querySelector("#root"));
