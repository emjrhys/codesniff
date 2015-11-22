var React = require('react');
var ReactDOM = require('react-dom');

var CodeSniff = React.createClass({

    render: function() {
        return <div>
                   <h1>CodeSniff</h1>
               </div>;
    }
});

ReactDOM.render(
        <CodeSniff />,
        document.getElementById('container')
);
