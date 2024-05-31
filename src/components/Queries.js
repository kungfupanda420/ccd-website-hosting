import React, { useEffect } from 'react'
import "../css/Queries.css";
import { useState } from 'react';

const Queries = () => {
  const [queriesData, setQueriesData] = useState([]);

    const getQueries = async () => {
      try {
        const response = await fetch('/api/active-program/queries');
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setQueriesData(data);
        } else {
          throw new Error('Error fetching queries data');
        }
      } catch (error) {
        console.error('Error fetching queries data:', error);
      }
    };

    useEffect(() => {
      getQueries();
    },[]);
  
    return (
    <>
    <table>
    <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Phone</th>
      <th scope="col">Email</th>
      <th scope="col">Query</th>
    </tr>
  </thead>
  <tbody>
    {queriesData.map((query, index) => (
    <tr>
      <th scope="row">{query.name}</th>
      <td>{query.phone}</td>
      <td>{query.email}</td>
      <td>{query.queriescomments}</td>
    </tr>
    ))}
  </tbody>

</table>

    </>
  )
}

export default Queries