import React, { FunctionComponent, useState } from "react";
import { Service } from "../models/Service";

interface ContentFormProps {
    onSubmit: (service: Partial<Service>) => void;
}

const ContentForm: FunctionComponent<ContentFormProps> = ({ onSubmit }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, description, price: parseFloat(price), imageUrl });
        setName("");
        setDescription("");
        setPrice("");
        setImageUrl("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Service</h2>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="imageUrl">Image URL:</label>
                <input
                    type="url"
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Service</button>
        </form>
    );
};

export default ContentForm;
