import React from 'react';

class Button extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { type, children, onClick } = this.props;
		return (
			<button disabled={(type === 'disabled') ? "disabled" : ""}
				className={"btn " + (type ? "btn_" + type : "")}
				onClick={onClick}>
					{children}
			</button>
		);
	}
}

export default Button;
