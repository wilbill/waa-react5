import React, { useState } from 'react';
import axios from 'axios';
import './index.css';
import { GithubUser } from './Type/Types'; // Importing the type from the Types folder

export default function App() {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState<GithubUser[]>([]);
    const [error, setError] = useState<string | null>(null);




    const handleSearch = async () => {
        try {
            axios.get(`https://api.github.com/search/users?q=${query}`)
                .then(response => {
                    setUsers(response.data.items) // Update state with fetched users
                    setError(null);
                })
        }
        catch (error) {
            setError("Users not found");
        }
    }
    //===========================================================================================


        // try {
        //     const response = await axios.get(`https://api.github.com/search/users?q=${query}`);
        //     setUsers(response.data.items);
        //     setError(null);
        // } catch (err) {
        //     setError('Error fetching data');
        // }

    return (
        <div className="container">
            <section className="jumbotron">
                <h3 className="jumbotron-heading">Search GitHub Users</h3>
                <div>
                    <input
                        type="text"
                        placeholder="Enter the name to search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)} //update query on input change
                    />
                    &nbsp;
                    <button onClick={() => handleSearch() }>Search</button>
                </div>
            </section>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Render error message */}
            <div className="row">
                {users.map((user) => (
                    <div className="card" key={user.id}>
                        <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                            <img src={user.avatar_url} alt={user.login} style={{ width: '100px' }} />
                        </a>
                        <p className="card-text">{user.login}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
