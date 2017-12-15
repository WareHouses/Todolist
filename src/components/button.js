import React from 'react';

class Button extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { type, children, onClick, className } = this.props;
		return (
			<button disabled={(type === 'disabled') ? "disabled" : ""}
				className={"btn " + (type ? "btn_" + type : "") + (className ? " " + className : "")}
				onClick={onClick}>
					{children}
			</button>
		);
	}
}

export default Button;
