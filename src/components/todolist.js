import React from 'react';
import { Button } from './';

class TDItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: this.props.text,
			check: false
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		e.preventDefault();
		this.setState(prevState => ({
			check: !prevState.check
		}));
	}

	render() {
		let className = "todolist_item";
		let iconClass = "icon icon-arrow-right";
		if(this.state.check) {
			className += " checked";
			iconClass = "icon icon-check";
		}
		return (
			<li className={className}
				onClick={this.handleClick}>
				<span className={iconClass}/>
				{this.state.text}
			</li>
		);
	}
}

class TDList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<ul className="todolist_list">
				{this.props.items.map(item => (
					<TDItem
						key={item.id}
						text={item.text}/>
				))}
			</ul>
		);
	}
}

class TodoList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			text: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.addTask = this.addTask.bind(this);
		this.cleanTasks = this.cleanTasks.bind(this);
	}

	handleChange(e) {
		this.setState({
			text: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		if (!this.state.text.length) {
			this.cleanTasks();
			return;
		}
		this.addTask();
	}

	addTask() {
		const newItem = {
			text: this.state.text,
			id: Date.now()
		};
		this.setState(prevState => ({
			items: prevState.items.concat(newItem),
			text: ''
		}));
	}

	cleanTasks() {
		let newProps = [];
		this.setState({
			items: newProps
		});
	}

	render() {
		let buttonText = "Limpiar";
		let buttonType = "success";
		if(this.state.text !== '') {
			buttonText = "Agregar";
			buttonType = "active";
		}

		return (
			<section className="todolist">
				<TDList items={this.state.items}/>
				<form onSubmit={this.handleSubmit} className="todolist_controls">
					<input type="text"
						onChange={this.handleChange}
						value={this.state.text}/>
					<Button type={buttonType}>{buttonText}</Button>
				</form>
			</section>
		);
	}
}

export default TodoList;
