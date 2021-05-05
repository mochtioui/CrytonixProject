import React from "react";
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col, Button
} from "reactstrap";
import jwt_decode from "jwt-decode";
import TrackingService from "../../services/product/tracking.service";
import {GoLocation} from "react-icons/go";
import {BsCreditCard} from "react-icons/bs";
import {FiSend} from "react-icons/fi";
import {GiClick} from "react-icons/all";
import {Doughnut} from "react-chartjs-2";
import Chart from "react-google-charts";
import AddTracker from "./AddTracker";
import PropertyService from "../../services/product/ProductProperty.service";

class tracking extends React.Component {




    constructor() {
        super();

        this.state = {
            trackers: [],
            website:{},
            Link:'',
            websiteId:'',
            role:'',
            uniqueClicks:'',
            topWebsite:'',
            topCountry:'',
            topReferrer:'',
            referrersData:[],
            countriesData:[],
            websitesData:[],
            conversionData:[],
            conversionRate:'',
            mapData:[],

        };
    }
    getLink = (id) => {

        TrackingService.findById(id).then(link => {
        this.setState({
            Link: link,
            uniqueClicks:'',
            topWebsite:'',
            topCountry:'',
            topReferrer:'',
            referrersData:[],
            countriesData:[],
            websitesData:[],
            conversionData:[],
            conversionRate:'',
            mapData:[],
        })

        TrackingService.TopCountry(link._id).then(country =>
            this.setState({
                topCountry: country
        }))
        TrackingService.uniqueClicks(link._id).then(clicks =>
            this.setState({
                uniqueClicks: clicks
            }))
        TrackingService.clicksByCountry(link._id).then(clicks => {
            const labels = [],values = [],backgroundColor = [],hoverBackgroundColor =[];
            const map =[["Country", "Clicks"]];
            clicks.forEach((country,i) => {
                map.push([Object.keys(country)[0],country[Object.keys(country)[0]]])
                labels.push(Object.keys(country)[0]);
                values.push(country[Object.keys(country)[0]]);
                const randomColor = Math.floor(Math.random()*16777215).toString(16);
                backgroundColor.push('#'+randomColor);
                hoverBackgroundColor.push('#'+randomColor);
                if ( i == clicks.length - 1) {
                    const data = {
                        labels: labels,
                        datasets: [{
                            data: values,
                            backgroundColor: backgroundColor,
                            hoverBackgroundColor: hoverBackgroundColor
                        }]
                    };
                    this.setState({
                        countriesData: data,
                        mapData :map
                    }) }
            })

        })

        if(link.type === 'bank'){
            TrackingService.topProductReferrer(link.product).then(referrer =>
                this.setState({
                    topReferrer: referrer
                }))
            TrackingService.TopWebsite(link._id).then(web =>
                this.setState({
                    topWebsite: web
                }))
            TrackingService.clicksByReferrerProduct(link.product).then(referrers => {
                const labels = [],values = [],backgroundColor = [],hoverBackgroundColor =[];
                referrers.forEach((referrer,i) => {
                    labels.push(Object.keys(referrer)[0]);
                    values.push(referrer[Object.keys(referrer)[0]]);
                    const randomColor = Math.floor(Math.random()*16777215).toString(16);
                    backgroundColor.push('#'+randomColor);
                    hoverBackgroundColor.push('#'+randomColor);
                    if ( i == referrers.length - 1) {
                        const data = {
                            labels: labels,
                            datasets: [{
                                data: values,
                                backgroundColor: backgroundColor,
                                hoverBackgroundColor: hoverBackgroundColor
                            }]
                        };
                        this.setState({
                            referrersData: data
                        }) }
                })

            })
            TrackingService.clicksByWebsite(link._id).then(clicks => {
                const labels = [],values = [],backgroundColor = [],hoverBackgroundColor =[];
                clicks.forEach((website,i) => {
                    labels.push(Object.keys(website)[0]);
                    values.push(website[Object.keys(website)[0]]);
                    const randomColor = Math.floor(Math.random()*16777215).toString(16);
                    backgroundColor.push('#'+randomColor);
                    hoverBackgroundColor.push('#'+randomColor);
                    if ( i == clicks.length - 1) {
                        const data = {
                            labels: labels,
                            datasets: [{
                                data: values,
                                backgroundColor: backgroundColor,
                                hoverBackgroundColor: hoverBackgroundColor
                            }]
                        };
                        this.setState({
                            websitesData: data
                        }) }
                })

            })
            TrackingService.uniqueClicks(link._id).then(clicks =>{
                TrackingService.clicksByProduct(link.product).then(prodClicks =>{
                    const rate = (clicks * 100)/prodClicks;
                    const d = prodClicks - clicks ;
                    const data = {
                        labels: [
                            'proceeded to bank page',
                            'didn\'t proceed'
                        ],
                        datasets: [{
                            data: [clicks, d],
                            backgroundColor: [

                                '#2B4F68','#FF6384',
                            ],
                            hoverBackgroundColor: [
                                '#2B4F68', '#FF6384',

                            ]
                        }]
                    };
                    this.setState({
                        conversionRate: rate,
                        conversionData:data

                    })
                    }
                )
            }
)

        }
        else{
            TrackingService.TopReferrer(link._id).then(referrer =>
                this.setState({
                    topReferrer: referrer
                }))
            TrackingService.clicksByReferrer(link._id).then(referrers => {
                const labels = [],values = [],backgroundColor = [],hoverBackgroundColor =[];
                referrers.forEach((referrer,i) => {
                    labels.push(Object.keys(referrer)[0]);
                    values.push(referrer[Object.keys(referrer)[0]]);
                    const randomColor = Math.floor(Math.random()*16777215).toString(16);
                    backgroundColor.push('#'+randomColor);
                    hoverBackgroundColor.push('#'+randomColor);
                    if ( i == referrers.length - 1) {
                        const data = {
                            labels: labels,
                            datasets: [{
                                data: values,
                                backgroundColor: backgroundColor,
                                hoverBackgroundColor: hoverBackgroundColor
                            }]
                        };
                        this.setState({
                            referrersData: data
                        }) }
                })

            })

        }
        })

    };
    refresh = () => {
        TrackingService.getAll(this.state.websiteId).then(links => {
            this.setState({
                trackers:links
            })
        })

    };
    componentDidMount() {
        let data = sessionStorage.getItem('webselect');
        this.data = JSON.parse(data);
        const token = localStorage.getItem("token");
        this.setState({role: jwt_decode(token).users.role,websiteId:data._id})
        TrackingService.getAll(this.data._id).then(links => {
            this.setState({
                trackers:links
            })
        })
    }
    render() {
      const  { trackers,Link,topCountry,topReferrer,topWebsite,uniqueClicks,referrersData,countriesData,websitesData ,conversionData ,conversionRate,mapData }=this.state;

        return (
        <>
            <div style={{'padding':'0','width':'100%'}} className="content">
                <div className="row no-gutters">
                    <div style={{'padding':'0'}} className="col col-md-3 " >
                        <div style={{'backgroundColor':'white','height':'100%'}} className="card-plain mb-3 border-right border-dark ">
                            <div className="card-header bg-transparent">
                            <div className="row align-items-center">   <div className="col">Tracked URLs
                            </div>      <div className="col"> <AddTracker refresh={this.refresh}/></div></div>
                        </div>
                            <div style={{'overflow':'scroll'}} className="card-body ps">
                                {trackers.length ?
                                    trackers.map(link =>
                                    <div onClick={e=>this.getLink(link._id)} style={{'backgroundColor':'white'}}  className="card  ">
                                        <div className="card-body">
                                            <h6 style={{'fontSize':'12px'}}>{link.name}</h6>
                                            {link.type == 'bank' ? <p style={{'color':'green','fontSize':'7px'}}>http://localhost:3001/tracker/{link.short}</p>:
                                                <p style={{'color':'green','fontSize':'7px'}}>http://localhost:3001/tracker/short/{link.short}</p>
                                            }
                                        </div>
                                    </div>
                                    )
                                    : null}
                            </div>
                            </div>
                    </div>
                    <div  className="col col-md-9 " >
                        <div style={{'backgroundColor':'white','height':'100%'}}  className="card-plain  ">
                            <div className="card-header bg-transparent ">
                                { Link !== '' ?<div className="row "> <div className="col col-4 "><h6>{Link.name}</h6>
                                </div> <div className="col col-5  "> <div className="row align-items-center"> <p>URL :</p>
                                    {Link.type == 'bank' ?
                                    <p style={{'color':'green'}}>http://localhost:3001/tracker/{Link.short}</p>:
                                    <p style={{'color':'green'}}>http://localhost:3001/tracker/short/{Link.short}</p>
                                } </div></div>
                                    <div className="col col-3 "> Total Clicks : {Link.clicks}<i className="nc-icon nc-chart-bar-32"/></div></div>: null}
                            </div>
                            { Link !== '' ?
                            <div className="card-body">
                                <div className="row justify-content-center">
                                    {topCountry !== '' ?        <div className="col">



                                        <div style={{'backgroundColor':'rgb(43,79,104)','color':'white'}} className="card">
                                            <div className="row no-gutters">
                                                <div style={{'display':'flex','justifyContent':'center','alignItems':'center'}} className="col-4">

                                            <GoLocation style={{'fontSize':'30px'}}/>
                                                </div>
                                                <div className="col-8">
                                                   <p style={{'marginTop':'0','marginBottom':'0','fontWeight':'900','fontSize':'17px'}} >{ topCountry[Object.keys(topCountry)[0]] }</p>
                                                    <p style={{'marginTop':'0','marginBottom':'0','fontWeight':'normal','fontSize':'14px'}} >  { Object.keys(topCountry)[0] } </p>
                                                    <p style={{'marginTop':'0','marginBottom':'0','fontSize':'10px'}}>Top Location</p>
                                                </div>
                                        </div>
                                        </div>


                                    </div>:null  }
                                    {topReferrer !== '' ?           <div className="col">


                                            <div style={{'backgroundColor':'rgb(43,79,104)','color':'white'}} className="card">
                                                <div className="row no-gutters">
                                                    <div style={{'display':'flex','justifyContent':'center','alignItems':'center'}} className="col-4">

                                                        <FiSend style={{'fontSize':'30px'}}/>
                                                    </div>
                                                    <div className="col-8">
                                                        <p style={{'marginTop':'0','marginBottom':'0','fontWeight':'900','fontSize':'17px'}} >{ topReferrer[Object.keys(topReferrer)[0]] }</p>
                                                        <p style={{'marginTop':'0','marginBottom':'0','fontWeight':'normal','fontSize':'14px'}} >  { Object.keys(topReferrer)[0] } </p>
                                                        {Link.type === 'bank' ?   <p style={{'marginTop':'0','marginBottom':'0','fontSize':'10px'}}>Top Country Reffer</p> : <p style={{'marginTop':'0','marginBottom':'0','fontSize':'10px'}}>Top Reffer</p> }
                                                    </div>
                                                </div>
                                            </div>


                                    </div>:null  }
                                    { topWebsite !== ''  ?           <div className="col">


                                        <div style={{'backgroundColor':'rgb(43,79,104)','color':'white'}} className="card">
                                            <div className="row no-gutters">
                                                <div style={{'display':'flex','justifyContent':'center','alignItems':'center'}} className="col-4">

                                                    <BsCreditCard style={{'fontSize':'30px'}}/>
                                                </div>
                                                <div className="col-8">
                                                    <p style={{'marginTop':'0','marginBottom':'0','fontWeight':'900','fontSize':'17px'}} >{ topWebsite[Object.keys(topWebsite)[0]] }</p>
                                                    <p style={{'marginTop':'0','marginBottom':'0','fontWeight':'normal','fontSize':'14px'}} >  { Object.keys(topWebsite)[0] } </p>
                                                    <p style={{'marginTop':'0','marginBottom':'0','fontSize':'10px'}}>Top Website</p>
                                                </div>
                                            </div>
                                        </div>


                                    </div>:null  }
                                    { uniqueClicks !== ''  ?           <div className="col">


                                        <div style={{'backgroundColor':'rgb(43,79,104)','color':'white','height':'61px'}} className="card">
                                            <div className="row no-gutters">
                                                <div style={{'display':'flex','justifyContent':'center','alignItems':'center'}} className="col-4">

                                                    <GiClick style={{'fontSize':'30px'}}/>
                                                </div>
                                                <div  className="col-8">
                                                    <p style={{'marginBottom':'0','fontWeight':'900','fontSize':'17px'}} >{ uniqueClicks}</p>
                                                    <p style={{'marginTop':'0','fontSize':'15px'}}>Unique Clicks</p>
                                                </div>
                                            </div>
                                        </div>


                                    </div>:null  }


                                </div>
                                <div className="row">
                                    { referrersData != [] ?   <div className="col-6">
                                        <div className="card">
                                            <div className="card-header"> REFERRERS</div>

                                                <div className="card-body">
                                                    <Doughnut data={referrersData} />
                                            </div>


                                        </div>
                                    </div>        :
                                        null}
                                    { countriesData != [] ?     <div className="col-6">
                                        <div className="card">
                                            <div className="card-header"> Countries</div>

                                                <div className="card-body">
                                                    <Doughnut data={countriesData} />
                                                </div>


                                        </div>

                                    </div>          :
                                        null
                                    }
                                        {Link.type === 'bank' ?   <>
                                            { websitesData !== null ?
                                            <div className="col-6">
                                            <div className="card">
                                                <div className="card-header"> Websites</div>

                                                <div className="card-body">
                                                    <Doughnut data={websitesData} />
                                                </div>


                                            </div>

                                        </div>  : null}   </>     :
                                        null
                                    }
                                    {  Link.type === 'bank' ? <>
                                            {conversionData !== null ?
                                            <div className="col-6">
                                            <div className="card">
                                                <div className="card-header"> conversion Rate : {conversionRate} % </div>

                                                <div className="card-body">
                                                    <Doughnut data={conversionData} />
                                                </div>


                                            </div>

                                        </div> : null}   </>      :
                                        null
                                    }
                                    { mapData != [] ?     <div className="col-12" >
                                        <div className="card">
                                        <Chart chartType="GeoChart" width="100%" height="400px"
                                               data={mapData}
                                          />
                                        </div>
                                    </div>          :
                                        null
                                    }
                                </div>
                            </div>
                                :null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
        );
    }
    }

export default tracking;
