

const TagButton = ({ Taglabel, selecttag }) => {
    return (
        <button type="button" className='tag' onClick={() => selecttag(Taglabel)}>
            {Taglabel}+
        </button>
    );
};

export default TagButton;
