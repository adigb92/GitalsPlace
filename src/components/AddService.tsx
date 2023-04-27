import { FunctionComponent, useState, FormEvent } from "react";
import axios from 'axios';
import { getToken } from '../utils/auth';


interface AddServiceProps {

}

const AddService: FunctionComponent<AddServiceProps> = () => {

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [duration, setDuration] = useState<number>(0);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = getToken();

        try {
            const response = await axios.post('/api/services', {
                name,
                description,
                price,
                imageUrl,
                duration,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            alert('Service added successfully');
        } catch (error) {
            console.error('Error adding service:', error);
            alert('Error adding service');
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Description:
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <label>
                Price:
                <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
            </label>
            <label>
                Image URL:
                <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            </label>
            <label>
                Duration:
                <input type="number" value={duration} onChange={(e) => setDuration(parseFloat(e.target.value))} />
            </label>
            <button type="submit">Add Service</button>
        </form>
    );
};

export default AddService;