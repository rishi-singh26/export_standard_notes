import './App.css';
import { useState } from "react";

function App() {
	const defaultStateData = { items: [] };
	const [data, setData] = useState(defaultStateData);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsText(file);
		reader.onload = () => {
			setData(JSON.parse(reader.result));
		};
		reader.onerror = () => {
			alert('File error', reader.error);
		}
	}

	return (
		<div className="App">
			<header className="App-header">
				<h3>Export Standard Notes</h3>
			</header>
			<h4>Select the Standard Notes export .txt file</h4>
			<input type={'file'} onChange={handleFileChange}></input>
			<p></p>
			{/* {data.items.length === 0 ? null : <button onClick={() => setData(defaultStateData)}>Clear</button>} */}
			<a href='https://github.com/rishi-singh26/export_standard_notes'><h5>Github</h5></a>
			{data.items.length === 0 ? <h5>No file selected</h5> : data.items.map((item, index) => {
				return item.content_type === "Note" ? <div className='Note' key={index.toString()}>
					<h3>{item?.content?.title}</h3>
					<h4>{item?.content?.text}</h4>
					<button onClick={() => onShare(item?.content?.title, item?.content?.text)}>Share</button>
				</div> : <div key={index.toString()}></div>
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
