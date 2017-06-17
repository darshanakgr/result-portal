var config = {
    apiKey: "AIzaSyC_MAA3q1F2RRvh_AJD6Rz7ucT5Th-lgXk",
    authDomain: "result-portal-8f513.firebaseapp.com",
    databaseURL: "https://result-portal-8f513.firebaseio.com",
    projectId: "result-portal-8f513",
    storageBucket: "result-portal-8f513.appspot.com",
    messagingSenderId: "873859476364"
};

firebase.initializeApp(config);

const db = firebase.database()

db.ref().child('rank').on('value', function (snapshot) {
    var table = document.getElementById('result-table');
    while (table.rows.length > 1) {
        table.deleteRow(-1);
    }
    var arr = snapshot.val();
    for (var key in arr) {
        var rowdata = table.insertRow(-1);
        rowdata.insertCell(0).innerHTML = key;
        rowdata.insertCell(1).innerHTML = arr[key].gpa;
        rowdata.insertCell(2).innerHTML = arr[key].rank;
    }
});

var ar = {};
var count = 0;

function rankStudent() {
    eachStudent();
}

function eachStudent() {
    return db.ref('student/').once('value').then(function (students) {
        for (var student in students.val()) {
            ar[student] = {gpa: 0, credits: 0};
            primary(student);
        }
    });
}

function primary(indexNumber) {
    return db.ref('module/').once('value').then(function (snapshot) {
        var arr = snapshot.val();
        for (var moduleCode in arr) {
            secondary(arr, moduleCode, indexNumber);
        }
    });
}

function secondary(arr, moduleCode, indexNumber) {
    return db.ref('result/' + moduleCode + "/" + indexNumber).once('value').then(function (data) {
        if (data.val()) {
            lookupRecord(indexNumber, parseFloat(data.val().grade), parseFloat(arr[moduleCode].credit));
        }
    });
}

function lookupRecord(indexNumber, grade, credit) {
    ar[indexNumber].gpa = ((ar[indexNumber].gpa * ar[indexNumber].credits) + (grade * credit)) / (ar[indexNumber].credits + credit);
    ar[indexNumber].credits += credit;
    save(indexNumber, 0);
}

function save(indexNumber, rank) {
    return db.ref('rank/' + indexNumber).set({
        gpa: ar[indexNumber].gpa,
        credits: ar[indexNumber].credits,
        rank: rank
    });
}

function setRank() {
    var rank = 1;
    while (Object.keys(ar).length) {
        var max = 0.0;
        var index = undefined;
        for (var key in ar) {
            if (ar[key].gpa > max) {
                max = ar[key].gpa;
                index = key;
            }
        }
        save(key, rank++);
        delete ar[index];
    }
}
