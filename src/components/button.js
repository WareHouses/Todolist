import React from 'react';

class Button extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			classname: "btn"
		};
		if(this.props.className) {
			this.state = {
				classname: "btn " + this.props.className
			};
		}
	}

	render() {
		let className = this.state.classname;
		if(this.props.type) {
			className += " btn_" + this.props.type;
		}
		return (
			<button
				className={className}>
					{this.props.children}
			</button>
		);
	}
}

export default Button;
