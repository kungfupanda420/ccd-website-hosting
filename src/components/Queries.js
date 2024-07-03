import React, { useEffect } from 'react'
import "../css/Queries.css";
import { useState } from 'react';

const Queries = () => {
  const [queriesData, setQueriesData] = useState([]);

    const getQueries = async()=>{
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

    const changeStatus = async (id) => {
      try {
        console.log('got id', id);
        const response = await fetch(`/api/submit/status/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          const errorData = await response.json();
          console.log('Error updating query status:', errorData);
        }
      } catch (error) {
        console.error('Error updating query status:', error);
      }
    };
    
    return (
    <>
    <table>
    <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Phone</th>
      <th scope="col">Email</th>
      <th scope="col">Query</th>
      <th scope="col">Status</th>
      <th scope="col">.</th>
    </tr>
  </thead>
  <tbody>
    {queriesData.map((query, index) => (
    <tr>
      <th scope="row">{query.name}</th>
      <td>{query.phone}</td>
      <td>{query.email}</td>
      <td>{query.queriescomments}</td>
      <td>{query.status}</td>
      <td><button onClick={(e)=>{e.preventDefault();changeStatus(query.id)}}>Complete</button></td>
    </tr>
    ))}
  </tbody>

</table>

    </>
  )
}

export default Queries