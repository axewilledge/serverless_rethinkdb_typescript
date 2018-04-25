import { Handler, Context, Callback } from 'aws-lambda';
import offer from "./service/offer"

var service = new offer();

//INTERFACE FOR RESPONSE OBJECT TO PASS INTO CALLBACK FUNCTION
interface response {
  statusCode: number;
  body: string;
}

//HANDLER FUNCTION TO GET DATA FROM DATABASE 
const getOffers : Handler = (event:any, context: Context, callback: Callback) =>{

  service.getAllOffers(function(err,offerResponse) {
    const res: response = {
      statusCode: 200,
      body: JSON.stringify(offerResponse)
    };
    callback(undefined,res);
  });

};

//HANDLER FUNCTION TO POST DATA FROM DATABASE
const createOffer : Handler = (event:any, context: Context, callback: Callback) =>{

  const data = JSON.parse(event.body)

  service.addNewOffer(data,function(err,offerResponse){
    const res: response = {
      statusCode: 200,
      body: JSON.stringify(offerResponse)
    };
    callback(undefined, res);
  });

};

//HANDLER FUNCTION TO UPDATE DATA IN DATABASE
const updateOffer : Handler = (event:any, context: Context, callback: Callback) =>{

  const data = JSON.parse(event.body)

  service.updateOffer(event.pathParameters.id,data,function(err,offerResponse){
    const res: response = {
      statusCode: 200,
      body: JSON.stringify(offerResponse)
    };
    callback(undefined, res);
  });

};

//HANDLER FUNCTION TO DELETE DATA FROM DATABASE
const deleteOffer : Handler = (event:any, context: Context, callback: Callback) =>{

  service.deleteOffer(event.pathParameters.id,function(err,offerResponse){
    const res: response = {
      statusCode: 200,
      body: JSON.stringify(offerResponse)
    };
    callback(undefined, res);
  });

};

export { getOffers, createOffer, updateOffer, deleteOffer }