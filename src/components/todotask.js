import React from 'react';
import { Button, TodoList } from './';

class TDTask extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { id, text, removeTask, showTaskList } = this.props;
		return (
			<li className="todolist_item">
				<span className="todolist_item_text" onClick={() => showTaskList(id)}>{text}</span>
				<span className="icon icon-times todolist_item_remove" onClick={() => removeTask(id)}/>
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
			<ul className="todolist_list">
				{this.props.tasks.map(task => (
					<TDTask
						key={task.id}
						id={task.id}
						text={task.text}
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
		const items = (index !== -1 ? tasks[index].items : [])
		const taskName = (index !== -1 ? tasks[index].text : "Agrega un grupo")
		const disabled = tasks.length === 0;
		return (
			<section className="todolist_container">
				<section className="todolist">
					<TDTaskList tasks={tasks} removeTask={this.removeTask} showTaskList={this.showTaskList}/>
					<form onSubmit={this.handleSubmit} className="todolist_controls">
						<input type="text"
							onChange={this.handleChange}
							value={text}/>
						<Button
							type='active'>
							Agregar grupo
						</Button>
					</form>
				</section>
				<TodoList items={items} setItems={this.setItems} taskName={taskName} disabled={disabled}/>
			</section>
		);
	}
}

export default TodoTask;
