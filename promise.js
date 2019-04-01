const p = new Promise( (resolve, reject) => {
    setTimeout(function(){
        resolve(['repo1','repo2']);
    }, 3000);
});

const p2 = new Promise( (resolve, reject) => {
    setTimeout(function(){
        resolve({username:'Rohan', password:'123'});
    }, 3000);
});
p.then( (repos) => {console.log(repos); return p2})
 .then((obj) => {console.log(obj);})  ;
