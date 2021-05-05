/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Detail Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart
} from "variables/charts.jsx";

class Dashboard extends React.Component {
  render() {
    return (
      <>
        <div className="content">
         
            
          
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
               <center>   <CardTitle tag="h5">Welecome</CardTitle> </center>
                 
                </CardHeader>
                <CardBody>
                   
                </CardBody>
                <CardFooter>
                  <hr />
               
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="4">
        
            </Col>
            <Col md="8">
              
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
