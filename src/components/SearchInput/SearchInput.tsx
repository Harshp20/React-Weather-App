import './SearchInput.scss'

const SearchInput = () => {
    return (
        <div className="input">
            <input className="search-input" type="text" placeholder="Type to search..." />
            <i className="fa-brands fa-searchengin icon"></i>
        </div>
    )
}

export default SearchInput

