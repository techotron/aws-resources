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
    const [sortColum, setSortColumn] = useState('service');
    const [ascending, setAscending] = useState(true);

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

    var stringToOperator = {
        '>': function(a, b) { return a > b },
        '<': function(a, b) { return a < b },
    }

    const sortColumns = (resources) => {
        resources.sort((a, b) => (
            stringToOperator[ascending ? '>' : '<'](a[sortColum], b[sortColum])
        ) ? 1 : -1)
        return resources
    }

    return (
        <Container>
            {(isLoaded) ?
            <Container>
                <h1>Resources: {team} / {region}</h1>
                <h3>Total Count: {resources.length}</h3>
                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Service</th>
                        <td>Count</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Load Balancers</td>
                        <td>{resources.reduce((n, x) => n + (x.service === "elasticloadbalancing"), 0)}</td>
                    </tr>
                    <tr>
                        <td>EC2</td>
                        <td>{resources.reduce((n, x) => n + (x.service === "ec2"), 0)}</td>
                    </tr>
                    <tr>
                        <td>ECS</td>
                        <td>{resources.reduce((n, x) => n + (x.service === "ecs"), 0)}</td>
                    </tr>
                    <tr>
                        <td>DynamoDB</td>
                        <td>{resources.reduce((n, x) => n + (x.service === "dynamodb"), 0)}</td>
                    </tr>
                    <tr>
                        <td>RDS</td>
                        <td>{resources.reduce((n, x) => n + (x.service === "rds"), 0)}</td>
                    </tr>
                    <tr>
                        <td>Elasticache</td>
                        <td>{resources.reduce((n, x) => n + (x.service === "elasticache"), 0)}</td>
                    </tr>
                    <tr>
                        <td>SSM</td>
                        <td>{resources.reduce((n, x) => n + (x.service === "elasticache"), 0)}</td>
                    </tr>
                    <tr>
                        <td>S3</td>
                        <td>{resources.reduce((n, x) => n + (x.service === "elasticache"), 0)}</td>
                    </tr>
                    <tr>
                        <td>SNS</td>
                        <td>{resources.reduce((n, x) => n + (x.service === "elasticache"), 0)}</td>
                    </tr>
                    <tr>
                        <td>Lambda</td>
                        <td>{resources.reduce((n, x) => n + (x.service === "lambda"), 0)}</td>
                    </tr>
                </tbody>
                </Table>
                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Account ID</th>
                        <th>Environment</th>
                        <th>Application</th>
                        <th>Pool</th>
                        <th>Service</th>
                        <th>Resource</th>
                        <th>Resource ARN</th>
                        <th>Extra Tags</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {Object.entries(resources).map((key) => */}
                    {Object.entries(sortColumns(resources)).map((key) =>
                
                        <tr>
                            <td>{key[1].accountId}</td>
                            <td>{key[1].environment}</td>
                            <td>{key[1].app}</td>
                            <td>{key[1].pool}</td>
                            <td>{key[1].service}</td>
                            <td>{key[1].resource}</td>
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
