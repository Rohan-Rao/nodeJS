function getRepositories(i, fnObj){
    setTimeout(function(){
       // console.log(fnObj());
        fnObj(['repo'+i++, 'repo'+i++, 'repo'+i++]);
    }, 2000);
}

function getUser(i, fnObj){
    setTimeout(function(){
        fnObj({id: i, username: 'Rohan!!'});
    }, 3000);
}

console.log("HI");
for(let i=0; i<5;i++){
getRepositories(i,function(arrRepo){
    console.log(arrRepo);
        getUser(i, function(userObj){
           // console.log(this);
            console.log(userObj);
        });
})
}
console.log("BI");

