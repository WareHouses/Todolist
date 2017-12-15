import React from 'react';
import { Button } from './';

class TDItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { id, text, check, removeItem, toggleCheck } = this.props;
		const itemIcon = "todo_component__itemicon icon" + (check ? " icon-check" : " icon-arrow-right");
		return (
			<li className={"todo_component__item " + (check ? " checked" : "")}>
				<span className={itemIcon} onClick={() => toggleCheck(id)}/>
				<span className="todo_component__itemtext" onClick={() => toggleCheck(id)}>{text}</span>
				<span className="todo_component__itemremove icon icon-times" onClick={() => removeItem(id)}/>
			</li>
		);
	}
}

class TDItemList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<ul className="todo_component__itemlist">
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
			items: [],
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
		const items = this.getItems().concat(newItem);
		if(this.props.items) {
			this.props.setItems(items);
			this.setState(prevState => ({
				text: ''
			}));
		} else {
			this.setState(prevState => ({
				items: items,
				text: ''
			}));
		}
	};

	cleanTasks = () => {
		let newItems = this.getItems().filter((item) => {
			return item.check === false;
		});
		if(this.props.items) {
			this.props.setItems(newItems);
		} else {
			this.setState({
				items: newItems
			});
		}
	};

	removeItem = (id) => {
		let newItems = this.getItems().filter((item) => {
			return item.id !== id;
		});
		if(this.props.items) {
			this.props.setItems(newItems);
		} else {
			this.setState({
				items: newItems
			});
		}
	};

	toggleCheck = (id) => {
		let items = this.getItems().filter((item) => {
			if(item.id === id) {
				item.check = (item.check === false);
			}
			return true;
		});
		if(this.props.items) {
			this.props.setItems(items);
		} else {
			this.setState(prevState => ({
				items: items
			}));
		}
	};

	getItems = () => {
		if(this.props.items) {
			return this.props.items;
		}
		return this.state.items;
	};

	render() {
		const { text, items: stateItems } = this.state;
		const { items: propsItems, disabled } = this.props;
		const type = disabled ? 'disabled' : (text !== '' ? 'active' : 'success');
		const buttonClass = disabled ? 'icon-ban' : (text !== '' ? 'icon-plus' : 'icon-trash-o');
		return (
			<section className="todo_component__items">
				<form onSubmit={this.handleSubmit} className="todo_component__form">
					<input className="todo_component_input" onChange={this.handleChange} value={text} disabled={disabled} placeholder="Agrega un item al grupo"/>
					<Button type={type} className={"todo_component__button icon " + buttonClass}/>
				</form>
				<TDItemList items={(propsItems ? propsItems : stateItems)} removeItem={this.removeItem} toggleCheck={this.toggleCheck}/>
			</section>
		);
	}
}

export default TodoList;
