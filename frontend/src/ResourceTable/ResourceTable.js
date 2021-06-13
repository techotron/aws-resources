import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import axios from 'axios';


const ResourceTable = ({ location }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [team, setTeam] = useState('');
    const [region, setRegion] = useState('us-east-1');
    const [resources, setResources] = useState([]);

    const backendUrl = window.env.REACT_APP_BACKEND_API

    useEffect(() => {
        const pathname = location.pathname.split('/');
        setTeam(pathname[pathname.length - 1]);
        
        if (team !== '') {
            axios.get(`${backendUrl}/resourcetags/${region}/${team}`)
            .then(res => {
                setResources(res.data);
                setIsLoaded(true);
            })
            .catch(err => {
                console.error(err);
            })
        }
    }, [backendUrl, location.pathname, team, region])


    return (
        <Container>
            {(isLoaded) ?
            <Container>
                <h1>Resources: {team} / {region}</h1>
                <h3>Total Count: {resources.length}</h3>
                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>Environment</th>
                        <th>Application</th>
                        <th>Pool</th>
                        <th>Resource ARN</th>
                        <th>Extra Tags</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(resources).map((key) =>
                        <tr>
                            <td>{key[1].team}</td>
                            <td>{key[1].environment}</td>
                            <td>{key[1].app}</td>
                            <td>{key[1].pool}</td>
                            <td>{key[1].resourceArn}</td>
                            <td>{JSON.stringify(key[1].extraTags)}</td>
                        </tr>
                        )}
                </tbody>
                </Table>
            </Container>
            : <Spinner animation="border" variant="primary" />}
        </Container>
    );
}

export default ResourceTable;
