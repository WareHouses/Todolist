import React from 'react';
import { Button } from './';

class TDItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { id, text, check, removeItem, toggleCheck } = this.props;
		return (
			<li className={"todolist_item" + (check ? " checked" : "")}>
				<span className={"icon todolist_item_icon" + (check ? " icon-check" : " icon-arrow-right")} onClick={() => toggleCheck(id)}/>
				<span className="todolist_item_text" onClick={() => toggleCheck(id)}>{text}</span>
				<span className="icon icon-times todolist_item_remove" onClick={() => removeItem(id)}/>
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
		const { items: propsItems, taskName, disabled } = this.props;
		const title = <h1 className="center">{taskName}</h1>
		return (
			<section className="todolist">
				{taskName ? title : ""}
				<TDItemList items={(propsItems ? propsItems : stateItems)} removeItem={this.removeItem} toggleCheck={this.toggleCheck}/>
				<form onSubmit={this.handleSubmit} className="todolist_controls">
					<input type="text"
						onChange={this.handleChange}
						value={text}
						disabled={disabled ? "disabled" : ""}/>
					<Button
						type={disabled ? 'disabled' : (text !== '' ? 'active' : 'success')}>
						{disabled ? 'Agrega un grupo' : (text !== '' ? 'Agregar item' : 'Limpiar')}
					</Button>
				</form>
			</section>
		);
	}
}

export default TodoList;
