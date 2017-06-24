var config = {
    apiKey: "AIzaSyC_MAA3q1F2RRvh_AJD6Rz7ucT5Th-lgXk",
    authDomain: "result-portal-8f513.firebaseapp.com",
    databaseURL: "https://result-portal-8f513.firebaseio.com",
    projectId: "result-portal-8f513",
    storageBucket: "result-portal-8f513.appspot.com",
    messagingSenderId: "873859476364"
};

firebase.initializeApp(config);

const db = firebase.database();

db.ref().child('student').once('value').then(function (data) {
    document.getElementById('student').innerHTML = Object.keys(data.val()).length;
});

db.ref().child('module').once('value').then(function (data) {
    document.getElementById('moduleCount').innerHTML = Object.keys(data.val()).length;
    var credits = 0;
    for(var code in data.val()){
        credits += parseFloat(data.val()[code].credit);
    }
    document.getElementById('credit').innerHTML = credits;
});



// var dataSales = {
//     labels: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C','C-','D','I-We'],
//     series: [[100,150,125,130,125,100,50,25,30,20,5],
//         [125,150,100,135,105,110,60,35,30,15,3]
//     ]
// };
//
// var optionsSales = {
//     lineSmooth: false,
//     low: 0,
//     high: 400,
//     showArea: true,
//     height: "245px",
//     axisX: {
//         showGrid: false,
//     },
//     lineSmooth: Chartist.Interpolation.simple({
//         divisor: 3
//     }),
//     showLine: false,
//     showPoint: false,
// };
//
// var responsiveSales = [
//     ['screen and (max-width: 640px)', {
//         axisX: {
//             labelInterpolationFnc: function (value) {
//                 return value[0];
//             }
//         }
//     }]
// ];
//
// Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);
//
