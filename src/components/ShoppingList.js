import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/items`)
      .then(resp => resp.json())
      .then(data => setItems(data))
  }, [])

  function handleAddItem(newItem) {
    setItems([...items, newItem])
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleIsInCart(cartItem) {
    const updatedItems = items.map((e) => {
      if (e.id === cartItem.id) {
        return cartItem;
      } else {
        return e;
      }
    });
    setItems(updatedItems);
  }

  function handleDelete(deletedItem) {
    const shortenedList = items.filter(e => e.id !== deletedItem.id)
    setItems(shortenedList);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item 
          key={item.id} 
          item={item} 
          onHandleIsInCart={handleIsInCart}
          onHandleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
