import React from 'react';
import { Package } from './';

class Footer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<footer className="footer">
				<section className="copyright_section">
					<div className="copyright">{Package.app_name} | Copyright © 2017 - Todos los derechos reservados a sus respectivos dueños</div>
					<div className="github-link"><a href="https://github.com/" target="_blank" rel="noopener noreferrer"><span className="icon icon-github"></span> View Source</a></div>
				</section>
			</footer>
		);
	}
}

export default Footer;
