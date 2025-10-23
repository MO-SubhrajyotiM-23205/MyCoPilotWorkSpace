import React, { useState, useMemo } from 'react';

// Sample data for demonstration
const initialData = [
    { id: 1, title: 'Inception', genre: 'Sci-Fi', year: 2010 },
    { id: 2, title: 'Titanic', genre: 'Romance', year: 1997 },
    { id: 3, title: 'The Matrix', genre: 'Action', year: 1999 },
    { id: 4, title: 'Interstellar', genre: 'Sci-Fi', year: 2014 },
    { id: 5, title: 'Gladiator', genre: 'Action', year: 2000 },
    // Add more rows as needed
];

const PAGE_SIZE = 3;

const GridFunction = () => {
    const [data, setData] = useState(initialData);
    const [filter, setFilter] = useState('');
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [page, setPage] = useState(1);

    // Filtering
    const filteredData = useMemo(() => {
        if (!filter) return data;
        return data.filter(
            row =>
                row.title.toLowerCase().includes(filter.toLowerCase()) ||
                row.genre.toLowerCase().includes(filter.toLowerCase()) ||
                String(row.year).includes(filter)
        );
    }, [data, filter]);

    // Sorting
    const sortedData = useMemo(() => {
        if (!sortKey) return filteredData;
        return [...filteredData].sort((a, b) => {
            if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
            if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortKey, sortOrder]);

    // Pagination
    const paginatedData = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return sortedData.slice(start, start + PAGE_SIZE);
    }, [sortedData, page]);

    const totalPages = Math.ceil(sortedData.length / PAGE_SIZE);

    // Action button handler
    const handleAction = (row) => {
        alert(`Action triggered for: ${row.title}`);
    };

    // Sorting handler
    const handleSort = (key) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    return (
        <div>
            <h2>Movie Grid</h2>
            <input
                type="text"
                placeholder="Filter by title, genre, or year"
                value={filter}
                onChange={e => {
                    setFilter(e.target.value);
                    setPage(1);
                }}
                style={{ marginBottom: '10px', width: '250px' }}
            />
            <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                            Title {sortKey === 'title' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                        </th>
                        <th onClick={() => handleSort('genre')} style={{ cursor: 'pointer' }}>
                            Genre {sortKey === 'genre' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                        </th>
                        <th onClick={() => handleSort('year')} style={{ cursor: 'pointer' }}>
                            Year {sortKey === 'year' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                        </th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.length === 0 ? (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>No data found</td>
                        </tr>
                    ) : (
                        paginatedData.map(row => (
                            <tr key={row.id}>
                                <td>{row.title}</td>
                                <td>{row.genre}</td>
                                <td>{row.year}</td>
                                <td>
                                    <button onClick={() => handleAction(row)}>Action</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div style={{ marginTop: '10px' }}>
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >
                    Prev
                </button>
                <span style={{ margin: '0 10px' }}>
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default GridFunction;