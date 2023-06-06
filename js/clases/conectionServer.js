
export class ConServer{
    constructor(){

    }

    getDataGet(url){
        
        let getUserPromise = new Promise(function(serverResolve){
            const req = new XMLHttpRequest();
            req.onload = function(){
                serverResolve(this.responseText);
            }
            req.open("GET", url);
            req.send();
        });

        return getUserPromise;
    }

    sendData(url, data){
        let text = "datos=" + data;
        let sendData = new Promise(function(serverResolve){
            const req = new XMLHttpRequest();
            req.onload = function(){
                serverResolve(this.responseText);
            }
            req.open("POST", url);
            req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            req.send(text);

        });

        return sendData;
    }
}