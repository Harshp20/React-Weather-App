import { useState } from "react";
import "./SearchInput.scss";
import PlacesAutocomplete from 'react-places-autocomplete';
import Loader from '../Loader/Loader'

interface SearchInputProps {
  handleClick: (searchInput: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ handleClick }) => {
  const [searchInput, setSearchInput] = useState("");
  const handleSelect = (selection: string) => {
    setSearchInput(selection)
    handleClick(searchInput)
  }
  return (
    <>
      <PlacesAutocomplete value={searchInput} onChange={setSearchInput} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          return (
            <div className="input">
              <input {...getInputProps({ placeholder: 'Search a place...', className: "search-input" })} />
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
    </>
  );
};

export default SearchInput;
