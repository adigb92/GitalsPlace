import React, { FunctionComponent, useEffect, useState } from "react";
import { fetchFavorites } from "../utils/api";
import { Service } from "../models/Service";

interface FavoritesProps { }

const Favorites: FunctionComponent<FavoritesProps> = () => {
    const [favorites, setFavorites] = useState<Service[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const favoritesData = await fetchFavorites();
                setFavorites(favoritesData);
            } catch (error) {
                console.error("Failed to fetch favorites:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            <h1 className="text-center mt-5">Your Favorites</h1>
            <div className="row mt-4">
                {favorites.map((item: Service) => (
                    <div key={item._id} className="col-md-4 col-lg-3 mb-4">
                        <div className="card">
                            {item.imageUrl && (
                                <img src={item.imageUrl} className="card-img-top" alt={item.name} />
                            )}
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;
