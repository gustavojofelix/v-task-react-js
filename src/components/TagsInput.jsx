import React from "react";
import "./TagsInput.css";

function TagsInput() {
  const [inputValue, setInputValue] = React.useState("");
  const [tags, setTags] = React.useState([]);

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  const onKeyDown = (e) => {
    const trimmedInput = inputValue.trim();

    if (
      (e.key === "," || e.key === "Enter") &&
      trimmedInput &&
      !tags.includes(trimmedInput)
    ) {
      e.preventDefault();
      setTags([...tags, trimmedInput]);
      setInputValue("");
    }

    if (e.key === "Backspace" && !inputValue && tags.length) {
      e.preventDefault();
      const tagsCopy = [...tags];
      const lastTag = tagsCopy.pop();
      setInputValue(lastTag);
      setTags(tagsCopy);
    }
  };

  const deleteTag = (index) => {
    const tagsCopy = [...tags];
    tagsCopy.splice(index, 1);
    setTags(tagsCopy);
  };

  return (
    <div className="tagsConatiner">
      {tags.map((tag, index) => {
        return (
          <div className="tag">
            {tag}
            <button onClick={() => deleteTag(index)}>X</button>
          </div>
        );
      })}
      <input
        type="text"
        placeholder="Add a tag"
        value={inputValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

export default TagsInput;
