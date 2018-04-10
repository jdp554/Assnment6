function MenuChoice()
{
    if (document.getElementById("menu").value=="Add a customer")
    {
        document.getElementById("add").style.visibility="visible";
        document.getElementById("change").style.visibility="hidden";
        document.getElementById("delete").style.visibility="hidden";
    }
    else if (document.getElementById("menu").value=="Change the Ship-To address on an order")
    {
        document.getElementById("add").style.visibility="hidden";
        document.getElementById("change").style.visibility="visible";
        document.getElementById("delete").style.visibility="hidden";
    }
    else if (document.getElementById("menu").value=="Delete a customer")
    {
        document.getElementById("add").style.visibility="hidden";
        document.getElementById("change").style.visibility="hidden";
        document.getElementById("delete").style.visibility="visible";
    }
    else
    {
        document.getElementById("add").style.visibility="hidden";
        document.getElementById("change").style.visibility="hidden";
        document.getElementById("delete").style.visibility="hidden";
    }
}

function CreateCustomer()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
    
    //Collect Customer data from web page
    var customerid = document.getElementById("custid").value;
    var customername = document.getElementById("custname").value;
    var customercity = document.getElementById("custcity").value;
    
    //Create the parameter string
    var newcustomer = '{"CustomerID":"'+customerid+'","CompanyName":"'+customername+'","City": "'+customercity+'"}';
    
    //Checking for AJAX operation return
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var addresult = JSON.parse(objRequest.responseText);
            OperationResult(addresult);
        }
    }
    
    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcustomer);
    
}

function OperationResult(output)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("addresult").innerHTML = "The operation was successful!"
    }
    else
    {
        document.getElementById("addresult").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
    }
}

function ChangeOrder()
{
    var objRequest = new XMLHttpRequest ();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/ChangeOrder";
    
    //Collect Customer data from web page
    var order_number = document.getElementById("ordernum").value;
    var shipto_name = document.getElementById("shiptoname").value;
    var shipto_address = document.getElementById("shiptoaddress").value;
    var shipto_city = document.getElementById("shiptocity").value;
    var shipto_post = document.getElementById("shiptopost").value;
    
    //Create the parameter string
    var orderchange = '{"OrderNumber": "'+order_number+'" , "ShipName": "'+shipto_name+'" , "ShipAddress": "'+shipto_address+'" , "ShipCity": "'+shipto_city+'" , "ShipPostcode":  "'+shipto_post+'"}';
    
    //Checking for AJAX operation return
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var changeresult = JSON.parse(objRequest.responseText);
            OperationResult2(changeresult);
        }
    }
    
    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(orderchange);
}

function OperationResult2(output2)
{
    if (output2.WasSuccessful == 1)
    {
        document.getElementById("changeresult").innerHTML = "The operation was successful!"
    }
    else
    {
        document.getElementById("changeresult").innerHTML = "The operation was not successful!" + "<br>" + output2.Exception;
    }
}




function DeleteCustomer ()
{
    var objRequest = new XMLHttpRequest(); //Create AJAX request object
    
    //Create URL and Query string
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/DeleteCustomerResult";
    url += document.getElementById("iddelete").value;
    
    //Checks that the object has returned data
    objRequest.onreadystatechange = function ()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var deleteresult = JSON.parse(objRequest.responseText);
            OperationResult3 (deleteresult);
        }
    }
    
    //Initiate the server request
    objRequest.open("GET", url, true);
    objRequest.send();
}

function OperationResult3(output3)
{
    if (output3.WasSuccessful == 1)
    {
        document.getElementById("deleteresult").innerHTML = "The operation was successful!"
    }
    else
    {
        document.getElementById("deleteresult").innerHTML = "The operation was not successful!" + "<br>" + output3.Exception;
    }
}


