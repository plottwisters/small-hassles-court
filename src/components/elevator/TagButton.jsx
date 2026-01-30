export function TagButton({ tag, category, selected, add, remove }) {
    const className = `tag-button tag-button-${category} ${selected ? 'tag-button-selected-' + category : ''}`;

    const handleClick = () => {
        if (!selected) {
            add(tag, category);
        } else {
            remove(tag);
        }
    }

    return (
        <div className={className} onClick={handleClick}>
            {tag}
        </div>
    );
}