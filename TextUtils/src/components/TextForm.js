import React, {useState} from 'react'
import PropTypes from 'prop-types'

TextForm.propTypes = {
  heading: PropTypes.string.isRequired
}

export default function TextForm(props) {
    function handleUpClick() {
        const newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Text changed to uppercase", "success");
    }

    function handleLoClick() {
        const newText = text.toLowerCase(); 
        setText(newText);
        props.showAlert("Text changed to lowercase", "success");
    }

    function handleOnChange(e) {
        setText(e.target.value);
    }

    function handleClearClick() {
        setText("");
        props.showAlert("Text cleared", "success");
    }

    function handleCopyClick() {
        let text = document.getElementById("myBox");
        text.select();
        navigator.clipboard.writeText(text.value);
        props.showAlert("Text copied to clipboard", "success");
    }

    function handleExtraSpaces() {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra spaces removed", "success");
    }

    const [text, setText] = useState('');
    return (
        <>
            <div className="container" style={{backgroundColor: props.mode === 'dark' ? '#042743' : 'white',
                color: props.mode === 'dark' ? 'white' : 'black'}}>
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <textarea 
                        className="form-control" 
                        value={text}
                        id="myBox" 
                        onChange={handleOnChange} 
                        placeholder="Enter text here..."
                        rows="5">
                    </textarea>
                </div>

                <button className="btn btn-primary mx-2" onClick={handleUpClick}>Change to Uppercase</button>

                <button className="btn btn-primary mx-2" onClick={handleLoClick}>Change to Lowercase</button>

                <button className="btn btn-primary mx-2" onClick={handleClearClick}>Clear Text</button>

                <button className="btn btn-primary mx-2" onClick={handleCopyClick}>Copy Text</button>

                <button className="btn btn-primary mx-2" onClick={handleExtraSpaces}>Remove Extra Spaces</button>   

            </div>

            <div className="container my-3" style={{color: props.mode === "dark"? "white": "black"}}>
                <h2>Your text summary</h2>
                <p>{text.trim().split(/\s+/).filter(Boolean).length} words and {text.length} characters</p>
                <p>{0.005 * text.trim().split(/\s+/).filter(Boolean).length} Minutes read</p>
                <p>Total {text.trim().split(/\s+/).filter(Boolean).length} lines</p>

                <h2>Preview</h2>
                <p>{text.length > 0 ? text : "Enter text in the textbox above to preview it here."}</p>
            </div>
        </>
    )
}
