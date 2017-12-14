import React from 'react';
import { Button } from './';

class TDItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { id, text, check, removeItem, toggleCheck } = this.props;
		let className = " ";
		let iconClass = " icon-arrow-right";
		if(check) {
			className = " checked";
			iconClass = " icon-check";
		}
		return (
			<li className={"todolist_item" + className}>
				<span className={"icon todolist_item_icon" + iconClass} onClick={() => toggleCheck(id)}/>
				<span className="todolist_item_text" onClick={() => toggleCheck(id)}>{text}</span>
				<span className="icon icon-times todolist_item_remove" onClick={() => removeItem(id)}/>
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
						id={item.id}
						text={item.text}
						check={item.check}
						removeItem={this.props.removeItem}
						toggleCheck={this.props.toggleCheck}/>
				))}
			</ul>
		);
	}
}

class TodoList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: (props.items) ? props.items : [],
			text: ''
		};
	}

	handleChange = (e) => {
		this.setState({
			text: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		if (!this.state.text.length) {
			this.cleanTasks();
			return;
		}
		this.addTask();
	};

	addTask = () => {
		const newItem = {
			text: this.state.text,
			id: Date.now(),
			check: false
		};
		this.setState(prevState => ({
			items: prevState.items.concat(newItem),
			text: ''
		}));
	};

	cleanTasks = () => {
		let newItems = this.state.items.filter((item) => {
			return item.check === false;
		});
		this.setState({
			items: newItems
		});
	};

	removeItem = (id) => {
		let newItems = this.state.items.filter((item) => {
			return item.id !== id;
		});
		this.setState({
			items: newItems
		});
	};

	toggleCheck = (id) => {
		let items = this.state.items.filter((item) => {
			if(item.id === id) {
				item.check = (item.check === false);
			}
			return true;
		});
		this.setState(prevState => ({
			items: items
		}));
	};

	render() {
		const { text, items } = this.state;
		return (
			<section className="todolist">
				<TDList items={items} removeItem={this.removeItem} toggleCheck={this.toggleCheck}/>
				<form onSubmit={this.handleSubmit} className="todolist_controls">
					<input type="text"
						onChange={this.handleChange}
						value={text}/>
					<Button
						type={text !== '' ? 'active' : 'success'}>
						{text !== '' ? 'Agregar' : 'Limpiar'}
					</Button>
				</form>
			</section>
		);
	}
}

export default TodoList;
