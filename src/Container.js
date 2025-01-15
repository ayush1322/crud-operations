import React, { useState, useEffect } from 'react';

function Container() {
    const [data, setData] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [companyName, setCompanyName] = useState(''); 
    const [companyEmail, setCompanyEmail] = useState(''); 
    const [updateUserId, setUpdateUserId] = useState(null); 

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5004/users');
            const data = await response.json();
            setData(data);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const handleAddUser = async (e) => {
        e.preventDefault();

        const newUser = {
            name,
            email,
            companyName,
            companyEmail,
        };

        const response = await fetch('http://localhost:5004/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });

        const result = await response.json();
        if (response.status === 200) {
            alert('added user');
        } else {
            alert('Error adding user');
        }
    };

    const handleDeleteUser = async (id) => {
        const response = await fetch('http://localhost:5004/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        if (response.status === 200) {
            setData(data.filter(user => user.id !== id)); 
        } else {
            alert('Error deleting user');
        }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();

        const updatedUser = {
            id: updateUserId,
            name,
            email,
            companyName,
            companyEmail,
        };

        const response = await fetch('http://localhost:5004/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        });

        const result = await response.json();
        if (response.status === 200) {
            setData(data.map(user => (user.id === updateUserId ? result.user : user))); 
            setUpdateUserId(null); 
            setName('');
            setEmail('');
            setCompanyName('');
            setCompanyEmail('');
        } else {
            alert('Error updating user');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>User List</h1>

            <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                {data.map(user => (
                    <li key={user.id} style={styles.listItem}>
                        {user.name} ({user.email})
                        <button
                            onClick={() => handleDeleteUser(user.id)}
                            style={styles.button}
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => {
                                setUpdateUserId(user.id);
                                setName(user.name);
                                setEmail(user.email);
                                setCompanyName(user.company.name);
                                setCompanyEmail(user.company.email);
                            }}
                            style={styles.button}
                        >
                            Update
                        </button>
                    </li>
                ))}
            </ul>

            <h2>{updateUserId ? 'Update User' : 'Add New User'}</h2>
            <form onSubmit={updateUserId ? handleUpdateUser : handleAddUser}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="email"
                    placeholder="Company Email"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>
                    {updateUserId ? 'Update User' : 'Add User'}
                </button>
            </form>
        </div>
    );
}

const styles = {
    listItem: {
        marginBottom: '10px',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        marginLeft: '10px',
        padding: '5px 10px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
    },
    input: {
        padding: '10px',
        margin: '10px 0',
        width: '100%',
        maxWidth: '400px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
};

export default Container;
