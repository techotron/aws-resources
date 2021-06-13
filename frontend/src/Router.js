import React from "react";
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ResourceTable from './ResourceTable/ResourceTable';

function Router() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact
                        path='/'
                        render={() =>
                            <Container fluid="sm" style={{ paddingTop: "20px" }}>
                                <h1>AWS Resources</h1>
                            </Container>
                        }
                    />                   
                    <Route exact
                        path='/:team'
                        component={ResourceTable}
                    />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default Router;