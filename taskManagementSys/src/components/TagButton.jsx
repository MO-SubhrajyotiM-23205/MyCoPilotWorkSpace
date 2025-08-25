


const TagButton = ({ Taglabel, selecttag1, isSelected }) => {
    const buttonClass = (Taglabel) => {
        const colorMap = {
            HTML: 'lightblue',
            CSS: 'lightgreen',
            JavaScript: 'lightyellow',
            React: 'lightpink'
        };
        return {
            backgroundColor: isSelected ? colorMap[Taglabel] || 'lightgray' : 'lightgray',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 12px',
            cursor: 'pointer',
            margin: '4px'
        };
    };

    

    return (
        <button type="button" style={buttonClass(Taglabel)} onClick={() => selecttag1(Taglabel)}>
            {Taglabel}+
        </button>
    );
};

export default TagButton;
