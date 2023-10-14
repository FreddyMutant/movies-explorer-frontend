import {useState} from "react";

export default function useInputAndCheckbox() {
  const [searchPattern, setSearchPattern] = useState({search: "", isShort: false});

  function handleChange(e) {
    setSearchPattern(() => ({isShort: searchPattern.isShort, search: e.target.value}));
  }

  function handleCheckboxChange(e) {
    setSearchPattern(() => ({search: searchPattern.search, isShort: e.target.checked}));
  }

  return {searchPattern, setSearchPattern, handleChange, handleCheckboxChange}
}
