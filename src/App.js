import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  InputGroup,
  Form,
  Row,
  Col,
  InputGroupText
} from "reactstrap";
import Moment from "moment";
import "./App.css";
import moment from "moment";

function App() {
  return (
    <div className="container">
      <h1 className="text-center py-4">Welcome to Resly Coding Challenge</h1>

      <div>
        <p>
          <strong>Instructions</strong>
        </p>
        <p>1. Please use React Hooks for all the tests.</p>
        <p>
          2. We use reactstrap as a front-end UI library. You can find the{" "}
          <a
            href="https://reactstrap.github.io/"
            target="_blank"
            rel="noreferrer"
          >
            documentation here
          </a>
        </p>
      </div>

      <Test1 />
      <Test2 />
      <Test3 />
    </div>
  );
}

const Test1 = () => {
  // TASK
  // 1. Click each fruit button will add 1 for its color in summary result
  // 2. Display the summary in the <div> below. Design it the way how it should look like.
  // Bonus: Try to only use one handleCount function and one state for all buttons

  const [result, setResult] = useState({ red: 0, green: 0, orange: 0 });

  const handleCount = (symbol) => {
    let state = result;
    state[symbol]++;
    setResult( {...state} );
  };
  
  const UI = {
    red: (<>🍎</>),
    green: (<>🍏</>),
    orange: (<>🍊</>)
  };

  const makeCol = (symbol)=>{
    var arr = [];
    for(let i=0; i< result[symbol]; i++){
      arr.push((
        <Col key={i} className="mb-2">{UI[symbol]}</Col>
      ));
    }
    return arr;
  };

  const makeRol  = (symbol)=>{
    return (
      <Row xs="auto" className="mb-4">
            <Col>The basket (has {result[symbol]} {UI[symbol]}) :</Col>
            {makeCol(symbol)}
      </Row>
    );
  }

  return (
    <Card className="mb-4">
      <CardHeader>Test 1 - Color Count</CardHeader>
      <CardBody className="m-3">
        <div>
          <Button onClick={()=>handleCount("red")}>🍎</Button>
          <Button className="m-4" onClick={()=>handleCount("green")}>🍏</Button>
          <Button onClick={()=>handleCount("orange")}>🍊</Button>
        </div>

        <h3 className="mt-4">Result:</h3>
        <div>
          {makeRol("red")}
          {makeRol("green")}
          {makeRol("orange")}
        </div>
      </CardBody>
    </Card>
  );
};

const Test2 = () => {
  // TASK
  // 1. Click Go and validate if the date entered is in the future, design an error response if the date is invalid.
  // 2. calculate the date difference from today and display to the end user
  const today = new Date();
  const [date, setDate] = useState(Moment(today).format("YYYY-MM-DD"));
  const [result, setResult] = useState({
    date : date,
    string : "today"
  });
  const dateChange = (e)=>{
    e.preventDefault();
    setDate(Moment(e.target.value).format("YYYY-MM-DD"))
  }

  const update = ()=>{
    // Using the built in library moment to calculate date differently
    var diff = moment.duration(moment(date).diff(Moment(Date())));
    var days = diff.days();
    var s ="today";
    if(days> 0 ){
      s = `${days+1} days from today`;
    } else if (days< 0){
      s = `${days * -1} days before today`;
    }else if(diff.hours()> 1)
    s = `${days+1} day from today, but only ${diff.hours()}:${diff.minutes()}:${diff.seconds()} to the new day`;
    let state = {
      date : date,
      string: s
    }
    setResult({...state});
  }

  return (
    <Card className="mb-4">
      <CardHeader>Test 2 - Date</CardHeader>
      <CardBody className="m-3">
        <div className="mb-4">
          <InputGroup >
            <Input type="date" name="date" value={date} onChange={e=>{dateChange(e)}}/>
            <Button type="button" onClick={update}>Go</Button>
          </InputGroup>
        </div>

        <h3 className="mt-4">Result:</h3>
        <p>
          The date entered ({result.date}) is <strong>{result.string}</strong>
        </p>
        <note><i>Note: 1 days from today may show up specially since it is less than 24h. It may be 1 hours notice wrong at 11pm</i></note>
      </CardBody>
    </Card>
  );
};

const Test3 = () => {
  // TASK
  // 1. Click the button and fetch a random user from `https://jsonplaceholder.typicode.com/users` using async/await
  // 2. Display the user information in the <div> using your UI design skill, try to utilize the boostrap and reactstrap library and be as creative as you want here.

  // This function will call the random user 
  const getUser = async()=>{
    const id = Math.floor(Math.random()*10) + 1;
    let response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
      method:'GET',
      headers:{
        Accept:'application/json'
      }
    });
    if(!response.ok){
      throw new Error(`Cannot read user in the ID: ${id}`);
    }
    const result =  await response.json();
    return result;
  }
  const [user, setUser]= useState({});

  const fetchUser = async() =>{
    setUser(await getUser());
  }

  useEffect(()=>{
    fetchUser();
    // eslint-disable-next-line 
  },[]); // need this effect for initiating the first state

  const input = (str)=> <Input placeholder={str} readOnly></Input>;

  return (
    <Card className="mb-4">
      <CardHeader>Test 3 - User information</CardHeader>
      <CardBody className="m-3">
        <div>
          <Button onClick={fetchUser}>Fetch User</Button>
        </div>

        <h3 className="mt-4">Result:</h3>
        <div>
          <Card>
            <CardHeader>
              <h5 style={{
                textAlignLast: "center"
              }}>{user.id}. {user.name}</h5>
            </CardHeader>
            <CardBody>
              <Form>
                <InputGroup >
                  <InputGroupText className="col-3" >Username</InputGroupText>
                  <Input placeholder={user.username} readOnly></Input>
                </InputGroup>

                <InputGroup>
                  <InputGroupText className="col-3">Email</InputGroupText>
                  <Input placeholder={user.email} readOnly></Input>
                </InputGroup>
                
                <InputGroup>
                  <InputGroupText className="col-3">Phone</InputGroupText>
                  <Input placeholder={user.phone} readOnly></Input>
                </InputGroup>

                <InputGroup>
                  <InputGroupText className="col-3">Website</InputGroupText>
                  <Input placeholder={user.website} readOnly></Input>
                </InputGroup>


                <InputGroup>
                  <InputGroupText className="col-3">Address</InputGroupText>
                {(()=>{
                    if(user.address) return input(`${user.address.suite} ${user.address.street}, ${user.address.city} ${user.address.zipcode}`)
                    return input("");
                  })()
                }
                </InputGroup>

                <InputGroup>
                  <InputGroupText className="col-3">Company</InputGroupText>
                {(()=>{if(user.company)
                  return input(`${user.company.name} (${user.company.catchPhrase}) `)
                  else return input("");
                })()}
                </InputGroup>

                <InputGroup>
                  <InputGroupText className="col-3">BS</InputGroupText>
                {(()=>{
                  if(user.company)
                  return input(`${user.company.bs}`)
                  else return input("");
                })()}
                </InputGroup>

              </Form>
            </CardBody>
          </Card>
        </div>
      </CardBody>
    </Card>
  );
}; 

export default App;
