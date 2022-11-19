import logo from './logo.svg';
import './App.css';
import { data } from './data';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
			</header>
			{data.items.map((item, index) => {
				return item.content_type === "Note" ? <div className='Note'>
					<h3>{item?.content?.title}</h3>
					<h4>{item?.content?.text}</h4>
					<button onClick={() => onShare(item?.content?.title, item?.content?.text)}>Share</button>
				</div> : <div><h2>Not a note</h2></div>
			})}
		</div>
	);
}

function onShare(title, text) {
	const notesExampleText = title + '\n' + text;
	const shareOptions = {
		text: notesExampleText,
		// url: pageUrl
	};

	navigator.share(shareOptions)
		.then(() => {
			console.log('Successful share')
		})
		.catch(error => {
			// Differentiate between user 'AbortError' and internal errors.
			// E.g. Internal error: could not connect to Web Share interface.
			if (error.name === 'AbortError') {
				console.log('Share card was probably just dismissed')
				// console.log(error.toString())
				return
			}

			// Real share error
			console.warn(error)
		})

}

export default App;
