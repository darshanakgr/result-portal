/**
 * Created by drox2014 on 6/13/2017.
 */
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

db.ref().child('ordered-rank').once('value').then(function (data) {
    var arr = data.val();
    var table = document.getElementById('result-table');
    while (table.rows.length > 1) {
        table.deleteRow(-1);
    }
    for(var index in arr){
        var rowData = table.insertRow(-1);
        rowData.insertCell(0).innerHTML = index;
        rowData.insertCell(1).innerHTML = arr[index].rank;
        rowData.insertCell(2).innerHTML = arr[index].index;
        rowData.insertCell(3).innerHTML = arr[index].name;
        rowData.insertCell(3).innerHTML = arr[index].gpa;
    }
});

