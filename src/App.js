import React from 'react';
import { Footer, Package, TodoTask } from './components';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<React.Fragment>
				<section className="maincontent">
					<h1 className="big_title center">{Package.app_name}</h1>
					<TodoTask title="Todo REACT component"/>
				</section>
				<Footer/>
			</React.Fragment>
		);
	}
}

export default App;
