const express = require('express')
// import {v4 as uuidv4} from 'uuid';
const {v4} = require('uuid')
const app = express();
const cors = require('cors');
app.use(cors());

const responseArray = [{ 
    "id": 1, 
    "name": "Alan Jones", 
    "email": "alan.jones@gmail.com", 
    "company": { 
    "name": "Right Solutions", 
    "email": "info@rightsolutions.com" 
    } 
    }]

app.get('/users',(req,res)=>{

    res.json(responseArray)

})


app.post('/users',(req,res)=>{
    const id = v4();
    responseArray.push({ 
        "id": id, 
        "name": req.name, 
        "email": req.email, 
        "company": { 
        "name": req.companyName, 
        "email": req.companyEmail 
        } 
        })

    res.json({
        "status":200,
        "msg":"created"
    })
})

app.post('/delete',(req,res)=>{
    const id = req.Id;
    
    const userIndex = responseArray.findIndex(user => user.id === id);
    responseArray.splice(userIndex, 1);

    if(!id) return res.json({
        "message":"No user found"
    })
    res.json({
        "status":200
    })


})


app.post('/update',(req,res)=>{
    const id = req.id;
    const userIndex = responseArray.findIndex(user => user.id === id);
    responseArray[userIndex] = { 
        "id": id, 
        "name": req.name, 
        "email": req.email, 
        "company": { 
        "name": req.companyName, 
        "email": req.companyEmail 
        } 
        };
    res.json({
            "status": 200,
            "msg": "User updated",
           
    });

})

app.listen(5004,()=>{
console.log("listening")
})




// { 
//      "id": 1, 
//      "name": "Alan Jones", 
//      "email": "alan.jones@gmail.com", 
//      "company": { 
//           "name": "Right Solutions", 
//           "email": "info@rightsolutions.com" 
//        } 
//     } 