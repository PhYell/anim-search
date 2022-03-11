const PreviewItem = ({ image, name }) => {
    console.log(image);
    return (
        <div className="preview-item">
            <h3>{name}</h3>
            <img src={image.tiny} alt="titlePreview" />
        </div>
    );
};

export default PreviewItem;
