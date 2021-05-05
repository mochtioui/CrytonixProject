
const Product = require('../models/Product.model');
const Click = require('../models/Click.model');
const TrackedUrl = require('../models/TrackedUrl.model');
const Website = require('../models/website.model');
var akin = require('@asymmetrik/akin');
var geoip = require('geoip-lite');
const extractDomain = require('extract-domain');

exports.redirect = async  (req, res) => {
     await TrackedUrl.findOne({short: req.params.shortUrl})
         .then(url=> {
            const ip = '149.91.89.33';
                // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null);
            const referrer = req.headers['referer'] ? extractDomain(req.headers['referer']) ?  extractDomain(req.headers['referer']) : 'direct' : 'direct';
             //    console.log(extractDomain(req.headers['referer']))
         // console.log(req.ip)
                 var geo = geoip.lookup(ip);
          const click = new Click({
                  type:url.type,
                  referrer:referrer,
                  TrackedUrl:url._id,
                  ip:ip,
              website:req.params.websiteId,

              country:geo.country ? geo.country: "Unknown",
                  region:geo.region ? geo.region: "Unknown",
                  city:geo.city ? geo.city: "Unknown"
          });
             click.save();
             url.clicks++
             url.save()
                 res.redirect(url.original)

             }
         )
         .catch(err => res.status(400).json('Error: ' + err));

}
exports.redirectToBank = async  (req, res) => {
    await TrackedUrl.findOne({short: req.params.shortUrl})
        .then(url=> {

                res.redirect(url.original)

            }
        )
        .catch(err => res.status(400).json('Error: ' + err));

}

exports.addBankClick = async  (req, res) => {
    await TrackedUrl.findOne({product: req.params.productId})
        .then(url=> {
                const ip = '149.91.89.33';
                // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null);
                const referrer = req.headers['referer'] ? extractDomain(req.headers['referer']) ?  extractDomain(req.headers['referer']) : 'direct' : 'direct';
                //    console.log(extractDomain(req.headers['referer']))
                // console.log(req.ip)
                var geo = geoip.lookup(ip);
                const click = new Click({
                    type:'bank',
                    referrer:referrer,
                    TrackedUrl:url._id,
                    ip:ip,
                    product:req.params.productId,
                    website:req.params.websiteId,
                    country:geo.country ? geo.country: "Unknown",
                    region:geo.region ? geo.region: "Unknown",
                    city:geo.city ? geo.city: "Unknown"
                });
                click.save();
                url.clicks++
                url.save()
                res.redirect(url.original)

            }
        )
        .catch(err => res.status(400).json('Error: ' + err));

}
exports.productClick = async  (req, res) => {

                const ip = '149.91.89.33';
                // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null);
                const referrer = req.headers['referer'] ? extractDomain(req.headers['referer']) ?  extractDomain(req.headers['referer']) : 'direct' : 'direct';
                //    console.log(extractDomain(req.headers['referer']))
                // console.log(req.ip)
                var geo = geoip.lookup(ip);
                const click = new Click({
                    type:'product',
                    referrer:referrer,
                    ip:ip,
                    website:req.params.websiteId,
                    product:req.params.productId,
                    country:geo.country ? geo.country: "Unknown",
                    region:geo.region ? geo.region: "Unknown",
                    city:geo.city ? geo.city: "Unknown"
                });
                click.save();
    akin.activity.log(ip, req.params.productId, { type: 'product' }, 'view');
    akin.run();


}

exports.create = async  (req, res) => {
    const sc = new TrackedUrl(
        req.body
    );
    try {
        const saved = await sc.save();
        res.json(saved);
    } catch (err) {
        res.json({message: err});
    }
};
exports.findAll =   (req, res) =>{
    TrackedUrl.find({website:req.params.websiteId})
        .then(urls => res.json(urls))
        .catch(err => res.status(400).json('Error: ' + err));

};
exports.findById =   (req, res) =>{
    TrackedUrl.findById(req.params.trackId)
        .then(url => res.json(url))
        .catch(err => res.status(400).json('Error: ' + err));

};

exports.uniqueClicks =  async (req, res) =>{

    try {
     const  clicks = await Click.distinct('ip',{TrackedUrl:req.params.trackedUrl});
        res.json(clicks.length);
    } catch (err) {
        res.json({message: err});
    }
};
exports.clicksByProduct =  async (req, res) =>{

    try {
        const  clicks = await Click.distinct('ip',{product:req.params.productId,type:'product'});
        res.json(clicks.length);
    } catch (err) {
        res.json({message: err});
    }

};

exports.clicksByReferrer =  async (req, res) =>{

        const clicks =[];
        await Click.distinct('referrer',{TrackedUrl:req.params.trackedUrl})
            .then(async (referrers) => {
              await  referrers.map( async (referrer,index) =>{
                   await Click.countDocuments({referrer:referrer,TrackedUrl:req.params.trackedUrl})
                        .then(c => {
                          const click = {[referrer]:c}
                            clicks.push(click);

                        })
                        .catch(err => res.status(400).json('Error: ' + err));
                   if (index == referrers.length -1)
                   {
                       res.json(clicks);
                   }

                })

            })
            .catch(err => res.status(400).json('Error: ' + err));


};
exports.TopReferrer =  async (req, res) =>{
    let v =0;
    let click ;
    await Click.distinct('referrer',{TrackedUrl:req.params.trackedUrl})
        .then(async (referrers) => {
            await  referrers.map( async (referrer,index) =>{
                await Click.countDocuments({referrer:referrer,TrackedUrl:req.params.trackedUrl})
                    .then(c => {
                        if (c > v){
                            v =c
                             click = {[referrer]:c}
                        }



                    })
                    .catch(err => res.status(400).json('Error: ' + err));
                if (index == referrers.length -1)
                {
                    res.json(click);
                }

            })

        })
        .catch(err => res.status(400).json('Error: ' + err));


};
exports.clicksByReferrerProduct =  async (req, res) =>{

    const clicks =[];
    await Click.distinct('referrer',{product:req.params.productId,type:'product'})
        .then(async (referrers) => {
            await  referrers.map( async (referrer,index) =>{
                await Click.countDocuments({referrer:referrer,product:req.params.productId,type:'product'})
                    .then(c => {
                        const click = {[referrer]:c}
                        clicks.push(click);

                    })
                    .catch(err => res.status(400).json('Error: ' + err));
                if (index == referrers.length -1)
                {
                    res.json(clicks);
                }

            })

        })
        .catch(err => res.status(400).json('Error: ' + err));


};
exports.topProductReferrer =  async (req, res) =>{
    let v = 0;
    let click ;
    await Click.distinct('referrer',{product:req.params.productId,type:'product'})
        .then(async (referrers) => {
            await  referrers.map( async (referrer,index) =>{
                await Click.countDocuments({referrer:referrer,product:req.params.productId,type:'product'})
                    .then(c => {
                        if (c > v){
                            v =c
                            click = {[referrer]:c}
                        }

                    })
                    .catch(err => res.status(400).json('Error: ' + err));
                if (index == referrers.length -1)
                {
                    res.json(click);
                }

            })

        })
        .catch(err => res.status(400).json('Error: ' + err));


};
exports.clicksByCountry =  async (req, res) =>{

    const clicks =[];
    await Click.distinct('country',{TrackedUrl:req.params.trackedUrl})
        .then(async (countries) => {
            await  countries.map( async (country,index) =>{
                await Click.countDocuments({country:country,TrackedUrl:req.params.trackedUrl})
                    .then(c => {
                        const countryName =  countryCodes.find( ({ code }) => code === country  ).name;
                        const click = {[countryName]:c}
                        clicks.push(click);

                    })
                    .catch(err => res.status(400).json('Error: ' + err));
                if (index == countries.length -1)
                {
                    res.json(clicks);
                }

            })

        })
        .catch(err => res.status(400).json('Error: ' + err));


};
exports.TopCountry =  async (req, res) =>{
    let v = 0;
    let click;
    await Click.distinct('country',{TrackedUrl:req.params.trackedUrl})
        .then(async (countries) => {
            await  countries.map( async (country,index) =>{
                await Click.countDocuments({country:country,TrackedUrl:req.params.trackedUrl})
                    .then(c => {
                        if (c > v){
                            v =c
                            const countryName =  countryCodes.find( ({ code }) => code === country  ).name;

                            click = {[countryName]:c}
                        }
                    })
                    .catch(err => res.status(400).json('Error: ' + err));
                if (index == countries.length -1)
                {
                    res.json(click);
                }

            })

        })
        .catch(err => res.status(400).json('Error: ' + err));


};
exports.clicksByWebsite =  async (req, res) =>{

    const clicks =[];
    await Click.distinct('website',{TrackedUrl:req.params.trackedUrl})
        .then(async (websites) => {
            await  websites.map( async (website,index) =>{
                 const site = await Website.findById(website).then().catch();
                await Click.countDocuments({website:website,TrackedUrl:req.params.trackedUrl})
                    .then(c => {
                        const click = {[site.site_name]:c}
                        clicks.push(click);

                    })
                    .catch(err => res.status(400).json('Error: ' + err));
                if (index == websites.length -1)
                {
                    res.json(clicks);
                }

            })

        })
        .catch(err => res.status(400).json('Error: ' + err));


};
exports.TopWebsite =  async (req, res) =>{
    let v = 0;
    let click;
    await Click.distinct('website',{TrackedUrl:req.params.trackedUrl,type:'bank'})
        .then(async (websites) => {
            await  websites.map( async (website,index) =>{
                const site = await Website.findById(website).then().catch();
                await Click.countDocuments({website:website,TrackedUrl:req.params.trackedUrl,type:'bank'})
                    .then(c => {
                        if (c > v){
                            v =c
                            click = {[site.site_name]:c}
                        }

                    })
                    .catch(err => res.status(400).json('Error: ' + err));
                if (index == websites.length -1)
                {
                    res.json(click);
                }

            })

        })
        .catch(err => res.status(400).json('Error: ' + err));


};
exports.clicksByMonth =  async (req, res) =>{

    const clicks =[];
    await Click.aggregate([{$match :{TrackedUrl:req.params.trackedUrl}}, {
        $group: {

                _id: new Date("$date").getMonth()
            ,

            count: { $sum: 1 }
        }
    }])
        .then( (months) => {
      res.json(months)

        })
        .catch(err => res.status(400).json('Error: ' + err));


};

const countryCodes = [
    {name: 'Afghanistan', code: 'AF'},
    {name: 'Åland Islands', code: 'AX'},
    {name: 'Albania', code: 'AL'},
    {name: 'Algeria', code: 'DZ'},
    {name: 'American Samoa', code: 'AS'},
    {name: 'AndorrA', code: 'AD'},
    {name: 'Angola', code: 'AO'},
    {name: 'Anguilla', code: 'AI'},
    {name: 'Antarctica', code: 'AQ'},
    {name: 'Antigua and Barbuda', code: 'AG'},
    {name: 'Argentina', code: 'AR'},
    {name: 'Armenia', code: 'AM'},
    {name: 'Aruba', code: 'AW'},
    {name: 'Australia', code: 'AU'},
    {name: 'Austria', code: 'AT'},
    {name: 'Azerbaijan', code: 'AZ'},
    {name: 'Bahamas', code: 'BS'},
    {name: 'Bahrain', code: 'BH'},
    {name: 'Bangladesh', code: 'BD'},
    {name: 'Barbados', code: 'BB'},
    {name: 'Belarus', code: 'BY'},
    {name: 'Belgium', code: 'BE'},
    {name: 'Belize', code: 'BZ'},
    {name: 'Benin', code: 'BJ'},
    {name: 'Bermuda', code: 'BM'},
    {name: 'Bhutan', code: 'BT'},
    {name: 'Bolivia', code: 'BO'},
    {name: 'Bosnia and Herzegovina', code: 'BA'},
    {name: 'Botswana', code: 'BW'},
    {name: 'Bouvet Island', code: 'BV'},
    {name: 'Brazil', code: 'BR'},
    {name: 'British Indian Ocean Territory', code: 'IO'},
    {name: 'Brunei Darussalam', code: 'BN'},
    {name: 'Bulgaria', code: 'BG'},
    {name: 'Burkina Faso', code: 'BF'},
    {name: 'Burundi', code: 'BI'},
    {name: 'Cambodia', code: 'KH'},
    {name: 'Cameroon', code: 'CM'},
    {name: 'Canada', code: 'CA'},
    {name: 'Cape Verde', code: 'CV'},
    {name: 'Cayman Islands', code: 'KY'},
    {name: 'Central African Republic', code: 'CF'},
    {name: 'Chad', code: 'TD'},
    {name: 'Chile', code: 'CL'},
    {name: 'China', code: 'CN'},
    {name: 'Christmas Island', code: 'CX'},
    {name: 'Cocos (Keeling) Islands', code: 'CC'},
    {name: 'Colombia', code: 'CO'},
    {name: 'Comoros', code: 'KM'},
    {name: 'Congo', code: 'CG'},
    {name: 'Congo, The Democratic Republic of the', code: 'CD'},
    {name: 'Cook Islands', code: 'CK'},
    {name: 'Costa Rica', code: 'CR'},
    {name: 'Cote D\'Ivoire', code: 'CI'},
    {name: 'Croatia', code: 'HR'},
    {name: 'Cuba', code: 'CU'},
    {name: 'Cyprus', code: 'CY'},
    {name: 'Czech Republic', code: 'CZ'},
    {name: 'Denmark', code: 'DK'},
    {name: 'Djibouti', code: 'DJ'},
    {name: 'Dominica', code: 'DM'},
    {name: 'Dominican Republic', code: 'DO'},
    {name: 'Ecuador', code: 'EC'},
    {name: 'Egypt', code: 'EG'},
    {name: 'El Salvador', code: 'SV'},
    {name: 'Equatorial Guinea', code: 'GQ'},
    {name: 'Eritrea', code: 'ER'},
    {name: 'Estonia', code: 'EE'},
    {name: 'Ethiopia', code: 'ET'},
    {name: 'Falkland Islands (Malvinas)', code: 'FK'},
    {name: 'Faroe Islands', code: 'FO'},
    {name: 'Fiji', code: 'FJ'},
    {name: 'Finland', code: 'FI'},
    {name: 'France', code: 'FR'},
    {name: 'French Guiana', code: 'GF'},
    {name: 'French Polynesia', code: 'PF'},
    {name: 'French Southern Territories', code: 'TF'},
    {name: 'Gabon', code: 'GA'},
    {name: 'Gambia', code: 'GM'},
    {name: 'Georgia', code: 'GE'},
    {name: 'Germany', code: 'DE'},
    {name: 'Ghana', code: 'GH'},
    {name: 'Gibraltar', code: 'GI'},
    {name: 'Greece', code: 'GR'},
    {name: 'Greenland', code: 'GL'},
    {name: 'Grenada', code: 'GD'},
    {name: 'Guadeloupe', code: 'GP'},
    {name: 'Guam', code: 'GU'},
    {name: 'Guatemala', code: 'GT'},
    {name: 'Guernsey', code: 'GG'},
    {name: 'Guinea', code: 'GN'},
    {name: 'Guinea-Bissau', code: 'GW'},
    {name: 'Guyana', code: 'GY'},
    {name: 'Haiti', code: 'HT'},
    {name: 'Heard Island and Mcdonald Islands', code: 'HM'},
    {name: 'Holy See (Vatican City State)', code: 'VA'},
    {name: 'Honduras', code: 'HN'},
    {name: 'Hong Kong', code: 'HK'},
    {name: 'Hungary', code: 'HU'},
    {name: 'Iceland', code: 'IS'},
    {name: 'India', code: 'IN'},
    {name: 'Indonesia', code: 'ID'},
    {name: 'Iran, Islamic Republic Of', code: 'IR'},
    {name: 'Iraq', code: 'IQ'},
    {name: 'Ireland', code: 'IE'},
    {name: 'Isle of Man', code: 'IM'},
    {name: 'Israel', code: 'IL'},
    {name: 'Italy', code: 'IT'},
    {name: 'Jamaica', code: 'JM'},
    {name: 'Japan', code: 'JP'},
    {name: 'Jersey', code: 'JE'},
    {name: 'Jordan', code: 'JO'},
    {name: 'Kazakhstan', code: 'KZ'},
    {name: 'Kenya', code: 'KE'},
    {name: 'Kiribati', code: 'KI'},
    {name: 'Korea, Democratic People\'S Republic of', code: 'KP'},
    {name: 'Korea, Republic of', code: 'KR'},
    {name: 'Kuwait', code: 'KW'},
    {name: 'Kyrgyzstan', code: 'KG'},
    {name: 'Lao People\'S Democratic Republic', code: 'LA'},
    {name: 'Latvia', code: 'LV'},
    {name: 'Lebanon', code: 'LB'},
    {name: 'Lesotho', code: 'LS'},
    {name: 'Liberia', code: 'LR'},
    {name: 'Libyan Arab Jamahiriya', code: 'LY'},
    {name: 'Liechtenstein', code: 'LI'},
    {name: 'Lithuania', code: 'LT'},
    {name: 'Luxembourg', code: 'LU'},
    {name: 'Macao', code: 'MO'},
    {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
    {name: 'Madagascar', code: 'MG'},
    {name: 'Malawi', code: 'MW'},
    {name: 'Malaysia', code: 'MY'},
    {name: 'Maldives', code: 'MV'},
    {name: 'Mali', code: 'ML'},
    {name: 'Malta', code: 'MT'},
    {name: 'Marshall Islands', code: 'MH'},
    {name: 'Martinique', code: 'MQ'},
    {name: 'Mauritania', code: 'MR'},
    {name: 'Mauritius', code: 'MU'},
    {name: 'Mayotte', code: 'YT'},
    {name: 'Mexico', code: 'MX'},
    {name: 'Micronesia, Federated States of', code: 'FM'},
    {name: 'Moldova, Republic of', code: 'MD'},
    {name: 'Monaco', code: 'MC'},
    {name: 'Mongolia', code: 'MN'},
    {name: 'Montserrat', code: 'MS'},
    {name: 'Morocco', code: 'MA'},
    {name: 'Mozambique', code: 'MZ'},
    {name: 'Myanmar', code: 'MM'},
    {name: 'Namibia', code: 'NA'},
    {name: 'Nauru', code: 'NR'},
    {name: 'Nepal', code: 'NP'},
    {name: 'Netherlands', code: 'NL'},
    {name: 'Netherlands Antilles', code: 'AN'},
    {name: 'New Caledonia', code: 'NC'},
    {name: 'New Zealand', code: 'NZ'},
    {name: 'Nicaragua', code: 'NI'},
    {name: 'Niger', code: 'NE'},
    {name: 'Nigeria', code: 'NG'},
    {name: 'Niue', code: 'NU'},
    {name: 'Norfolk Island', code: 'NF'},
    {name: 'Northern Mariana Islands', code: 'MP'},
    {name: 'Norway', code: 'NO'},
    {name: 'Oman', code: 'OM'},
    {name: 'Pakistan', code: 'PK'},
    {name: 'Palau', code: 'PW'},
    {name: 'Palestinian Territory, Occupied', code: 'PS'},
    {name: 'Panama', code: 'PA'},
    {name: 'Papua New Guinea', code: 'PG'},
    {name: 'Paraguay', code: 'PY'},
    {name: 'Peru', code: 'PE'},
    {name: 'Philippines', code: 'PH'},
    {name: 'Pitcairn', code: 'PN'},
    {name: 'Poland', code: 'PL'},
    {name: 'Portugal', code: 'PT'},
    {name: 'Puerto Rico', code: 'PR'},
    {name: 'Qatar', code: 'QA'},
    {name: 'Reunion', code: 'RE'},
    {name: 'Romania', code: 'RO'},
    {name: 'Russia', code: 'RU'},
    {name: 'RWANDA', code: 'RW'},
    {name: 'Saint Helena', code: 'SH'},
    {name: 'Saint Kitts and Nevis', code: 'KN'},
    {name: 'Saint Lucia', code: 'LC'},
    {name: 'Saint Pierre and Miquelon', code: 'PM'},
    {name: 'Saint Vincent and the Grenadines', code: 'VC'},
    {name: 'Samoa', code: 'WS'},
    {name: 'San Marino', code: 'SM'},
    {name: 'Sao Tome and Principe', code: 'ST'},
    {name: 'Saudi Arabia', code: 'SA'},
    {name: 'Senegal', code: 'SN'},
    {name: 'Serbia and Montenegro', code: 'CS'},
    {name: 'Seychelles', code: 'SC'},
    {name: 'Sierra Leone', code: 'SL'},
    {name: 'Singapore', code: 'SG'},
    {name: 'Slovakia', code: 'SK'},
    {name: 'Slovenia', code: 'SI'},
    {name: 'Solomon Islands', code: 'SB'},
    {name: 'Somalia', code: 'SO'},
    {name: 'South Africa', code: 'ZA'},
    {name: 'South Georgia and the South Sandwich Islands', code: 'GS'},
    {name: 'Spain', code: 'ES'},
    {name: 'Sri Lanka', code: 'LK'},
    {name: 'Sudan', code: 'SD'},
    {name: 'Suriname', code: 'SR'},
    {name: 'Svalbard and Jan Mayen', code: 'SJ'},
    {name: 'Swaziland', code: 'SZ'},
    {name: 'Sweden', code: 'SE'},
    {name: 'Switzerland', code: 'CH'},
    {name: 'Syrian Arab Republic', code: 'SY'},
    {name: 'Taiwan, Province of China', code: 'TW'},
    {name: 'Tajikistan', code: 'TJ'},
    {name: 'Tanzania, United Republic of', code: 'TZ'},
    {name: 'Thailand', code: 'TH'},
    {name: 'Timor-Leste', code: 'TL'},
    {name: 'Togo', code: 'TG'},
    {name: 'Tokelau', code: 'TK'},
    {name: 'Tonga', code: 'TO'},
    {name: 'Trinidad and Tobago', code: 'TT'},
    {name: 'Tunisia', code: 'TN'},
    {name: 'Turkey', code: 'TR'},
    {name: 'Turkmenistan', code: 'TM'},
    {name: 'Turks and Caicos Islands', code: 'TC'},
    {name: 'Tuvalu', code: 'TV'},
    {name: 'Uganda', code: 'UG'},
    {name: 'Ukraine', code: 'UA'},
    {name: 'United Arab Emirates', code: 'AE'},
    {name: 'United Kingdom', code: 'GB'},
    {name: 'United States', code: 'US'},
    {name: 'United States Minor Outlying Islands', code: 'UM'},
    {name: 'Uruguay', code: 'UY'},
    {name: 'Uzbekistan', code: 'UZ'},
    {name: 'Vanuatu', code: 'VU'},
    {name: 'Venezuela', code: 'VE'},
    {name: 'Viet Nam', code: 'VN'},
    {name: 'Virgin Islands, British', code: 'VG'},
    {name: 'Virgin Islands, U.S.', code: 'VI'},
    {name: 'Wallis and Futuna', code: 'WF'},
    {name: 'Western Sahara', code: 'EH'},
    {name: 'Yemen', code: 'YE'},
    {name: 'Zambia', code: 'ZM'},
    {name: 'Zimbabwe', code: 'ZW'}

];
