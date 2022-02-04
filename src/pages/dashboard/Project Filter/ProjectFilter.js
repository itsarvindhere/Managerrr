const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales'];

export const ProjectFilter = ({currentFilter, setCurrentFilter}) => {
    return (
        <div className="project-filter">
            <nav>
                {filterList.map(filter => (
                    <button 
                        key={filter} 
                        onClick={() => setCurrentFilter(filter)}
                        className={currentFilter === filter ? 'active' : ''}
                    >
                        {'#' + filter}
                    </button>
                ))}
            </nav>
        </div>
        )
};
