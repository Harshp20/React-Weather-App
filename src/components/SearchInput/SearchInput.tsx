import { useEffect, useState, createRef } from "react";
import "./SearchInput.scss";
import PlacesAutocomplete from 'react-places-autocomplete';
import Loader from '../Loader/Loader'

interface SearchInputProps {
  handleClick: (searchInput: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ handleClick }) => {
  const [searchInput, setSearchInput] = useState("");
  const [isSelected, setIsSelected] = useState(false)
  
  useEffect(() => {
    if (isSelected) {
      setIsSelected(false)
      handleClick(searchInput)
    }
  }, [isSelected])

  const handleSelect = (selection: string) => {
    setSearchInput(selection)
    setIsSelected(true)
  }

  return (
      <PlacesAutocomplete value={searchInput} onChange={setSearchInput} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          return (
            <div className="input">
              <input {...getInputProps({ placeholder: 'Search a place...', className: "search-input" })} onBlur={(e) => e.target.focus} />
              <div className="suggestions-container">
                {loading ? <div style={{ marginTop: '1rem' }}><Loader loaderColour={'white'} isLoading={loading} size={35} /></div> : (
                  suggestions.map((suggestion, index) => {
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className: 'suggestions',
                        })}
                        key={index}>{suggestion.description}</div>
                    )
                  }))}
              </div>
            </div>
          )
        }}
      </PlacesAutocomplete>
  );
};

export default SearchInput;
