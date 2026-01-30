export function TagBoard({ name, tags, left }) {
    const className = `tagboard-container ${left ? '' : 'tagboard-container-flipped'}`;

    return (
        <div className={className}>
            <div className="tagboard-contents">
                <div className="tagboard-title">{name}</div>
                {tags.map(tag => (
                    <div 
                        key={tag.name}
                        className={`tagboard-tag tagboard-${tag.category}`}
                    >
                        {tag.name}
                    </div>
                ))}
            </div>
        </div>
    );
}