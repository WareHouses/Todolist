import React from 'react';
import { Button, TodoList } from './';

class TDTask extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { id, text, removeTask, showTaskList, countTask } = this.props;
		return (
			<li className="todo_component__group">
				<span className="todo_component__itemtext" onClick={() => showTaskList(id)}>{text}</span>
				<span className="todo_component__counter">{countTask}</span>
				<span className="todo_component__itemremove icon icon-times" onClick={() => removeTask(id)}/>
			</li>
		);
	}
}

class TDTaskList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<ul className="todo_component__grouplist">
				{this.props.tasks.map(task => (
					<TDTask
						key={task.id}
						id={task.id}
						text={task.text}
						countTask={task.items.length}
						removeTask={this.props.removeTask}
						showTaskList={this.props.showTaskList}/>
				))}
			</ul>
		);
	}
}

class TodoTask extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
			index: -1,
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
			return;
		}
		this.addTask();
	};

	addTask = () => {
		const newTask = {
			text: this.state.text,
			id: Date.now(),
			items: []
		};
		this.setState(prevState => ({
			tasks: prevState.tasks.concat(newTask),
			index: prevState.tasks.length,
			text: ''
		}));
	};

	removeTask = (id) => {
		let newTasks = this.state.tasks.filter((task) => {
			return task.id !== id;
		});
		const index = this.state.index;
		this.setState({
			tasks: newTasks,
			index: index >= newTasks.length ? newTasks.length - 1 : index
		});
	};

	showTaskList = (id) => {
		let index = 0, count = 0;
		const tasks = this.state.tasks.filter((task) => {
			if(task.id === id) {
				index = count;
			}
			count++;
			return true;
		});
		this.setState({
			tasks: tasks,
			index: index
		});
	};

	setItems = (items) => {
		const { tasks, index } = this.state;
		tasks[index].items = items;
		console.log("Modificando:", index);
		this.setState({
			tasks: tasks
		});
	};

	render() {
		const { text, tasks, index } = this.state;
		const { title } = this.props;
		const items = (index !== -1 ? tasks[index].items : [])
		const taskName = (index !== -1 ? tasks[index].text : "Agrega un grupo")
		const disabled = tasks.length === 0;
		return (
			<section className="todo_component">
				{title ? <h1 className="todo_component__title">{title + ": " + taskName}</h1> : ""}
				<section className="todo_component__content">
					<section className="todo_component__groups">
						<form onSubmit={this.handleSubmit} className="todo_component__form">
							<input className="todo_component_input" onChange={this.handleChange} value={text} placeholder="Agrega un grupo"/>
							<Button type="active" className="todo_component__button icon icon-plus"/>
						</form>
						<TDTaskList tasks={tasks} removeTask={this.removeTask} showTaskList={this.showTaskList}/>
					</section>
					<TodoList items={items} setItems={this.setItems} disabled={disabled}/>
				</section>
			</section>
		);
	}
}

export default TodoTask;
