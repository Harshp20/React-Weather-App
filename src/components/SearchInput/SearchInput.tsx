import { keyboard } from '@testing-library/user-event/dist/keyboard'
import { useState } from 'react'
import './SearchInput.scss'

interface SearchInputProps {
    handleClick: (searchInput: string) => void
}

const SearchInput: React.FC<SearchInputProps> = ({ handleClick }) => {
    
        
    const [searchInput, setSearchInput] = useState('')
    
    return (
        <div className="input">
            <input onChange={(e) => setSearchInput(e.target.value)} className="search-input" type="text" placeholder="Type to search..." />
            <i onClick={() => handleClick(searchInput)} className="fa-brands fa-searchengin icon"></i>
        </div>
    )
}

export default SearchInput

