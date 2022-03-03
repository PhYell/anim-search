import "./slider.style.css";

function Slider(props) {
    return (
        <div className="slider">
            <input type="checkbox" onChange={props.changeType} />
        </div>
    );
}

export default Slider;
