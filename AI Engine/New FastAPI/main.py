from typing import List, Optional

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel


app = FastAPI(title="Example FastAPI", version="1.0.0")


class ItemBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    in_stock: bool = True


class Item(ItemBase):
    id: int


# In-memory "database"
items_db: List[Item] = []
next_id = 1


@app.get("/health", summary="Health check")
def health_check():
    return {"status": "ok"}


@app.post("/items", response_model=Item, status_code=201, summary="Create a new item")
def create_item(item: ItemBase):
    global next_id
    new_item = Item(id=next_id, **item.dict())
    items_db.append(new_item)
    next_id += 1
    return new_item


@app.get("/items", response_model=List[Item], summary="List all items")
def list_items():
    return items_db


@app.get("/items/{item_id}", response_model=Item, summary="Get a single item by ID")
def get_item(item_id: int):
    for item in items_db:
        if item.id == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")


@app.put("/items/{item_id}", response_model=Item, summary="Update an existing item")
def update_item(item_id: int, updated: ItemBase):
    for index, item in enumerate(items_db):
        if item.id == item_id:
            new_item = Item(id=item_id, **updated.dict())
            items_db[index] = new_item
            return new_item
    raise HTTPException(status_code=404, detail="Item not found")


@app.delete("/items/{item_id}", status_code=204, summary="Delete an item")
def delete_item(item_id: int):
    for index, item in enumerate(items_db):
        if item.id == item_id:
            items_db.pop(index)
            return
    raise HTTPException(status_code=404, detail="Item not found")

